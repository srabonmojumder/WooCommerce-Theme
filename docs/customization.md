# Customization Guide

This guide covers how to customize the Stacker WooCommerce Theme to match your brand and requirements.

## Theme Configuration

### Colors and Branding

#### Tailwind CSS Configuration

Edit `tailwind.config.js` to customize your color palette:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          500: '#6b7280',
          600: '#4b5563',
        }
      }
    }
  }
}
```

#### CSS Variables

Modify global CSS variables in `src/app/globals.css`:

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #6b7280;
  --accent-color: #f59e0b;
  --text-color: #1f2937;
  --background-color: #ffffff;
}
```

### Typography

#### Font Configuration

Update fonts in `src/app/layout.tsx`:

```typescript
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ subsets: ['latin'] })
```

#### Typography Scale

Customize typography in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      }
    }
  }
}
```

## Component Customization

### Header Component

Location: `src/components/Header.tsx`

```typescript
// Customize navigation items
const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

// Customize logo
const Logo = () => (
  <Image
    src="/logo.png"
    alt="Your Store"
    width={120}
    height={40}
  />
)
```

### Product Card Component

Location: `src/components/ProductCard.tsx`

Customize product display:
- Product image aspect ratio
- Price formatting
- Button styles
- Badge positioning

### Footer Component

Location: `src/components/Footer.tsx`

Update footer content:
- Company information
- Social media links
- Newsletter signup
- Legal pages

## Page Customization

### Homepage

Location: `src/app/page.tsx`

Sections you can customize:
- Hero banner
- Featured products
- Categories showcase
- Testimonials
- Newsletter signup

### Product Pages

Location: `src/app/product/[slug]/page.tsx`

Customize:
- Product image gallery
- Product information layout
- Related products
- Reviews section

### Shop Page

Location: `src/app/shop/page.tsx`

Modify:
- Product grid layout
- Filtering options
- Sorting functionality
- Pagination style

## Styling Guidelines

### CSS Organization

```
src/styles/
├── globals.css          # Global styles
├── components.css       # Component-specific styles
└── utilities.css        # Custom utility classes
```

### Component Structure

```typescript
// Component template
interface ComponentProps {
  // Define props
}

export default function Component({ ...props }: ComponentProps) {
  return (
    <div className="component-wrapper">
      {/* Component content */}
    </div>
  )
}
```

### Responsive Design

Use Tailwind's responsive prefixes:

```typescript
<div className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  xl:grid-cols-4
  gap-4
">
  {/* Responsive grid */}
</div>
```

## Advanced Customization

### Custom Hooks

Create custom hooks in `src/hooks/`:

```typescript
// src/hooks/useCart.ts
export function useCart() {
  // Cart logic
}

// src/hooks/useProducts.ts
export function useProducts() {
  // Product fetching logic
}
```

### API Integration

Customize API calls in `src/lib/api.ts`:

```typescript
export async function getProducts(params?: ProductParams) {
  // Custom product fetching
}

export async function getProduct(slug: string) {
  // Single product fetching
}
```

### State Management

Add global state with Context API:

```typescript
// src/context/AppContext.tsx
export const AppContext = createContext()

export function AppProvider({ children }) {
  // Global state logic
}
```

## Performance Optimization

### Image Optimization

Use Next.js Image component:

```typescript
import Image from 'next/image'

<Image
  src="/product.jpg"
  alt="Product"
  width={400}
  height={300}
  priority={isAboveFold}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Code Splitting

Implement dynamic imports:

```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>
})
```

## Testing Customizations

### Development Testing

```bash
# Run development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint
```

### Build Testing

```bash
# Test production build
npm run build
npm run start
```

## Best Practices

1. **Keep components small and focused**
2. **Use TypeScript for type safety**
3. **Follow consistent naming conventions**
4. **Optimize images and assets**
5. **Test on multiple devices**
6. **Maintain accessibility standards**

## Need Help?

- Check the [API Reference](api-reference.md)
- Review [troubleshooting guide](troubleshooting.md)
- Contact support through ThemeForest
