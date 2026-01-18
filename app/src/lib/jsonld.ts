
export function addPlayerJsonLd<T extends object>(player: T) {
  return {
    "@context": {
      "@vocab": "https://schema.org/",
      "hnl": "https://hnl.hr/schema#",
      "id": "identifier",
      "ime": "givenName",
      "prezime": "familyName",
      "nacionalnost": "nationality",
      "datum_rodenja": "birthDate",
      "pozicija": "jobTitle",
      "klub": "memberOf",
      "broj_dresa": "hnl:jerseyNumber",
      "vrijednost_eur": "hnl:marketValueEUR",
      "datum_potpisa": "hnl:contractSignedDate",
      "klub_id": "hnl:clubId"
    },
    "@type": "Person",
    ...player
  };
}


export function addClubJsonLd<T extends object>(club: T) {
  return {
    "@context": {
      "@vocab": "https://schema.org/",
      "id": "identifier",
      "ime": "name",
      "stadion_domacin": "location",
      "godina_osnutka": "foundingDate"
    },
    "@type": "SportsTeam",
    ...club
  };
}
