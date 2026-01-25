
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import { Header } from './components/Header';
import { MainPage } from './components/MainPage';
import { AIStrategyPage } from './components/AIStrategyPage';
import { FreelancerLanding } from './components/FreelancerLanding';
import { StronyWWWPage } from './components/StronyWWWPage';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { ContactPage } from './components/ContactPage';
import { PortfolioRedlin } from './components/PortfolioRedlin';
import { PortfolioPasw } from './components/PortfolioPasw';
import { SzkoleniaPage } from './components/SzkoleniaPage';
import { DoradztwoHotelIrys } from './components/DoradztwoHotelIrys';
import { DoradztwoZef } from './components/DoradztwoZef';
import { LoginPage } from './components/LoginPage';
import { AdminPanel } from './components/AdminPanel';
import { ClientPanel } from './components/ClientPanel';
import { UserProfile } from './components/UserProfile';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PanelRoot } from './components/PanelRoot';
import { Footer } from './components/Footer';
import { StickyCTA } from './components/StickyCTA';
import { CookieConsent } from './components/CookieConsent';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { SchemaMarkup } from './components/SchemaMarkup';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingState } from './components/LoadingState';
import { TrainingPage } from './components/TrainingPage';
import { PublicProposalView } from './components/PublicProposalView';
import { PDFProposalView } from './components/PDFProposalView';
import { BlogList } from './components/blog/BlogList';
import { BlogPost } from './components/blog/BlogPost';

// Tryb pełnoekranowy kursu (bez sidebara panelu, z przyciskiem X)
const TrainingPageStandalone: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  return <TrainingPage courseId={courseId || null} standalone />;
};

// Lazy load FunnelBuilder (duży komponent z React Flow)
// FunnelBuilder ma named export, więc musimy go przekonwertować na default dla lazy()
const FunnelBuilder = lazy(() => 
  import('./components/FunnelBuilder').then(module => ({
    default: module.FunnelBuilder
  }))
);

// Komponent do sprawdzania czy jesteśmy w panelu
const AppContent: React.FC<{
  isStickyCtaVisible: boolean;
  cookiePreferences: {
    necessary: boolean;
    performance: boolean;
    analytics: boolean;
  } | null;
  onCookieAccept: (preferences: { necessary: boolean; performance: boolean; analytics: boolean }) => void;
}> = ({ isStickyCtaVisible, cookiePreferences, onCookieAccept }) => {
  const location = useLocation();
  // Sprawdź czy jesteśmy na subdomenie panelu
  const isPanelSubdomain = typeof window !== 'undefined' && 
    (window.location.hostname === 'panel.drozniak.pl' || 
     window.location.hostname.startsWith('panel.'));
  // Sprawdź czy jesteśmy na ścieżkach panelu (dla lokalnego developmentu)
  const isPanelRoute = isPanelSubdomain || 
    location.pathname === '/login' || 
    location.pathname === '/panel' || 
    location.pathname === '/admin' || 
    location.pathname === '/profile' ||
    location.pathname.startsWith('/panel') ||
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/profile');
  
  // Debug - można usunąć później
  if (typeof window !== 'undefined' && location.pathname === '/') {
    console.log('App routing debug:', { 
      hostname: window.location.hostname, 
      pathname: location.pathname, 
      isPanelSubdomain, 
      isPanelRoute 
    });
  }
  

  return (
    <div className="bg-[#101820] text-white font-[Open Sans] overflow-x-hidden">
      {!isPanelRoute && <SchemaMarkup />}
      {!isPanelRoute && <ScrollToTop />}
      {!isPanelRoute && <Header />}
      <Routes>
        {isPanelSubdomain ? (
          // Routing dla subdomeny panelu (panel.drozniak.pl)
          <>
            <Route path="/" element={<PanelRoot />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/p/:token" element={<PublicProposalView />} />
            <Route path="/o/:slug" element={<PDFProposalView />} />
            <Route path="/panel/marketing/:id" element={<ProtectedRoute><Suspense fallback={<LoadingState variant="fullscreen" label="Ładowanie lejka…" />}><FunnelBuilder /></Suspense></ProtectedRoute>} />
            <Route path="/panel/courses/:courseId" element={<ProtectedRoute><TrainingPageStandalone /></ProtectedRoute>} />
            <Route path="/panel/*" element={<ProtectedRoute><ClientPanel /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
            <Route path="/admin/marketing" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
            <Route path="/admin/marketing/:id" element={<ProtectedRoute><Suspense fallback={<LoadingState variant="fullscreen" label="Ładowanie lejka…" />}><FunnelBuilder /></Suspense></ProtectedRoute>} />
            <Route path="/admin/clients" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
            <Route path="/admin/panel-clients" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
            <Route path="/admin/proposals" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
            <Route path="/admin/proposals/*" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          // Routing dla głównej strony (drozniak.pl)
          <>
            <Route path="/" element={<MainPage />} />
            <Route path="/system" element={<AIStrategyPage cookiePreferences={cookiePreferences} />} />
            <Route path="/freelancer" element={<FreelancerLanding />} />
            <Route path="/strony-www" element={<StronyWWWPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
            <Route path="/polityka-prywatnosci" element={<PrivacyPolicy />} />
            <Route path="/portfolio-redlin" element={<PortfolioRedlin />} />
            <Route path="/portfolio-pasw" element={<PortfolioPasw />} />
            <Route path="/szkolenia" element={<SzkoleniaPage />} />
            <Route path="/doradztwo-hotel-irys" element={<DoradztwoHotelIrys />} />
            <Route path="/doradztwo-zef" element={<DoradztwoZef />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/kategoria/:categorySlug" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/p/:token" element={<PublicProposalView />} />
            <Route path="/o/:slug" element={<PDFProposalView />} />
            <Route path="/panel/marketing/:id" element={<ProtectedRoute><Suspense fallback={<LoadingState variant="fullscreen" label="Ładowanie lejka…" />}><FunnelBuilder /></Suspense></ProtectedRoute>} />
            <Route path="/panel/courses/:courseId" element={<ProtectedRoute><TrainingPageStandalone /></ProtectedRoute>} />
            <Route path="/panel/*" element={<ProtectedRoute><ClientPanel /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
            <Route path="/admin/marketing" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
            <Route path="/admin/marketing/:id" element={<ProtectedRoute><Suspense fallback={<LoadingState variant="fullscreen" label="Ładowanie lejka…" />}><FunnelBuilder /></Suspense></ProtectedRoute>} />
            <Route path="/admin/clients" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
            <Route path="/admin/panel-clients" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
            <Route path="/admin/proposals" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
            <Route path="/admin/proposals/*" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          </>
        )}
      </Routes>
      {!isPanelRoute && <Footer />}
      {!isPanelRoute && <StickyCTA isVisible={isStickyCtaVisible} />}
      {!isPanelRoute && <ScrollToTopButton />}
      {!isPanelRoute && <CookieConsent onAccept={onCookieAccept} />}
    </div>
  );
};

const App: React.FC = () => {
  const [isStickyCtaVisible, setStickyCtaVisible] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState<{
    necessary: boolean;
    performance: boolean;
    analytics: boolean;
  } | null>(null);

  useEffect(() => {
    // Load existing cookie preferences
    const savedPreferences = localStorage.getItem('cookieConsent');
    if (savedPreferences) {
      setCookiePreferences(JSON.parse(savedPreferences));
    }

    const handleScroll = () => {
      // Show sticky CTA after scrolling past the hero section (e.g., 800px)
      if (window.scrollY > 800) {
        setStickyCtaVisible(true);
      } else {
        setStickyCtaVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCookieAccept = (preferences: { necessary: boolean; performance: boolean; analytics: boolean }) => {
    setCookiePreferences(preferences);
    
    // Load Calendly only if performance cookies are accepted
    if (preferences.performance) {
      // Calendly will be loaded by the FinalCTA component
      console.log('Performance cookies accepted - Calendly will load');
    }
  };

  return (
    <ErrorBoundary>
    <Router>
        <AppContent
          isStickyCtaVisible={isStickyCtaVisible}
          cookiePreferences={cookiePreferences}
          onCookieAccept={handleCookieAccept}
        />
    </Router>
    </ErrorBoundary>
  );
};

export default App;
