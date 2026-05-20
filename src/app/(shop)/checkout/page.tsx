'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/stores/auth-store';
import { useCartStore } from '@/stores/cart-store';
import SlideIn from '@/components/animations/SlideIn';
import PetImage from '@/components/pets/PetImage';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

const SHIPPING_COST = 25;

// Payment method type options
type PaymentMethod = 'credit-card' | 'paypal' | 'cod';

// Interface for shipping form fields
interface ShippingForm {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
}

// Interface for form errors
interface FormErrors {
  fullName?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
  paymentMethod?: string;
}

// Generate random order ID
function generateOrderId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'ORD-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function CheckoutPage() {
  const router = useRouter();
  
  // Auth store selectors
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  // Cart store selectors
  const items = useCartStore((state) => state.items);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  
  // Calculate totals
  const totalItems = getTotalItems();
  const subtotal = getTotalPrice();
  const shipping = SHIPPING_COST;
  const total = subtotal + shipping;
  
  // Form state
  const [formData, setFormData] = useState<ShippingForm>({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
  });
  
  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | ''>('');
  
  // Form errors state
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Loading and success states
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  // Auth guard - redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login?redirect=/checkout');
    }
  }, [isAuthenticated, router]);
  
  // Pre-fill email from auth store - intentional sync when user becomes available
  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData((prev) => ({
        ...prev,
        email: user.email,
        fullName: user.name,
      }));
    }
  }, [user]);
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };
  
  // Handle payment method selection
  const handlePaymentChange = (method: PaymentMethod) => {
    setPaymentMethod(method);
    if (errors.paymentMethod) {
      setErrors((prev) => ({
        ...prev,
        paymentMethod: undefined,
      }));
    }
  };
  
  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.street.trim()) {
      newErrors.street = 'Street address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Invalid ZIP code format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle order placement
  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Generate order ID
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);
    
    // Clear cart
    clearCart();
    
    setLoading(false);
    setSuccess(true);
  };
  
  // Payment method options
  const paymentOptions = [
    { value: 'credit-card' as PaymentMethod, label: 'Credit Card', icon: '💳' },
    { value: 'paypal' as PaymentMethod, label: 'PayPal', icon: '🅿' },
    { value: 'cod' as PaymentMethod, label: 'Cash on Delivery', icon: '💵' },
  ];
  
  // Empty cart state
  if (items.length === 0 && !success) {
    return (
      <div className="container mx-auto px-4 py-12">
        <SlideIn direction="right">
          <div className="text-center py-16">
            <div className="mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 mx-auto text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Add some items to your cart before checking out.</p>
            <Link href="/pets">
              <Button variant="primary" size="lg">
                Browse Pets
              </Button>
            </Link>
          </div>
        </SlideIn>
      </div>
    );
  }
  
  // Success state - show order confirmation
  if (success) {
    return (
      <div className="container mx-auto px-4 py-12">
        <SlideIn direction="right">
          <div className="max-w-lg mx-auto text-center">
            <Card variant="elevated" padding="lg">
              {/* Success indicator */}
              <div className="mb-6">
                <span className="text-6xl">✅</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Order Placed Successfully!
              </h1>
              
              <p className="text-gray-600 mb-6">
                Thank you for your order. We&apos;ll process it shortly.
              </p>
              
              {/* Order details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-semibold text-gray-900">{orderId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-semibold text-gray-900">
                    {new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
              
              {/* Shipping address summary */}
              <div className="text-left mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Shipping to:</h3>
                <p className="text-gray-600">
                  {formData.fullName}<br />
                  {formData.street}<br />
                  {formData.city}, {formData.state} {formData.zipCode}
                </p>
              </div>
              
              {/* Total paid */}
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg text-gray-600">Total Paid:</span>
                  <span className="text-2xl font-bold text-brand-500">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
              
              {/* Continue shopping button */}
              <Link href="/pets" className="block">
                <Button variant="primary" size="lg" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </Card>
          </div>
        </SlideIn>
      </div>
    );
  }
  
  // Main checkout form
  return (
    <div className="container mx-auto px-4 py-8">
      <SlideIn direction="right">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <span>🔒</span>
            Secure Checkout
          </h1>
          <div className="h-px bg-gray-200 mt-4" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - Checkout form (2/3 width) */}
          <div className="md:col-span-2 space-y-6">
            {/* Shipping Information */}
            <Card variant="outlined" padding="lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Shipping Information
              </h2>
              
              <div className="space-y-4">
                {/* Full Name */}
                <Input
                  type="text"
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                  error={errors.fullName}
                />
                
                {/* Street Address */}
                <Input
                  type="text"
                  label="Street Address"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  placeholder="123 Main Street"
                  required
                  error={errors.street}
                />
                
                {/* City and State row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    required
                    error={errors.city}
                  />
                  <Input
                    type="text"
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="NY"
                    required
                    error={errors.state}
                  />
                </div>
                
                {/* ZIP Code */}
                <Input
                  type="text"
                  label="ZIP Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="10001"
                  required
                  error={errors.zipCode}
                />
                
                {/* Phone Number */}
                <Input
                  type="text"
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567"
                  required
                  error={errors.phone}
                />
                
                {/* Email */}
                <Input
                  type="email"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  required
                  error={errors.email}
                />
              </div>
            </Card>
            
            {/* Payment Method */}
            <Card variant="outlined" padding="lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Payment Method
              </h2>
              
              {/* Payment method error */}
              {errors.paymentMethod && (
                <p className="text-sm text-red-500 mb-4" role="alert">
                  {errors.paymentMethod}
                </p>
              )}
              
              <div className="space-y-3">
                {paymentOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`
                      flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer
                      transition-all duration-200
                      ${
                        paymentMethod === option.value
                          ? 'border-brand-500 bg-brand-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={option.value}
                      checked={paymentMethod === option.value}
                      onChange={() => handlePaymentChange(option.value)}
                      className="sr-only"
                    />
                    
                    {/* Radio indicator */}
                    <div
                      className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center
                        ${
                          paymentMethod === option.value
                            ? 'border-brand-500'
                            : 'border-gray-300'
                        }
                      `}
                    >
                      {paymentMethod === option.value && (
                        <div className="w-2.5 h-2.5 rounded-full bg-brand-500" />
                      )}
                    </div>
                    
                    {/* Icon */}
                    <span className="text-xl">{option.icon}</span>
                    
                    {/* Label */}
                    <span className="font-medium text-gray-900">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
              
              {/* Mock payment info - only show if credit card selected */}
              {paymentMethod === 'credit-card' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    This is a demo. No real payment will be processed.
                  </p>
                </div>
              )}
              
              {/* Mock payment info for PayPal */}
              {paymentMethod === 'paypal' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    You will be redirected to PayPal to complete payment.
                  </p>
                </div>
              )}
              
              {/* Mock payment info for COD */}
              {paymentMethod === 'cod' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Payment will be collected upon delivery.
                  </p>
                </div>
              )}
            </Card>
          </div>
          
          {/* Right column - Order summary (1/3 width) */}
          <div className="md:col-span-1">
            <Card variant="elevated" padding="lg" className="sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              
              {/* Cart items */}
              <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3"
                  >
                    {/* Item image */}
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                      <PetImage
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full"
                      />
                    </div>
                    
                    {/* Item details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-brand-500">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Divider */}
              <div className="h-px bg-gray-200 my-4" />
              
              {/* Order totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>
                    Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                  </span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                
                <div className="h-px bg-gray-200 my-3" />
                
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-brand-500">${total.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Place Order button */}
              <Button
                variant="primary"
                size="lg"
                className="w-full mt-6"
                onClick={handlePlaceOrder}
                loading={loading}
                disabled={loading}
              >
                Place Order
              </Button>
            </Card>
          </div>
        </div>
      </SlideIn>
    </div>
  );
}