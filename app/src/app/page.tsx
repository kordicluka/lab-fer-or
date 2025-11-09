'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function HomePage() {
  const [readmeContent, setReadmeContent] = useState('');

  useEffect(() => {
    fetch('/README_DATASET.md')
      .then((res) => res.text())
      .then((text) => setReadmeContent(text));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Otvoreno računarstvo - Lab 2</h1>
      
      <div className="prose mb-8">
        <ReactMarkdown>{readmeContent}</ReactMarkdown>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Preuzimanje podataka</h2>
        <a href="/hnl_igraci.csv" download className="text-blue-500 hover:underline mr-4">
          Preuzmi CSV
        </a>
        <a href="/hnl_igraci.json" download className="text-blue-500 hover:underline">
          Preuzmi JSON
        </a>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Interaktivna tablica</h2>
        <Link href="/datatable" className="text-blue-500 hover:underline">
          Prikaži tablicu s filtriranjem
        </Link>
      </div>
    </div>
  );
}
