'use client';

import { useState, useCallback } from 'react';
import type { PetFilters, PetSpecies } from './types';

/**
 * Filter state for sidebar initialization
 */
interface FilterSidebarProps {
  /** Current filters */
  filters: PetFilters;
  /** Update filters callback */
  onFiltersChange: (filters: PetFilters) => void;
  /** Price range bounds */
  priceRange?: { min: number; max: number };
  /** Age range bounds */
  ageRange?: { min: number; max: number };
}

/**
 * Sort options available
 */
const SORT_OPTIONS: { value: PetFilters['sortBy']; label: string }[] = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'age-asc', label: 'Age: Young to Old' },
  { value: 'age-desc', label: 'Age: Old to Young' },
];

/**
 * Species options
 */
const SPECIES_OPTIONS: { value: PetSpecies | 'all'; label: string }[] = [
  { value: 'all', label: 'All Species' },
  { value: 'dog', label: '🐕 Dog' },
  { value: 'cat', label: '🐈 Cat' },
  { value: 'bird', label: '🐦 Bird' },
  { value: 'rabbit', label: '🐰 Rabbit' },
];

/**
 * Age filter presets
 */
const AGE_PRESETS = [
  { value: 'all', label: 'Any Age' },
  { value: 'young', label: 'Young (< 1 year)' },
  { value: 'adult', label: 'Adult (1-3 years)' },
  { value: 'senior', label: 'Senior (3+ years)' },
];

/**
 * FilterSidebar - Sidebar component for filtering pets
 * Features: Species dropdown, Price range slider, Age filter, Sort by, Clear filters
 * 
 * @example
 * ```tsx
 * <FilterSidebar
 *   filters={filters}
 *   onFiltersChange={setFilters}
 *   priceRange={{ min: 0, max: 5000 }}
 *   ageRange={{ min: 0, max: 15 }}
 * />
 * ```
 */
export default function FilterSidebar({
  filters,
  onFiltersChange,
  priceRange = { min: 0, max: 5000 },
  ageRange = { min: 0, max: 15 },
}: FilterSidebarProps) {
  // Local state for input values (to avoid too many updates while dragging sliders)
  const [localPriceMin, setLocalPriceMin] = useState(filters.priceMin);
  const [localPriceMax, setLocalPriceMax] = useState(filters.priceMax);
  const [localAgeMin, setLocalAgeMin] = useState(filters.ageMin);
  const [localAgeMax, setLocalAgeMax] = useState(filters.ageMax);

  // Debounced filter update
  const updateFilter = useCallback(
    (updates: Partial<PetFilters>) => {
      onFiltersChange({ ...filters, ...updates });
    },
    [filters, onFiltersChange]
  );

  // Handle species change
  const handleSpeciesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilter({ species: e.target.value as PetSpecies | 'all' });
  };

  // Handle price min change (debounced)
  const handlePriceMinChange = (value: number) => {
    setLocalPriceMin(value);
  };

  // Handle price max change (debounced)
  const handlePriceMaxChange = (value: number) => {
    setLocalPriceMax(value);
  };

  // Handle price slider commit
  const handlePriceCommit = () => {
    updateFilter({ priceMin: localPriceMin, priceMax: localPriceMax });
  };

  // Handle age min change
  const handleAgeMinChange = (value: number) => {
    setLocalAgeMin(value);
  };

  // Handle age max change
  const handleAgeMaxChange = (value: number) => {
    setLocalAgeMax(value);
  };

  // Handle age slider commit
  const handleAgeCommit = () => {
    updateFilter({ ageMin: localAgeMin, ageMax: localAgeMax });
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilter({ sortBy: e.target.value as PetFilters['sortBy'] });
  };

  // Handle age preset selection
  const handleAgePreset = (preset: string) => {
    let min = ageRange.min;
    let max = ageRange.max;

    switch (preset) {
      case 'young':
        min = 0;
        max = 1;
        break;
      case 'adult':
        min = 1;
        max = 3;
        break;
      case 'senior':
        min = 3;
        max = ageRange.max;
        break;
      default:
        min = ageRange.min;
        max = ageRange.max;
    }

    setLocalAgeMin(min);
    setLocalAgeMax(max);
    updateFilter({ ageMin: min, ageMax: max });
  };

  // Clear all filters
  const handleClearFilters = () => {
    const defaultFilters: PetFilters = {
      species: 'all',
      priceMin: priceRange.min,
      priceMax: priceRange.max,
      ageMin: ageRange.min,
      ageMax: ageRange.max,
      sortBy: 'price-asc',
    };
    setLocalPriceMin(priceRange.min);
    setLocalPriceMax(priceRange.max);
    setLocalAgeMin(ageRange.min);
    setLocalAgeMax(ageRange.max);
    onFiltersChange(defaultFilters);
  };

  // Check if any filters are active
  const hasActiveFilters =
    filters.species !== 'all' ||
    filters.priceMin !== priceRange.min ||
    filters.priceMax !== priceRange.max ||
    filters.ageMin !== ageRange.min ||
    filters.ageMax !== ageRange.max;

  // Format price for display
  const formatPrice = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <aside className="bg-white rounded-xl p-4 shadow-card space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Species Filter */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Species</label>
        <select
          value={filters.species}
          onChange={handleSpeciesChange}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
        >
          {SPECIES_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Price Range
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={priceRange.min}
            max={localPriceMax}
            value={localPriceMin}
            onChange={(e) => handlePriceMinChange(Number(e.target.value))}
            onBlur={handlePriceCommit}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
            placeholder="Min"
          />
          <span className="text-gray-400">—</span>
          <input
            type="number"
            min={localPriceMin}
            max={priceRange.max}
            value={localPriceMax}
            onChange={(e) => handlePriceMaxChange(Number(e.target.value))}
            onBlur={handlePriceCommit}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
            placeholder="Max"
          />
        </div>
        <div className="text-xs text-gray-500 text-center">
          {formatPrice(localPriceMin)} - {formatPrice(localPriceMax)}
        </div>
      </div>

      {/* Age Filter Presets */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Age</label>
        <div className="flex flex-wrap gap-2">
          {AGE_PRESETS.map((preset) => (
            <button
              key={preset.value}
              onClick={() => handleAgePreset(preset.value)}
              className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-brand-100 hover:text-brand-700 rounded-full transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Age Range Input */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Age Range (Years)
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={ageRange.min}
            max={localAgeMax}
            value={localAgeMin}
            onChange={(e) => handleAgeMinChange(Number(e.target.value))}
            onBlur={handleAgeCommit}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
            placeholder="Min"
          />
          <span className="text-gray-400">—</span>
          <input
            type="number"
            min={localAgeMin}
            max={ageRange.max}
            value={localAgeMax}
            onChange={(e) => handleAgeMaxChange(Number(e.target.value))}
            onBlur={handleAgeCommit}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
            placeholder="Max"
          />
        </div>
      </div>

      {/* Sort By */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={handleSortChange}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters Button (mobile) */}
      {hasActiveFilters && (
        <button
          onClick={handleClearFilters}
          className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          Clear Filters
        </button>
      )}
    </aside>
  );
}