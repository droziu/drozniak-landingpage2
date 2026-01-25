import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Globalny komponent SEO - dodaje noindex dla staging/preview
 * oraz podstawowe meta tags jeśli nie są ustawione przez useSEO
 */
export const SEOHead: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Sprawdź czy jesteśmy w środowisku produkcyjnym
    // VERCEL_ENV może być: 'production', 'preview', 'development'
    const vercelEnv = import.meta.env.VERCEL_ENV;
    
    const isProduction = vercelEnv === 'production' || 
                         (import.meta.env.MODE === 'production') ||
                         (!vercelEnv && typeof window !== 'undefined' && window.location.hostname === 'drozniak.pl');
    
    // Dodaj noindex dla staging/preview
    if (!isProduction) {
      let metaRobots = document.querySelector('meta[name="robots"]');
      if (!metaRobots) {
        metaRobots = document.createElement('meta');
        metaRobots.setAttribute('name', 'robots');
        document.head.appendChild(metaRobots);
      }
      metaRobots.setAttribute('content', 'noindex, nofollow');
    } else {
      // W produkcji usuń noindex jeśli był ustawiony (ale nie nadpisuj jeśli useSEO ustawił coś innego)
      const metaRobots = document.querySelector('meta[name="robots"][content*="noindex"]');
      if (metaRobots && metaRobots.getAttribute('content') === 'noindex, nofollow') {
        metaRobots.remove();
      }
    }
  }, [location.pathname]);

  return null;
};
