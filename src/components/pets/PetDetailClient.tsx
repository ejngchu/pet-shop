'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import PetImage from '@/components/pets/PetImage';
import PetCard from '@/components/pets/PetCard';
import FadeIn from '@/components/animations/FadeIn';
import { useCartStore } from '@/stores/cart-store';
import { petToProduct, type Pet, type PetSpecies } from '@/components/pets/types';

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
 * Loading skeleton component
 */
function PetDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square bg-gray-200 animate-pulse rounded-xl" />
          <div className="flex gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-20 h-20 bg-gray-200 animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-10 bg-gray-200 animate-pulse rounded-lg w-3/4" />
          <div className="h-6 bg-gray-200 animate-pulse rounded-lg w-1/2" />
          <div className="h-8 bg-gray-200 animate-pulse rounded-lg w-1/3" />
          <div className="h-20 bg-gray-200 animate-pulse rounded-lg" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 bg-gray-200 animate-pulse rounded-full w-20" />
            ))}
          </div>
          <div className="h-12 bg-gray-200 animate-pulse rounded-lg w-48" />
        </div>
      </div>
    </div>
  );
}

interface PetDetailClientProps {
  pet: Pet;
  relatedPets: Pet[];
  priceDisplay: string;
}

/**
 * PetDetailClient - Client component for interactive pet details
 */
export default function PetDetailClient({ pet, relatedPets, priceDisplay }: PetDetailClientProps) {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showAdded, setShowAdded] = useState(false);

  const { items, addItem } = useCartStore();

  const cartItem = items.find((item) => item.product.id === pet.id);
  const quantityInCart = cartItem?.quantity ?? 0;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  const handleAddToCart = () => {
    const product = petToProduct(pet);
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  const energyLevel = getEnergyLevel(pet.id);
  const groomingNeeds = GROOMING_NEEDS[pet.species];
  const sizeLabel = getSizeLabel(pet);

  const getBadgeVariant = (level: string) => {
    if (level === 'Low') return 'success';
    if (level === 'Medium') return 'warning';
    return 'danger';
  };

  if (loading) {
    return <PetDetailSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
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
          <FadeIn delay={0.1}>
            <div className="aspect-square relative rounded-xl overflow-hidden bg-white shadow-card">
              <PetImage
                src={pet.image || '/placeholder.jpg'}
                alt={`${pet.name} - ${pet.breed}`}
                className="w-full h-full"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {pet.name}
                </h1>
                <p className="text-xl text-gray-600">{pet.breed}</p>
              </div>

              <p className="text-gray-600">
                {pet.age === 1 ? '1 year old' : `${pet.age} years old`}
              </p>

              <p className="text-2xl text-brand-500 font-bold">
                {priceDisplay}
              </p>

              <p className="text-gray-600 leading-relaxed">
                {pet.description}
              </p>

              <div className="flex flex-wrap gap-2">
                <Badge variant="default" size="md">
                  {`${SPECIES_EMOJI[pet.species]} ${pet.species.charAt(0).toUpperCase() + pet.species.slice(1)}`}
                </Badge>
                <Badge variant="default" size="md">
                  {`Size: ${sizeLabel}`}
                </Badge>
                <Badge variant={getBadgeVariant(energyLevel)} size="md">
                  {`Energy: ${energyLevel}`}
                </Badge>
                <Badge variant={getBadgeVariant(groomingNeeds)} size="md">
                  {`Grooming: ${groomingNeeds}`}
                </Badge>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-card">
                <div className="flex items-center gap-4">
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

                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleAddToCart}
                    className="flex-1"
                  >
                    Add to Cart
                  </Button>
                </div>

                {quantityInCart > 0 && (
                  <div className="mt-3 flex items-center gap-2 text-green-600 text-sm font-medium">
                    <span>✓</span>
                    <span>In Cart ({quantityInCart})</span>
                  </div>
                )}

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
