# Installation Guide

This guide will walk you through the complete installation process of the Stacker WooCommerce Theme.

## Prerequisites

Before installing the theme, ensure you have:

- **Node.js**: Version 18.0 or higher
- **Package Manager**: npm, yarn, or pnpm
- **WooCommerce Store**: A WordPress site with WooCommerce plugin installed
- **API Access**: WooCommerce REST API credentials

## Step 1: Download and Extract

1. Download the theme package from ThemeForest
2. Extract the ZIP file to your desired directory
3. Navigate to the extracted folder

## Step 2: Install Dependencies

Open your terminal in the theme directory and run:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

## Step 3: Environment Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` with your WooCommerce API details:
   ```env
   # WooCommerce API Configuration
   NEXT_PUBLIC_WOOCOMMERCE_URL=https://your-store.com
   WOOCOMMERCE_CONSUMER_KEY=your_consumer_key
   WOOCOMMERCE_CONSUMER_SECRET=your_consumer_secret
   
   # Site Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_SITE_NAME=Your Store Name
   ```

## Step 4: WooCommerce API Setup

1. **Login to your WordPress admin**
2. **Navigate to**: WooCommerce → Settings → Advanced → REST API
3. **Click**: "Add Key"
4. **Configure**:
   - Description: "Stacker Theme"
   - User: Select admin user
   - Permissions: Read/Write
5. **Copy** the generated Consumer Key and Consumer Secret
6. **Paste** them into your `.env.local` file

## Step 5: Development Server

Start the development server:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

The site will be available at [http://localhost:3000](http://localhost:3000)

## Step 6: Production Build

For production deployment:

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Netlify

1. Build the static export:
   ```bash
   npm run export
   ```
2. Upload the `out` folder to Netlify
3. Configure environment variables

### Custom Server

1. Build the application:
   ```bash
   npm run build
   ```
2. Copy files to your server
3. Install Node.js on your server
4. Run `npm start`

## Troubleshooting

### Common Issues

**Node.js Version Error**
- Ensure you're using Node.js 18.0 or higher
- Use `node --version` to check your version

**API Connection Failed**
- Verify your WooCommerce API credentials
- Check if your WordPress site is accessible
- Ensure WooCommerce REST API is enabled

**Build Errors**
- Clear node_modules and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

**Port Already in Use**
- Change the port:
  ```bash
  npm run dev -- -p 3001
  ```

### Getting Help

If you encounter issues:
1. Check the [troubleshooting guide](troubleshooting.md)
2. Review the [FAQ](faq.md)
3. Contact support through ThemeForest

## Next Steps

After successful installation:
1. Review the [Customization Guide](customization.md)
2. Import demo content (optional)
3. Configure your theme settings
4. Start building your store!
