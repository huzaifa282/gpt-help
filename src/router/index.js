import { createRouter, createWebHistory } from 'vue-router';
import CardView from '@/pages/CardView/CardView.vue';
import PostsView from '@/pages/PostsView/PostsView.vue';
import Faq from '@/pages/Etc/Faq.vue';
import PrivacyPolicy from '@/pages/Etc/PrivacyPolicy.vue';
import TermsOfService from '@/pages/Etc/TermsOfService.vue';
import NotFound from '@/pages/Etc/NotFound.vue';
import posts from '@/utils/source.js'
// Replace the existing encodeSpecialCharacters function
function encodeSpecialCharacters(str) {
  // First decode the string in case it's already encoded
  const decodedStr = decodeURIComponent(str);
  // Then encode only specific characters we want to handle
  return decodedStr
    .replace(/#/g, '%23');
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
// Define baseUrl
const baseUrl = 'https://cyde.xyz';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      name: "Home",
      component: PostsView,
      props: { type: 0 },
      meta:{
        title: "Cyde - Home",
      description: "Explore Cyde's Home - tools and features for enhanced gaming.",
      canonical: "https://cyde.xyz/"
      }
    },
    {
      path: "/clients",
      name: "Clients",
      component: PostsView,
      props: { type: 1 },
      meta:{
        title: "Cyde - Clients",
        description: "Explore Cyde's Clients - tools and features for enhanced gaming.",
        canonical: "https://cyde.xyz/clients"
      }
    },
    {
      path: "/texture-packs",
      name: "Texture Packs",
      component: PostsView,
      props: { type: 2 },
      meta:{
        title: "Cyde - Texture Packs",
        description: "Explore Cyde's Texture Packs - tools and features for enhanced gaming.",
        canonical: "https://cyde.xyz/texture-packs"
      }
    },
    {
      path: "/others",
      name: "Others",
      component: PostsView,
      props: { type: 3 },
    },
    {
      path: "/faq",
      name: "FAQ",
      component: Faq,
      meta:{
        title: "Cyde - Faq",
        description: "Explore Cyde's Faq - tools and features for enhanced gaming.",
        canonical: "https://cyde.xyz/faq"
      }
    },
    {
      path: "/privacypolicy",
      name: "Privacy Policy",
      component: PrivacyPolicy,
      meta:{
        title: "Cyde - Privacypolicy",
        description: "Explore Cyde's Privacypolicy - tools and features for enhanced gaming.",
        canonical: "https://cyde.xyz/privacypolicy"
      }
    },
    {
      path: "/termsofservice",
      name: "Terms Of Service",
      component: TermsOfService,
      meta:{
        title: "Cyde - Termsofservice",
        description: "Explore Cyde's Termsofservice tools and features for enhanced gaming.",
        canonical: "https://cyde.xyz/termsofservice"
      }
    },
    {
      path: "/:slug",
      name: "CardView",
      component: CardView,
      props: true,
      beforeEnter: (to, from, next) => {
        // Decode the route slug to handle special characters like `%23` for `#`
        const routeSlug = decodeURIComponent(to.params.slug); 
        console.log('Decoded route slug is:', routeSlug);
    
        // Match the slug using the `slugify` function
        const post = posts.find(p => {
          console.log(`Slugified name: ${slugify(p.name)}, Route slug: ${routeSlug}`);
          return slugify(p.name) === routeSlug;
        });
        if (post) {
          // Set meta tags dynamically based on the post
          to.meta.title = post.meta?.title || post.name;
          to.meta.description = post.meta?.description || 'Default description';
          to.meta.canonical = post.meta?.canonical || `${baseUrl}/${routeSlug}`;
          console.log('[DEBUG] Post found:', post);
          console.log('[DEBUG] Setting meta description to:', post.meta?.description);
          next();
        } else {
          console.log('[DEBUG] No matching post found for slug:', routeSlug);
          next({ name: 'NotFound' });
        }
      },
        // Get all valid post slugs by converting names to URL-friendly format
        const validSlugs = posts.map(post => post.name
          .toLowerCase()
          .replace(/\s+/g, '-')        // Replace spaces with hyphens
          .replace(/[^\w\-\(\)\[\]#\.\%\+]/g, '') // Allow alphanumeric, hyphens, (), [], #, dots, percent, and plus
        );
        // Decode the incoming slug for comparison
        const decodedSlug = decodeURIComponent(to.params.slug);
        const postIndex = validSlugs.indexOf(decodedSlug);
        if (postIndex !== -1) {
          const post = posts[postIndex];
          let description = post.description || '';
          if (!description && post.contents) {
            description = post.contents
              .replace(/<h1[^>]*>.*?<\/h1>/, '') // Remove first h1 tag and its content
              .replace(/<\/[^>]*>/g, ' ')        // Replace closing tags with space
              .replace(/<[^>]*>/g, '')           // Remove remaining HTML tags
              .replace(/\s+/g, ' ')              // Normalize spaces
              .trim()
              .substring(0, 155) + '...';
          }
          to.meta.description = description;
          next();
        } else {
          next({ name: 'NotFound' });
        }
      }
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
      meta: {
        title: "Page Not Found",
      },
    },
  ],
});
// Global navigation guard to set meta tags dynamically
router.afterEach((to, from) => {
  console.log('--- route meta ---', to.meta);
  // Set page title
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = 'Cyde - Default Title';
  }
  // Set meta description
  const descTag = document.querySelector('meta[name="description"]');
  if (descTag) {
    console.log("[DEBUG] Setting meta description to:", to.meta.description);
    descTag.setAttribute(
      'content',
      to.meta.description || 'Default description for Cyde.'
    );
  } else {
    // If the meta tag doesn't exist, create it
    const newDescTag = document.createElement('meta');
    newDescTag.setAttribute('name', 'description');
    newDescTag.setAttribute('content', to.meta.description || 'Default description for Cyde.');
    document.head.appendChild(newDescTag);
    console.log("[DEBUG] Created new meta description tag with content:", to.meta.description || 'Default description for Cyde.');
  }
  // Set canonical URL
        title: "Page Not Found"
      }
    }
  ],
});
router.beforeEach((to, from, next) => {
  const baseUrl = 'https://cyde.xyz';
  // Set page title
  if (to.meta.title) {
    document.title = `Cyde - ${to.meta.title}`;
  } else if (to.name !== 'CardView') {
    document.title = `Cyde - ${to.name}`;
  }
  // Set canonical URL for all routes
  let canonicalUrl;
  if (to.path === '/') {
    canonicalUrl = baseUrl;
  } else {
    canonicalUrl = `${baseUrl}${encodeSpecialCharacters(to.path)}`;
  }
  let canonicalTag = document.querySelector('link[rel="canonical"]');
  if (!canonicalTag) {
    canonicalTag = document.createElement('link');
    canonicalTag.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalTag);
    console.log("[DEBUG] Created new canonical link tag.");
  }
  const canonicalUrl = to.meta.canonical || `${baseUrl}${to.path}`;
  console.log("[DEBUG] Setting canonical URL to:", canonicalUrl);
  canonicalTag.setAttribute('href', canonicalUrl);
});
export default router;
  }
  canonicalTag.setAttribute('href', canonicalUrl);
  if (to.meta.description) {
    const metaTag = document.querySelector('meta[name="description"]');
    if (metaTag) {
      metaTag.setAttribute('content', to.meta.description);
    }
  }
  next();
});

router.beforeResolve(async (to, from, next) => {
  const baseUrl = 'https://cyde.xyz'; // Adjust this to your actual domain
  if (to.name === 'CardView') {
    const post = posts.find(post => {
      const slug = post.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-\(\)\[\]#\.\%\+]/g, '');
      return slug === decodeURIComponent(to.params.slug);
    });
    if (post) {
      document.title = `Cyde - ${post.name}`;
      let description = post.description || '';
      if (!description && post.contents) {
        description = post.contents
          .replace(/<script[^>]*>.*?<\/script>/gs, '')
          .replace(/<h1[^>]*>.*?<\/h1>/, '')
          .replace(/<\/[^>]*>/g, ' ')
          .replace(/<[^>]*>/g, '')
          .replace(/\s+/g, ' ')
          .trim()
          .substring(0, 155) + '...';
      }
      // Set canonical URL for CardView routes
      let canonicalUrl = `${baseUrl}/${encodeSpecialCharacters(to.params.slug)}`;
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute('href', canonicalUrl);
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }
  }
  next();
});
export default router
