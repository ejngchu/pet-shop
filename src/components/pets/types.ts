/**
 * Pet data types for the pet shop application
 */

export type PetSpecies = 'dog' | 'cat' | 'bird' | 'rabbit';

/**
 * Pet interface representing a pet available for adoption/purchase
 */
export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  price: number;
  image: string;
  species: PetSpecies;
  description: string;
}

/**
 * Filter state for pet filtering
 */
export interface PetFilters {
  species: PetSpecies | 'all';
  priceMin: number;
  priceMax: number;
  ageMin: number;
  ageMax: number;
  sortBy: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'age-asc' | 'age-desc';
}

/**
 * Convert Pet to Product for cart store compatibility
 */
export function petToProduct(pet: Pet): {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
} {
  return {
    id: pet.id,
    name: `${pet.name} (${pet.breed})`,
    price: pet.price,
    image: pet.image,
    stock: 1,
  };
}