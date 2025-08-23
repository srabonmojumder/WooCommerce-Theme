# Stacker - Modern WooCommerce Theme

![Stacker Theme Preview](preview-images/main-preview.jpg)

**Stacker** is a modern, responsive WooCommerce theme built with Next.js and Tailwind CSS. It offers a clean, professional design perfect for any e-commerce store.

## 🚀 Features

- **Modern Design**: Clean and professional layout
- **Fully Responsive**: Works perfectly on all devices
- **WooCommerce Ready**: Full WooCommerce integration
- **Next.js 15**: Built with the latest Next.js framework
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Full TypeScript support
- **Dark Mode**: Built-in dark/light mode toggle
- **SEO Optimized**: Search engine friendly
- **Fast Loading**: Optimized for performance
- **Easy Customization**: Well-organized code structure

## 📋 Requirements

- Node.js 18.0 or higher
- npm, yarn, or pnpm package manager
- WooCommerce-enabled WordPress site (for backend)

## 🛠️ Installation

### Quick Start

1. **Extract the theme files** to your desired directory
2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your WooCommerce API credentials

4. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm run start
```

## 📁 File Structure

```
stacker-woocommerce-theme/
├── docs/                    # Documentation files
├── licensing/              # License files
├── preview-images/         # Theme preview images
├── src/
│   ├── app/               # Next.js app directory
│   ├── components/        # React components
│   ├── lib/              # Utility functions
│   └── styles/           # CSS styles
├── public/               # Static assets
├── package.json          # Dependencies
└── README.md            # This file
```

## 🎨 Customization

### Colors and Styling
- Edit `tailwind.config.js` to customize colors, fonts, and spacing
- Modify CSS variables in `src/app/globals.css`

### Components
- All components are located in `src/components/`
- Each component is fully customizable and well-documented

### Pages
- Page components are in `src/app/`
- Follow Next.js 15 app directory structure

## 📖 Documentation

For detailed documentation, please refer to:
- [Installation Guide](docs/installation.md)
- [Customization Guide](docs/customization.md)
- [API Reference](docs/api-reference.md)
- [Troubleshooting](docs/troubleshooting.md)

## 🔄 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

## 📄 License

This theme is licensed under GPL v2.0. See [LICENSE](licensing/LICENSE) for details.

## 🆘 Support

If you need help with this theme:
1. Check the [documentation](docs/)
2. Review [troubleshooting guide](docs/troubleshooting.md)
3. Contact support through your ThemeForest account

## 🙏 Credits

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Heroicons](https://heroicons.com/) and [Lucide](https://lucide.dev/)

---

**Version**: 1.0.0
**Author**: Your Name
**Last Updated**: January 2025
