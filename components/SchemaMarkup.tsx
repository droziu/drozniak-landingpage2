import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SchemaMarkup: React.FC = () => {
  const location = useLocation();
  const BASE_URL = 'https://drozniak.pl';

  useEffect(() => {
    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Stanisław Drożniak",
      "url": BASE_URL,
      "logo": `${BASE_URL}/images/DROZNIAK_LOGO.svg`,
      "description": "System pozyskiwania klientów i strony internetowe dla małych firm i freelancerów. Szkolenia z AI w marketingu.",
      "sameAs": [
        "https://www.linkedin.com/in/stanislawdrozniak"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+48-792-491-196",
        "contactType": "customer service",
        "email": "stanislaw@drozniak.com"
      }
    };

    // Person Schema
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Stanisław Drożniak",
      "jobTitle": "Marketing Specialist & Web Developer",
      "url": BASE_URL,
      "email": "stanislaw@drozniak.com",
      "telephone": "+48-792-491-196",
      "sameAs": [
        "https://www.linkedin.com/in/stanislawdrozniak"
      ],
      "description": "Specjalista od systemów pozyskiwania klientów, stron internetowych dla małych firm i szkoleń z AI w marketingu."
    };

    // WebSite Schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Stanisław Drożniak - Marketing i Strony WWW",
      "url": BASE_URL,
      "description": "System pozyskiwania klientów i strony internetowe dla małych firm i freelancerów",
      "publisher": {
        "@type": "Person",
        "name": "Stanisław Drożniak"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${BASE_URL}/blog?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    };

    // Service Schema
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Marketing & Web Development Services",
      "provider": {
        "@type": "Person",
        "name": "Stanisław Drożniak"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Poland"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Usługi marketingowe i web development",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "System pozyskiwania klientów dla małych firm",
              "description": "Kompleksowy system pozyskiwania klientów z internetu dla małych firm i freelancerów"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Strony internetowe dla małych firm",
              "description": "Strony www dla małych firm i freelancerów - szybkie, nowoczesne, projektowane pod pozyskiwanie klientów"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Szkolenia z AI w marketingu",
              "description": "Szkolenia z AI w marketingu dla małych firm - automatyzacja marketingu i praktyczne zastosowania AI"
            }
          }
        ]
      }
    };

    // Add schemas to page
    const addSchema = (schema: object, id: string) => {
      // Remove existing schema if present
      const existing = document.getElementById(id);
      if (existing) {
        existing.remove();
      }

      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    };

    addSchema(organizationSchema, 'schema-organization');
    addSchema(personSchema, 'schema-person');
    addSchema(serviceSchema, 'schema-service');
    addSchema(websiteSchema, 'schema-website');

    // Cleanup
    return () => {
      ['schema-organization', 'schema-person', 'schema-service', 'schema-website'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          element.remove();
        }
      });
    };
  }, [location.pathname]);

  return null;
};

