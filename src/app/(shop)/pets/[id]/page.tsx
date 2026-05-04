import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import PetImage from '@/components/pets/PetImage';
import PetCard from '@/components/pets/PetCard';
import FadeIn from '@/components/animations/FadeIn';
import { useCartStore } from '@/stores/cart-store';
import { petToProduct, type Pet, type PetSpecies } from '@/components/pets/types';

/**
 * Mock pet data - 12 pets with varied species, ages, and prices
 * Same as Pet List page
 */
const MOCK_PETS: Pet[] = [
  {
    id: '1',
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: 3,
    price: 450,
    image: '/pet-1.jpg',
    species: 'dog',
    description: 'Friendly and energetic Golden Retriever puppy.',
  },
  {
    id: '2',
    name: 'Whiskers',
    breed: 'Persian',
    age: 2,
    price: 200,
    image: '/pet-2.jpg',
    species: 'cat',
    description: 'Calm and affectionate Persian cat.',
  },
  {
    id: '3',
    name: 'Tweety',
    breed: 'Cockatiel',
    age: 1,
    price: 80,
    image: '/pet-3.jpg',
    species: 'bird',
    description: 'Playful cockatiel who loves to whistle.',
  },
  {
    id: '4',
    name: 'Thumper',
    breed: 'Holland Lop',
    age: 1,
    price: 60,
    image: '/pet-4.jpg',
    species: 'rabbit',
    description: 'Sweet and cuddly Holland Lop bunny.',
  },
  {
    id: '5',
    name: 'Max',
    breed: 'German Shepherd',
    age: 5,
    price: 350,
    image: '/pet-5.jpg',
    species: 'dog',
    description: 'Loyal and protective German Shepherd.',
  },
  {
    id: '6',
    name: 'Luna',
    breed: 'Siamese',
    age: 4,
    price: 180,
    image: '/pet-6.jpg',
    species: 'cat',
    description: 'Talkative and intelligent Siamese cat.',
  },
  {
    id: '7',
    name: 'Rio',
    breed: 'Budgerigar',
    age: 2,
    price: 50,
    image: '/pet-7.jpg',
    species: 'bird',
    description: 'Colorful parakeet who loves to sing.',
  },
  {
    id: '8',
    name: 'Cotton',
    breed: 'Angora',
    age: 1,
    price: 75,
    image: '/pet-8.jpg',
    species: 'rabbit',
    description: 'Fluffy Angora rabbit with soft fur.',
  },
  {
    id: '9',
    name: 'Rocky',
    breed: 'Bulldog',
    age: 7,
    price: 300,
    image: '/pet-9.jpg',
    species: 'dog',
    description: 'Gentle and lazy Bulldog who loves naps.',
  },
  {
    id: '10',
    name: 'Mittens',
    breed: 'Maine Coon',
    age: 3,
    price: 250,
    image: '/pet-10.jpg',
    species: 'cat',
    description: 'Majestic Maine Coon with fluffy tail.',
  },
  {
    id: '11',
    name: 'Sunny',
    breed: 'Canary',
    age: 1,
    price: 70,
    image: '/pet-11.jpg',
    species: 'bird',
    description: 'Beautiful canary with melodic song.',
  },
  {
    id: '12',
    name: 'Snowball',
    breed: 'Netherland Dwarf',
    age: 2,
    price: 55,
    image: '/pet-12.jpg',
    species: 'rabbit',
    description: 'Tiny and adorable dwarf rabbit.',
  },
];

/**
 * Species emoji icons
 */
const SPECIES_EMOJI: Record<PetSpecies, string> = {
  dog: '🐕',
  cat: '🐈',
  bird: '🐦',
  rabbit: '🐇',
};

/**
 * Size labels by species
 */
const SIZE_LABELS: Record<PetSpecies, string> = {
  dog: 'Large',
  cat: 'Medium',
  bird: 'Small',
  rabbit: 'Small',
};

/**
 * Energy level mappings (random for demo)
 */
const ENERGY_LEVELS: Record<string, 'Low' | 'Medium' | 'High'> = {
  '1': 'Low',
  '2': 'Medium',
  '3': 'Medium',
  '4': 'High',
  '5': 'High',
  '7': 'Low',
};

/**
 * Grooming needs mappings (based on species)
 */
const GROOMING_NEEDS: Record<PetSpecies, 'Low' | 'Medium' | 'High'> = {
  dog: 'Medium',
  cat: 'Medium',
  bird: 'Low',
  rabbit: 'High',
};

/**
 * Get energy level for a pet based on id hash
 */
function getEnergyLevel(petId: string): 'Low' | 'Medium' | 'High' {
  const hash = petId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const levels: ('Low' | 'Medium' | 'High')[] = ['Low', 'Medium', 'High'];
  return levels[hash % 3];
}

/**
 * Get size label for a pet
 */
function getSizeLabel(pet: Pet): string {
  return SIZE_LABELS[pet.species];
}

/**
 * Find pet by ID from mock data
 */
function findPetById(id: string): Pet | undefined {
  return MOCK_PETS.find((pet) => pet.id === id);
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ 
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const pet = findPetById(id);
  
  if (!pet) {
    return {
      title: 'Pet Not Found | PetShop',
      description: 'The pet you are looking for does not exist.',
    };
  }
  
  return {
    title: `${pet.name} | PetShop`,
    description: `${pet.breed} - ${pet.age} years old, $${pet.price}`,
  };
}

/**
 * Loading skeleton component
 */
function PetDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image skeleton */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-200 animate-pulse rounded-xl" />
          <div className="flex gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-20 h-20 bg-gray-200 animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
        
        {/* Details skeleton */}
        <div className="space-y-6">
          <div className="h-10 bg-gray-200 animate-pulse rounded-lg w-3/4" />
          <div className="h-6 bg-gray-200 animate-pulse rounded-lg w-1/2" />
          <div className="h-8 bg-gray-200 animate-pulse rounded-lg w-1/3" />
          <div className="h-20 bg-gray-200 animate-pulse rounded-lg" />
          
          {/* Characteristics skeleton */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 bg-gray-200 animate-pulse rounded-full w-20" />
            ))}
          </div>
          
          {/* Add to cart skeleton */}
          <div className="h-12 bg-gray-200 animate-pulse rounded-lg w-48" />
        </div>
      </div>
    </div>
  );
}

/**
 * PetDetailPage - Individual pet detail page
 * Features: Image gallery, details, add to cart, related pets
 */
export default async function PetDetailPage({ 
  params,
}: { 
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Find pet from mock data
  const pet = useMemo(() => findPetById(id), [id]);
  
  // Loading state
  const [loading, setLoading] = useState(true);
  
  // Selected image for gallery
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Quantity selector
  const [quantity, setQuantity] = useState(1);
  
  // Add to cart feedback
  const [showAdded, setShowAdded] = useState(false);
  
  // Get cart store
  const { items, addItem } = useCartStore();
  
  // Check if pet is already in cart
  const cartItem = items.find((item) => item.product.id === id);
  const quantityInCart = cartItem?.quantity ?? 0;
  
  // Simulated loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [params.id]);
  
  // Not found state
  if (!loading && !pet) {
    notFound();
  }
  
  // Get related pets (same species, exclude current, take 3)
  const relatedPets = useMemo(() => {
    if (!pet) return [];
    return MOCK_PETS
      .filter((p) => p.species === pet.species && p.id !== pet.id)
      .slice(0, 3);
  }, [pet]);
  
  // Mock thumbnails (uses same image for demo)
  const thumbnails = pet?.image ? [pet.image, pet.image, pet.image] : ['/placeholder-1.jpg', '/placeholder-2.jpg', '/placeholder-3.jpg'];
  
  // Format price
  const priceDisplay = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(pet?.price ?? 0);
  
  // Handle quantity change
  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (pet) {
      const product = petToProduct(pet);
      // Add quantity times
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
      setShowAdded(true);
      setTimeout(() => setShowAdded(false), 2000);
    }
  };
  
  // Get characteristics
  const energyLevel = pet ? getEnergyLevel(pet.id) : 'Medium';
  const groomingNeeds = pet ? GROOMING_NEEDS[pet.species] : 'Low';
  const sizeLabel = pet ? getSizeLabel(pet) : 'Small';
  
  // Badge variants for characteristics
  const getBadgeVariant = (level: string) => {
    if (level === 'Low') return 'success';
    if (level === 'Medium') return 'warning';
    return 'danger';
  };
  
  // Loading skeleton
  if (loading) {
    return <PetDetailSkeleton />;
  }
  
  if (!pet) {
    return <PetDetailSkeleton />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <FadeIn>
          <Link
            href="/pets"
            className="inline-flex items-center gap-2 text-brown-600 hover:text-brown-700 font-medium mb-6 transition-colors"
          >
            <span>←</span>
            <span>Back to Pets</span>
          </Link>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <FadeIn delay={0.1}>
            <div className="aspect-square relative rounded-xl overflow-hidden bg-white shadow-card">
              <PetImage>
                src={(pet?.image || '/placeholder.jpg')}
                alt={`${pet.name} - ${pet.breed}`}
                className="w-full h-full"
              />
            </div>
          </FadeIn>
          
          {/* Pet Details */}
          <FadeIn delay={0.2}>
            <div className="space-y-6">
              {/* Name and Breed */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {pet.name}
                </h1>
                <p className="text-xl text-gray-600">{pet.breed}</p>
              </div>
              
              {/* Age */}
              <p className="text-gray-600">
                {pet.age === 1 ? '1 year old' : `${pet.age} years old`}
              </p>
              
              {/* Price */}
              <p className="text-2xl text-brand-500 font-bold">
                {priceDisplay}
              </p>
              
              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {pet.description}
              </p>
              
              {/* Characteristics */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="default" size="md">
                  {`${SPECIES_EMOJI[pet.species]} ${pet.species.charAt(0).toUpperCase() + pet.species.slice(1)}`}
                </Badge>
                <Badge variant="default" size="md">
                  Size: {sizeLabel}
                </Badge>
                <Badge variant={getBadgeVariant(energyLevel)} size="md">
                  Energy: {energyLevel}
                </Badge>
                <Badge variant={getBadgeVariant(groomingNeeds)} size="md">
                  {`Grooming: ${groomingNeeds}`}
                </Badge>
              </div>
              
              {/* Add to Cart Section */}
              <div className="bg-white rounded-xl p-6 shadow-card">
                <div className="flex items-center gap-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      −
                    </Button>
                    <span className="w-8 text-center font-medium text-gray-900">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= 10}
                    >
                      +
                    </Button>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleAddToCart}
                    className="flex-1"
                  >
                    Add to Cart
                  </Button>
                </div>
                
                {/* In Cart State */}
                {quantityInCart > 0 && (
                  <div className="mt-3 flex items-center gap-2 text-green-600 text-sm font-medium">
                    <span>✓</span>
                    <span>In Cart ({quantityInCart})</span>
                  </div>
                )}
                
                {/* Added Feedback */}
                {showAdded && (
                  <div className="mt-3 flex items-center gap-2 text-green-600 text-sm font-medium animate-pulse">
                    <span>✓</span>
                    <span>Added!</span>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
        
        {/* Related Pets Section */}
        {relatedPets.length > 0 && (
          <FadeIn delay={0.3}>
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPets.map((relatedPet) => (
                  <PetCard key={relatedPet.id} pet={relatedPet} />
                ))}
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}