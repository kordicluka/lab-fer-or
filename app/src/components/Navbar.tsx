'use client';

import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Navbar() {
  const { user, isLoading } = useUser();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl font-bold hover:text-gray-300">
            HNL
          </Link>
          <Link href="/datatable" className="hover:text-gray-300">
            Podaci
          </Link>
          <Link href="/api-docs" className="hover:text-gray-300">
            API Dokumentacija
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {isLoading ? (
            <span className="text-gray-400">Učitavanje...</span>
          ) : user ? (
            <>
              <Link href="/profile" className="hover:text-gray-300">
                Korisnički profil
              </Link>
              <Link href="/refresh" className="hover:text-gray-300">
                Osvježi preslike
              </Link>
              <a
                href="/auth/logout"
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Odjava
              </a>
            </>
          ) : (
            <a
              href="/auth/login"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              Prijava
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
