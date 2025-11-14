# Next.js 16 MCP Configuration

This document describes the Model Context Protocol (MCP) configuration for the Next.js 16 e-commerce project.

## Overview

The Model Context Protocol (MCP) enables AI assistants like Claude to better understand and work with your codebase by providing structured context about your project.

## Project Structure

```
shophub/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   └── lib/             # Utility functions and types
├── public/              # Static assets
├── next.config.ts       # Next.js configuration with Turbopack
└── package.json         # Dependencies and scripts
```

## Key Features

### 1. **Turbopack Integration** ⚡
- Enabled for faster development builds
- Configured in `next.config.ts`
- Development server starts significantly faster than Webpack

### 2. **E-commerce Functionality**
- **Product Catalog**: Complete product listing with search, filtering, and sorting
- **Categories**: Organized product categories with dedicated pages
- **Shopping Cart**: Full cart functionality with real-time updates
- **Checkout**: Complete checkout flow

### 3. **UI Components**
- Built with Radix UI primitives for accessibility
- Styled with Tailwind CSS
- Responsive design for all screen sizes

### 4. **Type Safety**
- Full TypeScript implementation
- Proper type definitions for all components and utilities

## MCP Integration Points

When working with this project via MCP-enabled tools, the AI assistant has access to:

### Available Routes
- `/` - Home page with featured products
- `/products` - All products with search and filtering
- `/products/[id]` - Individual product details
- `/categories` - Category listing
- `/categories/[category]` - Products by category
- `/checkout` - Checkout page

### Key Components
- `ProductCard` - Reusable product card component
- `Navigation` - Site navigation with cart integration
- `CartSheet` - Shopping cart sidebar
- `ProductPage` - Detailed product view with related products

### State Management
- React Context for cart state
- useReducer for complex state updates
- Type-safe actions and state

## Development Commands

```bash
# Development with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## API Endpoints (Future Enhancement)

This project can be extended with API routes:

- `/api/products` - Product data
- `/api/categories` - Category data
- `/api/cart` - Cart operations
- `/api/checkout` - Payment processing

## Database Schema (Future Enhancement)

```typescript
interface ProductDB {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  subcategory: string
  brand: string
  images: string[]
  rating: number
  reviews: number
  inStock: boolean
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

interface CategoryDB {
  id: string
  name: string
  slug: string
  description: string
  image: string
  parentId?: string
}
```

## Build Configuration

### next.config.ts
```typescript
turbopack: {}, // Enabled for development
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
  ],
}
```

### Dependencies
- Next.js 16.0.1
- React 19.2.0
- TypeScript 5.x
- Tailwind CSS 4.x
- Radix UI components

## Troubleshooting MCP

If MCP tools have trouble understanding the codebase:

1. Ensure all TypeScript types are properly exported
2. Keep component props interfaces well-documented
3. Maintain clear file organization
4. Use consistent naming conventions

## Future Enhancements

- [ ] Add database integration (PostgreSQL/Prisma)
- [ ] Implement user authentication
- [ ] Add payment processing (Stripe)
- [ ] Create admin dashboard
- [ ] Add product reviews and ratings
- [ ] Implement order tracking
- [ ] Add search with Algolia/Elasticsearch

---

**Last Updated**: 2025-11-14
**Next.js Version**: 16.0.1
**Bundler**: Turbopack
