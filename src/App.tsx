import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { SearchModal } from './components/SearchModal';

// Helper to parse route regardless of subpath or GitHub Pages hosting
const getNormalizedRoute = () => {
  // Check if redirect query from GitHub Pages 404.html exists (e.g. ?/menu or ?/product)
  const search = window.location.search;
  if (search.startsWith('?/')) {
    const parts = search.slice(2).split('&');
    const cleanPath = '/' + parts[0].replace(/~and~/g, '&');
    return {
      pathname: cleanPath,
      queryString: parts.slice(1).join('&'),
    };
  }

  // Check if hash exists (e.g. #/menu)
  if (window.location.hash) {
    const cleanHash = window.location.hash.replace(/^#\/?/, '/');
    const [p, q] = cleanHash.split('?');
    return {
      pathname: p.startsWith('/') ? p : '/' + p,
      queryString: q || '',
    };
  }

  // Normal pathname: strip GitHub Pages repo name if hosted on a subpath
  const KNOWN_ROUTES = ['menu', 'product', 'cart', 'checkout', 'confirmation', 'track-order', 'about', 'contact'];
  const segments = window.location.pathname.split('/').filter(Boolean);
  if (segments.length > 0 && !KNOWN_ROUTES.includes(segments[0])) {
    const remaining = '/' + segments.slice(1).join('/');
    return {
      pathname: remaining === '/' || remaining === '' ? '/' : remaining,
      queryString: window.location.search.slice(1),
    };
  }

  return {
    pathname: window.location.pathname || '/',
    queryString: window.location.search.slice(1),
  };
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(getNormalizedRoute);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Handle browser back / forward navigation and hash changes
  useEffect(() => {
    const handleNavigationChange = () => {
      setCurrentRoute(getNormalizedRoute());
    };
    window.addEventListener('popstate', handleNavigationChange);
    window.addEventListener('hashchange', handleNavigationChange);
    return () => {
      window.removeEventListener('popstate', handleNavigationChange);
      window.removeEventListener('hashchange', handleNavigationChange);
    };
  }, []);

  const navigate = (path: string) => {
    // Preserve GitHub Pages subpath if present
    const KNOWN_ROUTES = ['menu', 'product', 'cart', 'checkout', 'confirmation', 'track-order', 'about', 'contact'];
    const segments = window.location.pathname.split('/').filter(Boolean);
    const repoBase = segments.length > 0 && !KNOWN_ROUTES.includes(segments[0]) ? '/' + segments[0] : '';

    const targetUrl = repoBase ? `${repoBase}${path}` : path;
    window.history.pushState({}, '', targetUrl);
    setCurrentRoute(getNormalizedRoute());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { pathname, queryString } = currentRoute;
  const searchParams = new URLSearchParams(queryString || '');

  // Render appropriate page
  const renderCurrentPage = () => {
    switch (pathname) {
      case '/':
        return <HomePage onNavigate={navigate} />;
      case '/menu':
        return (
          <MenuPage
            onNavigate={navigate}
            initialMood={searchParams.get('mood')}
          />
        );
      case '/product':
        return (
          <ProductDetailPage
            productId={searchParams.get('id') || 'salted-caramel-cake'}
            onNavigate={navigate}
          />
        );
      case '/cart':
        return <CartPage onNavigate={navigate} />;
      case '/checkout':
        return <CheckoutPage onNavigate={navigate} />;
      case '/confirmation':
        return (
          <ConfirmationPage
            orderId={searchParams.get('orderId')}
            onNavigate={navigate}
          />
        );
      case '/track-order':
        return (
          <TrackOrderPage
            initialOrderId={searchParams.get('id')}
            initialEmail={searchParams.get('email')}
            onNavigate={navigate}
          />
        );
      case '/about':
        return <AboutPage onNavigate={navigate} />;
      case '/contact':
        return <ContactPage onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <OrderProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-[#FAF7EE] text-[#20221F] selection:bg-[#20221F] selection:text-[#FAF7EE]">
          {/* Top Announcement Bar */}
          <AnnouncementBar />

          {/* Top Navigation */}
          <Navbar
            currentPath={pathname}
            onNavigate={navigate}
            onOpenSearch={() => setSearchModalOpen(true)}
          />

          {/* Active Page Body */}
          <main className="flex-1">{renderCurrentPage()}</main>

          {/* Slide-out Cart Drawer */}
          <CartDrawer onNavigate={navigate} />

          {/* Quick Toast feedback */}
          <Toast />

          {/* Global Footer */}
          <Footer onNavigate={navigate} />

          {/* Rich Interactive Search Modal */}
          <SearchModal
            isOpen={searchModalOpen}
            onClose={() => setSearchModalOpen(false)}
            onNavigate={navigate}
          />
        </div>
      </CartProvider>
    </OrderProvider>
  );
}
