'use client';

import { useEffect } from 'react';

export default function ApiDocsPage() {
  useEffect(() => {
    // Dynamički učitaj Swagger UI CSS i JS
    const loadSwaggerUI = async () => {
      // Dodaj CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css';
      document.head.appendChild(link);

      // Dodaj JS
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js';
      script.async = true;
      script.onload = () => {
        // @ts-ignore
        if (window.SwaggerUIBundle) {
          // @ts-ignore
          window.SwaggerUIBundle({
            url: '/openapi.json',
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
              // @ts-ignore
              window.SwaggerUIBundle.presets.apis,
              // @ts-ignore
              window.SwaggerUIBundle.SwaggerUIStandalonePreset
            ],
            layout: 'StandaloneLayout',
            defaultModelsExpandDepth: 1,
            defaultModelExpandDepth: 1,
            docExpansion: 'list',
            filter: true,
            tryItOutEnabled: true
          });
        }
      };
      document.body.appendChild(script);
    };

    loadSwaggerUI();

    // Cleanup
    return () => {
      const links = document.querySelectorAll('link[href*="swagger-ui"]');
      links.forEach(link => link.remove());
      const scripts = document.querySelectorAll('script[src*="swagger-ui"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'auto' }}>
      <div id="swagger-ui" />
    </div>
  );
}
