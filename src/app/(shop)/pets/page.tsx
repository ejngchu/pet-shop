'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import PetGrid from '@/components/pets/PetGrid';
import FilterSidebar from '@/components/pets/FilterSidebar';
import type { Pet, PetFilters, PetSpecies } from '@/components/pets/types';

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
 * Default filter state
 */
const DEFAULT_FILTERS: PetFilters = {
  species: 'all',
  priceMin: 0,
  priceMax: 1000,
  ageMin: 0,
  ageMax: 15,
  sortBy: 'price-asc',
};

/**
 * Price range bounds
 */
const PRICE_RANGE = { min: 0, max: 1000 };

/**
 * Age range bounds
 */
const AGE_RANGE = { min: 0, max: 15 };

/**
 * Species labels for display
 */
const SPECIES_LABELS: Record<PetSpecies | 'all', string> = {
  all: 'All',
  dog: 'Dog',
  cat: 'Cat',
  bird: 'Bird',
  rabbit: 'Rabbit',
};

/**
 * Sort labels for display
 */
const SORT_LABELS: Record<PetFilters['sortBy'], string> = {
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  'name-asc': 'Name: A to Z',
  'name-desc': 'Name: Z to A',
  'age-asc': 'Age: Young to Old',
  'age-desc': 'Age: Old to Young',
};

/**
 * PetListPage - Main pet listing page with search, filter, and sort functionality
 * Features: Search bar, filter sidebar, active filter badges, loading skeleton, empty state
 */
export default function PetListPage() {
  // Search state with debounce
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Filter and sort state
  const [filters, setFilters] = useState<PetFilters>(DEFAULT_FILTERS);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Mobile filter sidebar visibility
  const [showFilters, setShowFilters] = useState(false);

  // Debounced search (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Loading simulation on mount
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Handle filter changes
  const handleFiltersChange = useCallback((newFilters: PetFilters) => {
    setFilters(newFilters);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  // Clear all filters
  const handleClearAllFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSearchQuery('');
    setDebouncedSearch('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  // Remove single filter
  const handleRemoveFilter = useCallback(
    (filterKey: keyof PetFilters) => {
      const newFilters = { ...filters };

      switch (filterKey) {
        case 'species':
          newFilters.species = 'all';
          break;
        case 'priceMin':
          newFilters.priceMin = PRICE_RANGE.min;
          break;
        case 'priceMax':
          newFilters.priceMax = PRICE_RANGE.max;
          break;
        case 'ageMin':
          newFilters.ageMin = AGE_RANGE.min;
          break;
        case 'ageMax':
          newFilters.ageMax = AGE_RANGE.max;
          break;
        case 'sortBy':
          newFilters.sortBy = 'price-asc';
          break;
      }

      handleFiltersChange(newFilters);
    },
    [filters, handleFiltersChange]
  );

  // Filter and sort pets
  const filteredPets = useMemo(() => {
    let result = [...MOCK_PETS];

    // Search filter
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter(
        (pet) =>
          pet.name.toLowerCase().includes(query) ||
          pet.breed.toLowerCase().includes(query)
      );
    }

    // Species filter
    if (filters.species !== 'all') {
      result = result.filter((pet) => pet.species === filters.species);
    }

    // Price range filter
    result = result.filter(
      (pet) => pet.price >= filters.priceMin && pet.price <= filters.priceMax
    );

    // Age filter
    result = result.filter(
      (pet) => pet.age >= filters.ageMin && pet.age <= filters.ageMax
    );

    // Sort
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'age-asc':
        result.sort((a, b) => a.age - b.age);
        break;
      case 'age-desc':
        result.sort((a, b) => b.age - a.age);
        break;
    }

    return result;
  }, [debouncedSearch, filters]);

  // Get active filters for display
  const activeFilters = useMemo(() => {
    const active: { key: keyof PetFilters; value: string }[] = [];

    if (filters.species !== 'all') {
      active.push({ key: 'species', value: SPECIES_LABELS[filters.species] });
    }

    if (filters.priceMin !== PRICE_RANGE.min) {
      active.push({ key: 'priceMin', value: `$${filters.priceMin}+` });
    }

    if (filters.priceMax !== PRICE_RANGE.max) {
      active.push({ key: 'priceMax', value: `Up to $${filters.priceMax}` });
    }

    if (filters.ageMin !== AGE_RANGE.min) {
      active.push({ key: 'ageMin', value: `${filters.ageMin}+ years` });
    }

    if (filters.ageMax !== AGE_RANGE.max) {
      active.push({ key: 'ageMax', value: `Up to ${filters.ageMax} years` });
    }

    return active;
  }, [filters]);

  // Check if any filters are active
  const hasActiveFilters =
    filters.species !== 'all' ||
    filters.priceMin !== PRICE_RANGE.min ||
    filters.priceMax !== PRICE_RANGE.max ||
    filters.ageMin !== AGE_RANGE.min ||
    filters.ageMax !== AGE_RANGE.max;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop All Pets</h1>
          <p className="text-gray-600">Find your new best friend</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search by name or breed..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <Button
            variant="secondary"
            onClick={() => setShowFilters(!showFilters)}
            className="w-full"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar
                filters={filters}
                onFiltersChange={handleFiltersChange}
                priceRange={PRICE_RANGE}
                ageRange={AGE_RANGE}
              />
            </div>
          </div>

          {/* Filter Sidebar - Mobile */}
          {showFilters && (
            <div className="lg:hidden mb-4">
              <FilterSidebar
                filters={filters}
                onFiltersChange={handleFiltersChange}
                priceRange={PRICE_RANGE}
                ageRange={AGE_RANGE}
              />
            </div>
          )}

          {/* Pet Grid Content */}
          <div className="flex-1">
            {/* Results Count */}
            {!loading && (
              <p className="text-gray-600 mb-4">
                Showing {filteredPets.length} pet{filteredPets.length !== 1 ? 's' : ''}
              </p>
            )}

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm text-gray-500">Active filters:</span>
                {activeFilters.map((filter, index) => (
                <Badge>
                    key={`${filter.key}-${index}`}
                    variant="default"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    {filter.value}
                    <button>
                      onClick={() => handleRemoveFilter(filter.key)}
                      className="ml-1 text-sm hover:text-red-500 transition-colors"
                      aria-label={`Remove ${filter.value} filter`}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                <button
                  onClick={handleClearAllFilters}
                  className="text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Pet Grid */}
            <PetGrid pets={filteredPets} loading={loading} />

            {/* Empty State */}
            {!loading && filteredPets.length === 0 && hasActiveFilters && (
              <div className="text-center py-12 bg-white rounded-xl shadow-card">
                <div className="text-6xl mb-4">🐾</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No pets found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters to find more pets
                </p>
                <Button variant="secondary" onClick={handleClearAllFilters}>
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Empty State - No Search Results */}
            {!loading && filteredPets.length === 0 && !hasActiveFilters && (
              <div className="text-center py-12 bg-white rounded-xl shadow-card">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No pets found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try a different search term
                </p>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSearchQuery('');
                    setDebouncedSearch('');
                  }}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}