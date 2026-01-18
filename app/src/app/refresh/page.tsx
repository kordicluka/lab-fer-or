'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface RefreshResult {
  status: string;
  message: string;
  response?: {
    jsonFile: string;
    csvFile: string;
    clubsCount: number;
    playersCount: number;
  };
}

export default function RefreshPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [result, setResult] = useState<RefreshResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  const handleRefresh = async () => {
    setRefreshing(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('/api/refresh', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.message || 'Došlo je do greške');
      }
    } catch (err) {
      setError('Greška prilikom komunikacije sa serverom');
    } finally {
      setRefreshing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <p className="text-gray-600">Učitavanje...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Osvježi preslike podataka</h1>

      <div className="bg-white shadow rounded-lg p-6 max-w-lg">
        <p className="text-gray-600 mb-6">
          Kliknite gumb za osvježavanje JSON i CSV datoteka s podacima iz baze.
          Ovo će regenerirati datoteke <code>hnl_igraci.json</code> i{' '}
          <code>hnl_igraci.csv</code> u public mapi.
        </p>

        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className={`w-full py-3 px-4 rounded font-semibold text-white ${
            refreshing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {refreshing ? 'Osvježavanje...' : 'Osvježi preslike'}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {result && result.status === 'OK' && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            <p className="font-semibold mb-2">{result.message}</p>
            {result.response && (
              <ul className="text-sm space-y-1">
                <li>Klubova: {result.response.clubsCount}</li>
                <li>Igrača: {result.response.playersCount}</li>
                <li>
                  JSON:{' '}
                  <a
                    href={result.response.jsonFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {result.response.jsonFile}
                  </a>
                </li>
                <li>
                  CSV:{' '}
                  <a
                    href={result.response.csvFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {result.response.csvFile}
                  </a>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
