# Troubleshooting Guide

This guide helps you resolve common issues with the Stacker WooCommerce Theme.

## Installation Issues

### Node.js Version Problems

**Error**: "Node.js version not supported"

**Solution**:
```bash
# Check your Node.js version
node --version

# Install Node.js 18+ from nodejs.org
# Or use nvm to manage versions
nvm install 18
nvm use 18
```

### Package Installation Failures

**Error**: "npm install failed" or dependency conflicts

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try using yarn instead
npm install -g yarn
yarn install

# For permission issues on macOS/Linux
sudo npm install -g npm
```

### Environment Variables Not Loading

**Error**: API calls failing or undefined environment variables

**Solutions**:
1. Ensure `.env.local` exists in root directory
2. Check variable names start with `NEXT_PUBLIC_` for client-side access
3. Restart development server after changing env vars
4. Verify no spaces around `=` in env file

```env
# Correct format
NEXT_PUBLIC_API_URL=https://example.com

# Incorrect format
NEXT_PUBLIC_API_URL = https://example.com
```

## Development Server Issues

### Port Already in Use

**Error**: "Port 3000 is already in use"

**Solutions**:
```bash
# Use different port
npm run dev -- -p 3001

# Kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Or find and kill manually
lsof -i :3000
kill -9 [PID]
```

### Hot Reload Not Working

**Solutions**:
1. Check if files are being watched:
   ```bash
   # Increase file watchers (Linux)
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```

2. Restart development server
3. Clear browser cache
4. Check if files are in correct directories

## API Connection Issues

### WooCommerce API Not Responding

**Error**: "Failed to fetch products" or 401/403 errors

**Solutions**:
1. **Verify API Credentials**:
   - Check Consumer Key and Secret in `.env.local`
   - Ensure no extra spaces or characters
   - Regenerate keys if necessary

2. **Check WooCommerce Settings**:
   - WooCommerce → Settings → Advanced → REST API
   - Ensure API is enabled
   - Check user permissions

3. **Test API Manually**:
   ```bash
   curl -u consumer_key:consumer_secret \
   https://yoursite.com/wp-json/wc/v3/products
   ```

### CORS Issues

**Error**: "CORS policy blocked" or cross-origin errors

**Solutions**:
1. **WordPress Plugin**: Install "WP CORS" plugin
2. **htaccess Method**: Add to WordPress `.htaccess`:
   ```apache
   Header always set Access-Control-Allow-Origin "*"
   Header always set Access-Control-Allow-Methods "GET, POST, OPTIONS, DELETE, PUT"
   Header always set Access-Control-Allow-Headers "Content-Type, Authorization"
   ```

3. **Next.js API Routes**: Use API routes as proxy:
   ```typescript
   // pages/api/products.ts
   export default async function handler(req, res) {
     const response = await fetch('your-woocommerce-api')
     const data = await response.json()
     res.json(data)
   }
   ```

## Build and Deployment Issues

### Build Failures

**Error**: "Build failed" or TypeScript errors

**Solutions**:
```bash
# Check for TypeScript errors
npm run type-check

# Fix linting issues
npm run lint --fix

# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

### Static Export Issues

**Error**: "Export failed" or dynamic routes not working

**Solutions**:
1. **Configure next.config.js**:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }
   ```

2. **Handle dynamic routes**:
   ```typescript
   // Generate static params
   export async function generateStaticParams() {
     return [
       { slug: 'product-1' },
       { slug: 'product-2' },
     ]
   }
   ```

### Deployment Issues

**Vercel Deployment Fails**:
1. Check build logs in Vercel dashboard
2. Ensure environment variables are set
3. Verify Node.js version in `package.json`:
   ```json
   {
     "engines": {
       "node": ">=18.0.0"
     }
   }
   ```

**Netlify Deployment Issues**:
1. Set build command: `npm run build && npm run export`
2. Set publish directory: `out`
3. Configure redirects in `public/_redirects`

## Performance Issues

### Slow Loading Times

**Solutions**:
1. **Optimize Images**:
   ```typescript
   import Image from 'next/image'
   
   <Image
     src="/image.jpg"
     alt="Description"
     width={400}
     height={300}
     priority={isAboveFold}
   />
   ```

2. **Enable Compression**:
   ```javascript
   // next.config.js
   const nextConfig = {
     compress: true,
     poweredByHeader: false,
   }
   ```

3. **Lazy Load Components**:
   ```typescript
   import dynamic from 'next/dynamic'
   
   const HeavyComponent = dynamic(() => import('./Heavy'), {
     loading: () => <div>Loading...</div>
   })
   ```

### Memory Issues

**Solutions**:
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Or in package.json scripts
"build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
```

## Browser Compatibility

### Internet Explorer Issues

**Note**: This theme requires modern browsers. IE is not supported.

**For older browser support**:
1. Add polyfills in `next.config.js`
2. Use Babel configuration for older syntax
3. Test with BrowserStack or similar tools

### Safari Issues

**Common fixes**:
1. Add vendor prefixes for CSS properties
2. Test flexbox and grid layouts
3. Check date/time input compatibility

## Common Error Messages

### "Module not found"

**Solutions**:
1. Check import paths are correct
2. Ensure file extensions are included if needed
3. Verify case sensitivity in file names
4. Check if module is installed: `npm list [module-name]`

### "Hydration failed"

**Solutions**:
1. Ensure server and client render the same content
2. Check for browser-only code in components
3. Use `useEffect` for client-only operations
4. Suppress hydration warnings if intentional:
   ```typescript
   <div suppressHydrationWarning={true}>
     {/* Client-only content */}
   </div>
   ```

## Getting Additional Help

If these solutions don't resolve your issue:

1. **Check the logs**: Browser console and terminal output
2. **Search documentation**: Review all docs files
3. **Update dependencies**: `npm update`
4. **Contact support**: Through your ThemeForest account

### Providing Support Information

When contacting support, include:
- Node.js version (`node --version`)
- npm version (`npm --version`)
- Operating system
- Browser and version
- Complete error message
- Steps to reproduce the issue

## Useful Commands

```bash
# Check versions
node --version
npm --version

# Clear all caches
npm cache clean --force
rm -rf .next node_modules package-lock.json
npm install

# Debug build
npm run build -- --debug

# Analyze bundle
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```
