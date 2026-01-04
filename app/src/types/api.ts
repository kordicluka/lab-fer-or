export interface ApiResponse<T> {
  status: 'OK' | 'Error';
  message: string;
  response: T | null;
}

export interface PlayerInput {
  ime: string;
  prezime: string;
  nacionalnost?: string;
  datum_rodenja?: string;
  pozicija?: string;
  broj_dresa?: number;
  vrijednost_eur?: number;
  datum_potpisa?: string;
  klub_id?: number;
}

export interface Player {
  id: number;
  ime: string;
  prezime: string;
  nacionalnost: string | null;
  datum_rodenja: string | null;
  pozicija: string | null;
  broj_dresa: number | null;
  vrijednost_eur: number | null;
  datum_potpisa: string | null;
  klub_id: number | null;
  klub?: string;
}

export interface Club {
  id: number;
  ime: string;
  stadion_domacin: string | null;
  godina_osnutka: number | null;
}
