# 🌟 Солнечные сказки - Poetry Website

A modern, elegant poetry website built with Nuxt 3, featuring content management through Sanity CMS, interactive user engagement, and a beautiful dark/light theme system.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)
- [Content Management](#content-management)
- [API Integration](#api-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)

## ✨ Features

### 🎨 Modern UI/UX
- **Dark/Light Mode**: Seamless theme switching with persistent user preferences
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Elegant transitions and micro-interactions
- **Glassmorphism Effects**: Modern design aesthetics with gradient overlays

### 📚 Content Features
- **Poetry Collection**: Browse and read poems with beautiful typography
- **Featured Poems**: Randomly selected poems on the homepage
- **Category System**: Organize poems by themes and categories
- **Author Page**: Dedicated page showcasing the poet's biography
- **Music Integration**: Audio player for poetry readings and background music

### 💬 User Engagement
- **Like System**: Session-based poem likes
- **Comment System**: Reader comments with avatar support
- **Testimonials Slider**: Showcase reader reviews and feedback
- **Newsletter Signup**: Email subscription for updates

### 🎵 Interactive Features
- **Poem Game**: Interactive poetry-related games
- **Audio Streaming**: Stream poetry readings from Google Drive
- **Contact Form**: Get in touch with the author

### 🔍 SEO Optimized
- **Meta Tags**: Proper title and description for all pages
- **Semantic HTML**: Structured content for better search engine indexing
- **Performance**: Optimized images and lazy loading

## 🛠 Tech Stack

### Frontend Framework
- **Nuxt 3**: Vue.js framework with SSR/SSG capabilities
- **Vue 3**: Progressive JavaScript framework
- **Vue Router**: Official router for Vue.js

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS transformations
- **Autoprefixer**: Automatic vendor prefixing
- **Font Awesome**: Icon library

### Content Management
- **Sanity CMS**: Headless CMS for content management
- **@nuxtjs/sanity**: Nuxt module for Sanity integration
- **@sanity/image-url**: Image URL builder for Sanity

### Backend Integration
- **Axios**: HTTP client for API requests
- **UUID**: Generate unique session identifiers

### Development Tools
- **TypeScript**: Type-safe development
- **ESM**: ES Module support

## 📁 Project Structure

```
poetry-website/
├── api/                         # API integration layer
│   └── sanity/                 # Sanity CMS queries and client
│       ├── client.js           # Sanity client configuration
│       ├── posts.js            # Posts fetching logic
│       ├── queries.js          # GROQ queries
│       └── tracks.js           # Audio tracks queries
├── assets/                      # Static assets
│   ├── css/
│   │   └── tailwind.css        # Tailwind configuration
│   └── images/                 # Image assets
├── components/                  # Vue components
│   ├── Footer.vue              # Footer component
│   ├── Test.vue                # Poem statistics component
│   ├── ThemeToggle.vue         # Dark/light mode toggle
│   └── TopMenu.vue             # Navigation menu
├── composables/                 # Vue composables
│   ├── usePoems.js             # Shared poems state
│   └── useTheme.ts             # Theme management
├── layouts/                     # Layout components
│   └── default.vue             # Default layout
├── pages/                       # Application pages
│   ├── author.vue              # Author biography
│   ├── contact.vue             # Contact page
│   ├── index.vue               # Homepage
│   ├── music.vue               # Music/audio page
│   ├── poem-game.vue           # Interactive game
│   └── poems/                  # Poem pages
│       ├── index.vue           # Poems listing
│       └── [slug].vue          # Individual poem page
├── plugins/                     # Nuxt plugins
│   └── axios.js                # Axios configuration
├── public/                      # Public static files
├── server/                      # Server-side code
├── app.vue                      # Root component
├── nuxt.config.ts              # Nuxt configuration
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v7 or higher) or **yarn** or **pnpm**
- **Sanity Account** (for content management)
- **Poetry Backend** (running on port 5000 or deployed)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd poetry-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Sanity CMS**
   
   Update `nuxt.config.ts` with your Sanity project details:
   ```typescript
   sanity: {
     projectId: 'your-project-id',
     dataset: 'production',
   }
   ```

4. **Configure Backend URL**
   
   Update `plugins/axios.js` with your backend URL:
   ```javascript
   const axiosInstance = axios.create({
     baseURL: 'https://your-backend-url.com',
   });
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## ⚙️ Configuration

### Environment Variables

While this project doesn't use a `.env` file by default, you can add one for sensitive configuration:

```env
NUXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NUXT_PUBLIC_SANITY_DATASET=production
NUXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
```

### Sanity Configuration

The Sanity CMS integration is configured in `nuxt.config.ts`:

```typescript
modules: ['@nuxtjs/sanity'],
sanity: {
  projectId: '1r9tekm9',
  dataset: 'production',
}
```

### Tailwind Configuration

Customize your design system in `tailwind.config.js`:

```javascript
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      // Add your custom colors, fonts, etc.
    },
  },
}
```

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Generate static site
npm run generate

# Preview production build
npm run preview

# Prepare Nuxt
npm run postinstall
```

### Theme System

The website features a sophisticated dark/light mode system:

```typescript
// composables/useTheme.ts
const { theme, toggleTheme, initTheme } = useTheme();
```

The theme preference is stored in `localStorage` and automatically applied on page load.

### Adding New Pages

1. Create a new `.vue` file in the `pages/` directory
2. Add SEO metadata using `useHead()`:

```vue
<script setup>
useHead({
  title: 'Page Title - Солнечные сказки',
  meta: [
    {
      name: 'description',
      content: 'Page description',
    },
  ],
});
</script>
```

## 📝 Content Management

### Sanity Studio

This project uses Sanity CMS for content management. The Sanity Studio is located in a separate directory (`studio-poetry-website`).

### Content Types

#### Posts (Poems)
```javascript
{
  _id: string,
  title: string,
  slug: { current: string },
  publishedAt: date,
  image: image,
  category: string,
  readtime: number,
  author: string,
  body: array
}
```

#### Tracks (Audio)
```javascript
{
  _id: string,
  title: string,
  description: string,
  fileId: string,        // Google Drive file ID
  coverImage: image
}
```

### GROQ Queries

Queries are defined in `api/sanity/queries.js`:

```javascript
// Fetch all posts
export const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...1000]{
  _id,
  title,
  slug,
  publishedAt,
  image,
  category,
  readtime,
  author,
  body
}`;
```

## 🔌 API Integration

### Backend Endpoints

The website integrates with the poetry-backend API:

#### Audio Streaming
```javascript
GET /stream-audio?trackId={googleDriveFileId}
```

#### Likes
```javascript
POST /api/likes/:slug/toggle
GET /api/likes/:slug?sessionId={sessionId}
```

#### Comments
```javascript
POST /api/comments/:slug
GET /api/comments/:slug
POST /api/comments/:slug/:commentId/like
```

### Using Axios

```javascript
// In any component
const { $axios } = useNuxtApp();

const response = await $axios.get('/api/endpoint');
```

## 🚀 Deployment

### Static Site Generation (SSG)

Generate a static version of the site:

```bash
npm run generate
```

This creates a `.output/public` directory that can be deployed to any static hosting service.

### Server-Side Rendering (SSR)

Build for SSR deployment:

```bash
npm run build
```

### Recommended Platforms

#### Static Hosting
- **Netlify**: Automatic deployments from Git
- **Vercel**: Optimized for Nuxt 3
- **Cloudflare Pages**: Fast global CDN
- **GitHub Pages**: Free hosting for static sites

#### SSR Hosting
- **Vercel**: Native Nuxt 3 support
- **Netlify**: Serverless functions support
- **Railway**: Easy deployment with auto-scaling
- **DigitalOcean App Platform**: Managed hosting

### Deployment Checklist

- [ ] Update Sanity project ID in `nuxt.config.ts`
- [ ] Update backend URL in `plugins/axios.js`
- [ ] Configure environment variables on hosting platform
- [ ] Set up custom domain (optional)
- [ ] Enable HTTPS
- [ ] Configure CORS on backend for production domain
- [ ] Test all features in production environment
- [ ] Set up analytics (optional)
- [ ] Configure sitemap and robots.txt

### Netlify Deployment

1. **Connect your repository** to Netlify
2. **Build settings**:
   - Build command: `npm run generate`
   - Publish directory: `.output/public`
3. **Environment variables**: Add your Sanity and backend configuration
4. **Deploy**: Netlify will automatically build and deploy

### Vercel Deployment

1. **Import your repository** to Vercel
2. **Framework preset**: Nuxt.js
3. **Build settings**: Automatically detected
4. **Environment variables**: Add your configuration
5. **Deploy**: Vercel will handle the rest

## 🎨 Customization

### Colors and Branding

The site uses a warm, poetic color scheme:

- **Primary**: Amber/Gold tones (`amber-500`, `amber-600`)
- **Background Light**: Slate tones (`slate-50`, `slate-100`)
- **Background Dark**: Gray tones (`gray-800`, `gray-900`)
- **Text**: Slate for light mode, white/gray for dark mode

### Typography

- **Headings**: Serif font family for elegance
- **Body**: Sans-serif for readability
- **Font Awesome**: Icons throughout the interface

### Animations

The site features smooth transitions:

```css
.transition-colors {
  transition-property: color, background-color;
  transition-duration: 300ms;
}
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use Vue 3 Composition API with `<script setup>`
- Follow Tailwind CSS utility-first approach
- Use TypeScript for type safety where applicable
- Add SEO metadata to all pages
- Ensure dark mode compatibility for all components

## 📄 License

This project is private and proprietary.

## 📧 Contact

For questions or support, please contact:
- **Email**: vilenskyigal@gmail.com
- **Phone**: +491783099433

## 🙏 Acknowledgments

- **Nuxt Team**: For the amazing framework
- **Sanity**: For the powerful headless CMS
- **Tailwind CSS**: For the utility-first CSS framework
- **Font Awesome**: For the beautiful icons

---

**Built with ❤️ for poetry lovers | Создано с любовью для ценителей поэзии**
