"use client";

import { create } from 'zustand';
import type { Pet } from '@/components/pets/types';

/**
 * Pet store state interface
 */
interface PetState {
  pets: Pet[];
  isLoading: boolean;
  error: string | null;
  fetchPets: () => Promise<void>;
  getPetById: (id: string) => Pet | undefined;
}

/**
 * Mock pet data - 12 pets with varied species, ages, and prices
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
 * Pet store hook using Zustand
 * Manages pet data fetching and state
 * @example
 * ```typescript
 * const { pets, isLoading, fetchPets } = usePetStore();
 * ```
 */
export const usePetStore = create<PetState>((set, get) => ({
  pets: [],
  isLoading: false,
  error: null,

  /**
   * Fetches pets from the store (simulates API call)
   */
  fetchPets: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      set({ pets: MOCK_PETS, isLoading: false });
    } catch {
      set({ error: 'Failed to fetch pets', isLoading: false });
    }
  },

  /**
   * Gets a pet by ID from the store
   * @param id - The pet ID to find
   * @returns The pet if found, undefined otherwise
   */
  getPetById: (id: string) => {
    return get().pets.find((pet) => pet.id === id);
  },
}));