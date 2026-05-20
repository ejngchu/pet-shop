# PetShop - Pet E-commerce Website

A modern pet shop website built with Next.js 16, featuring 10 pages for browsing, shopping, and managing pet adoptions.

## Tech Stack

- **Framework**: Next.js 16.2.4 (App Router)
- **UI**: Tailwind CSS v4, Framer Motion
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Language**: TypeScript

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with featured pets |
| About | `/about` | Company information |
| Store Info | `/store-info` | Store location and hours |
| Guarantee | `/guarantee` | Service guarantee |
| Pets | `/pets` | Browse all pets with filters |
| Pet Detail | `/pets/[id]` | Individual pet page |
| Cart | `/cart` | Shopping cart |
| Checkout | `/checkout` | Order placement |
| Login | `/login` | User login |
| Register | `/register` | User registration |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (marketing)/        # Public pages
│   └── (shop)/            # Shop routes
├── components/
│   ├── ui/                # Reusable UI components
│   ├── animations/        # Animation components
│   ├── pets/              # Pet-related components
│   └── navigation/        # Header, NavBar, Footer
├── stores/                 # Zustand state stores
└── lib/                   # Utilities
```

## Features

- Pet browsing with search and filters
- Shopping cart with localStorage persistence
- User authentication
- Responsive design (mobile + desktop)
- Page transition animations
- AI-generated pet images (Wanx/通义万相)
