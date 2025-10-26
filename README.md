# HNL (Hrvatska Nogometna Liga) Skup Podataka

Ovaj skup podataka sadrži osnovne informacije o klubovima, stadionima i igračima Hrvatske Nogometne Lige.  
Kreiran je za potrebe 1. laboratorijske vježbe iz kolegija Otvoreno računarstvo.  
Skup podataka je modeliran kao relacijska baza te izvezen u CSV i hijerarhijski JSON format.

## Metapodaci

Ovo je popis metapodataka koji opisuju skup:

1. **Autor:** Luka Kordić
2. **Verzija:** 1.0
3. **Jezik:** Hrvatski
4. **Licenca:** Creative Commons Imenovanje-Nekomercijalno-Dijeli pod istim uvjetima 4.0 (CC BY-NC-SA 4.0)
5. **Datum kreiranja:** 26. listopad 2025.
6. **Kontakt:** lk55245@fer.hr
7. **Institucija:** Fakultet elektrotehnike i računarstva (FER)
8. **Kolegij:** Otvoreno računarstvo
9. **Izvor:** Podaci su prikupljeni ručno za potrebe vježbe.
10. **Formati:** CSV, JSON
11. **Baza podataka:** PostgreSQL (Verzija 18)

---

## Opis Atributa

### JSON (`hnl_igraci.json`)

Podaci su organizirani kao lista klubova (roditelj), gdje svaki klub sadrži ugniježđenu listu svojih igrača (dijete),  
u skladu sa zahtjevima vježbe.

- `klub` (String): Puno ime kluba.
- `godina_osnutka` (Integer): Godina osnutka kluba.
- `stadion` (String): Ime domaćeg stadiona kluba.
- `igraci` (Array): Lista objekata koji predstavljaju igrače.
  - `ime` (String): Ime igrača.
  - `prezime` (String): Prezime igrača.
  - `pozicija` (String): Pozicija na kojoj igrač igra (npr. 'Napadač').
  - `broj_dresa` (Integer): Broj na dresu.
  - `nacionalnost` (String): Nacionalnost igrača.
  - `vrijednost_eur` (Integer): Procijenjena tržišna vrijednost u EUR.

### CSV (`hnl_igraci.csv`)

CSV datoteka je denormalizirana lista igrača.  
U skladu sa zahtjevima vježbe, za svakog igrača (dijete) ponavljaju se podaci o njegovom klubu (roditelj).

- `ime` (String): Ime igrača.
- `prezime` (String): Prezime igrača.
- `nacionalnost` (String): Nacionalnost igrača.
- `datum_rodenja` (Date): Datum rođenja igrača (može biti prazno).
- `pozicija` (String): Pozicija na kojoj igrač igra.
- `broj_dresa` (Integer): Broj na dresu.
- `vrijednost_eur` (Integer): Procijenjena tržišna vrijednost u EUR.
- `datum_potpisa` (Date): Datum potpisa ugovora za klub.
- `klub` (String): Ime kluba za tog igrača.
- `stadion_domacin` (String): Ime domaćeg stadiona kluba.

## Licenca

Ovaj projekt je licenciran pod [Creative Commons BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) licencom.  
© 2025 Luka Kordić
