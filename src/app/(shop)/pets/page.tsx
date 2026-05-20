'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import PetGrid from '@/components/pets/PetGrid';
import FilterSidebar from '@/components/pets/FilterSidebar';
import { usePetStore } from '@/stores/pet-store';
import type { PetFilters, PetSpecies } from '@/components/pets/types';

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

// Animation variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut' as const,
    },
  },
};

const slideInVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut' as const,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/**
 * PetListPage - Main pet listing page with search, filter, and sort functionality
 * Features: Search bar, filter sidebar, active filter badges, loading skeleton, empty state
 */
export default function PetListPage() {
  // Zustand stores
  const { pets: storePets, isLoading: storeLoading, fetchPets } = usePetStore();

  // Search state with debounce
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Filter and sort state
  const [filters, setFilters] = useState<PetFilters>(DEFAULT_FILTERS);

  // Loading state (combines store loading with filter loading)
  const [filterLoading, setFilterLoading] = useState(false);

  // Mobile filter sidebar visibility
  const [showFilters, setShowFilters] = useState(false);

  // Local loading state (true initially until store loads)
  const [initialLoad, setInitialLoad] = useState(true);

  // Fetch pets on mount
  useEffect(() => {
    const loadPets = async () => {
      await fetchPets();
      setInitialLoad(false);
    };
    loadPets();
  }, [fetchPets]);

  // Combined loading state
  const loading = initialLoad || storeLoading || filterLoading;

  // Debounced search (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle filter changes
  const handleFiltersChange = useCallback((newFilters: PetFilters) => {
    setFilters(newFilters);
    setFilterLoading(true);
    setTimeout(() => {
      setFilterLoading(false);
    }, 300);
  }, []);

  // Clear all filters
  const handleClearAllFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSearchQuery('');
    setDebouncedSearch('');
    setFilterLoading(true);
    setTimeout(() => {
      setFilterLoading(false);
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

  // Filter and sort pets from store
  const filteredPets = useMemo(() => {
    let result = [...storePets];

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
  }, [storePets, debouncedSearch, filters]);

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
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop All Pets</h1>
          <p className="text-gray-600">Find your new best friend</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Input
            type="text"
            placeholder="Search by name or breed..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </motion.div>

        {/* Mobile Filter Toggle */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          transition={{ delay: 0.15 }}
          className="lg:hidden mb-4"
        >
          <Button
            variant="secondary"
            onClick={() => setShowFilters(!showFilters)}
            className="w-full"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar - Desktop */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideInVariants}
            className="hidden lg:block w-64 flex-shrink-0"
          >
            <div className="sticky top-24">
              <FilterSidebar
                filters={filters}
                onFiltersChange={handleFiltersChange}
                priceRange={PRICE_RANGE}
                ageRange={AGE_RANGE}
              />
            </div>
          </motion.div>

          {/* Filter Sidebar - Mobile */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={slideInVariants}
                className="lg:hidden mb-4"
              >
                <FilterSidebar
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  priceRange={PRICE_RANGE}
                  ageRange={AGE_RANGE}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pet Grid Content */}
          <div className="flex-1">
            {/* Results Count */}
            <AnimatePresence mode="wait">
              {!loading && (
                <motion.p
                  key="results-count"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-gray-600 mb-4"
                >
                  Showing {filteredPets.length} pet{filteredPets.length !== 1 ? 's' : ''}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Active Filters */}
            <AnimatePresence mode="wait">
              {activeFilters.length > 0 && (
                <motion.div
                  key="active-filters"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={staggerContainer}
                  className="flex flex-wrap items-center gap-2 mb-4"
                >
                  <span className="text-sm text-gray-500">Active filters:</span>
                  {activeFilters.map((filter, index) => (
                    <motion.div
                      key={`${filter.key}-${index}`}
                      variants={fadeInVariants}
                      className="flex items-center gap-1"
                    >
                      <Badge variant="default" size="sm" className="flex items-center gap-1">
                        {filter.value}
                      </Badge>
                      <button
                        onClick={() => handleRemoveFilter(filter.key)}
                        className="ml-1 text-sm hover:text-red-500 transition-colors"
                        aria-label={`Remove ${filter.value} filter`}
                      >
                        ×
                      </button>
                    </motion.div>
                  ))}
                  <button
                    onClick={handleClearAllFilters}
                    className="text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors"
                  >
                    Clear All
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pet Grid */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              transition={{ delay: 0.2 }}
            >
              <PetGrid pets={filteredPets} loading={loading} />
            </motion.div>

            {/* Empty State */}
            <AnimatePresence>
              {!loading && filteredPets.length === 0 && hasActiveFilters && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-12 bg-white rounded-xl shadow-card"
                >
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
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty State - No Search Results */}
            <AnimatePresence>
              {!loading && filteredPets.length === 0 && !hasActiveFilters && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-12 bg-white rounded-xl shadow-card"
                >
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}