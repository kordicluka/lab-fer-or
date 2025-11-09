'use client';

import { useState, useEffect } from 'react';

export default function DataTablePage() {
  const [players, setPlayers] = useState([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await fetch(`/api/players?query=${query}&filter=${filter}`);
      const data = await response.json();
      setPlayers(data);
    };
    fetchPlayers();
  }, [query, filter]);

  const handleDownload = async (format: 'csv' | 'json') => {
    const response = await fetch(`/api/players/download?format=${format}&query=${query}&filter=${filter}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `players.${format}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">HNL Players</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 mr-2 flex-grow bg-white text-gray-800"
          placeholder="Search..."
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border p-2 bg-white text-gray-800">
          <option value="all">All</option>
          <option value="ime">Ime</option>
          <option value="prezime">Prezime</option>
          <option value="nacionalnost">Nacionalnost</option>
          <option value="pozicija">Pozicija</option>
          <option value="klub">Klub</option>
        </select>
      </div>
      <div className="mb-4">
        <button onClick={() => handleDownload('csv')} className="bg-blue-500 text-white p-2 rounded mr-2">
          Download CSV
        </button>
        <button onClick={() => handleDownload('json')} className="bg-green-500 text-white p-2 rounded">
          Download JSON
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-gray-800">Ime</th>
            <th className="py-2 px-4 border-b text-gray-800">Prezime</th>
            <th className="py-2 px-4 border-b text-gray-800">Nacionalnost</th>
            <th className="py-2 px-4 border-b text-gray-800">Pozicija</th>
            <th className="py-2 px-4 border-b text-gray-800">Broj dresa</th>
            <th className="py-2 px-4 border-b text-gray-800">Vrijednost (EUR)</th>
            <th className="py-2 px-4 border-b text-gray-800">Klub</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player: any) => (
            <tr key={player.id}>
              <td className="py-2 px-4 border-b text-gray-800">{player.ime}</td>
              <td className="py-2 px-4 border-b text-gray-800">{player.prezime}</td>
              <td className="py-2 px-4 border-b text-gray-800">{player.nacionalnost}</td>
              <td className="py-2 px-4 border-b text-gray-800">{player.pozicija}</td>
              <td className="py-2 px-4 border-b text-gray-800">{player.broj_dresa}</td>
              <td className="py-2 px-4 border-b text-gray-800">{player.vrijednost_eur}</td>
              <td className="py-2 px-4 border-b text-gray-800">{player.klub}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
