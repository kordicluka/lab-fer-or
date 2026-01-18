'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

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
      <h1 className="text-3xl font-bold mb-8">Korisnički profil</h1>

      <div className="bg-white shadow rounded-lg p-6 max-w-md">
        <div className="flex items-center space-x-4 mb-6">
          {user.picture && (
            <img
              src={user.picture}
              alt={user.name || 'Korisnik'}
              className="w-20 h-20 rounded-full"
            />
          )}
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Podaci profila</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-gray-500 text-sm">Ime</dt>
              <dd>{user.name || 'N/A'}</dd>
            </div>
            <div>
              <dt className="text-gray-500 text-sm">Email</dt>
              <dd>{user.email || 'N/A'}</dd>
            </div>
            <div>
              <dt className="text-gray-500 text-sm">Nadimak</dt>
              <dd>{user.nickname || 'N/A'}</dd>
            </div>
            <div>
              <dt className="text-gray-500 text-sm">Email verificiran</dt>
              <dd>{user.email_verified ? 'Da' : 'Ne'}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
