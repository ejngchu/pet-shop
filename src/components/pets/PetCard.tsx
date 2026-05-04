'use client';

import { motion } from 'framer-motion';
import { useCartStore } from '@/stores/cart-store';
import { petToProduct, type Pet } from './types';
import PetImage from './PetImage';

/**
 * PetCard - Product card component for displaying pet information
 * Features: Image, name, breed, age, price, Add to Cart button with animation
 * Hover effect: scale 1.05 with Framer Motion
 * 
 * @example
 * ```tsx
 * <PetCard pet={pet} />
 * ```
 */
interface PetCardProps {
  /** The pet data to display */
  pet: Pet;
}

export default function PetCard({ pet }: PetCardProps) {
  const { items, addItem } = useCartStore();
  
  // Check if pet is already in cart
  const cartItem = items.find((item) => item.product.id === pet.id);
  const quantityInCart = cartItem?.quantity ?? 0;

  const handleAddToCart = () => {
    const product = petToProduct(pet);
    addItem(product);
  };

  // Format age display
  const ageDisplay = pet.age === 1 ? '1 year old' : `${pet.age} years old`;
  
  // Format price display
  const priceDisplay = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(pet.price);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-pet-hover transition-shadow duration-300"
    >
      {/* Pet Image */}
      <div className="aspect-square relative">
        <PetImage
          src={pet.image}
          alt={`${pet.name} - ${pet.breed}`}
          className="w-full h-full"
        />
        
        {/* Species badge */}
        <span className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-brown-700 capitalize">
          {pet.species}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Name and Breed */}
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {pet.name}
          </h3>
          <p className="text-sm text-gray-500 truncate">{pet.breed}</p>
        </div>

        {/* Age and Price */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">{ageDisplay}</span>
          <span className="text-lg font-bold text-brand-600">{priceDisplay}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
          {pet.description}
        </p>

        {/* Add to Cart Button */}
        <motion.button
          onClick={handleAddToCart}
          className="w-full py-2.5 px-4 bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-medium rounded-lg shadow-button hover:shadow-pet-hover transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 flex items-center justify-center gap-2"
          whileTap={{ scale: 0.95 }}
        >
          {quantityInCart > 0 ? (
            <>
              <span>Add Another</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
                {quantityInCart}
              </span>
            </>
          ) : (
            <span>Add to Cart</span>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}