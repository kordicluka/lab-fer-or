--
-- PostgreSQL database dump
--

\restrict Q9XXeJ4IN517VjArzPZQQ8y2vaiIX0A7A4jjNJWEu4NdbLHGuhHTLGOZD0Fk6aV

-- Dumped from database version 18.0 (Debian 18.0-1.pgdg13+3)
-- Dumped by pg_dump version 18.0 (Debian 18.0-1.pgdg13+3)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: drizzle; Type: SCHEMA; Schema: -; Owner: admin
--

CREATE SCHEMA drizzle;


ALTER SCHEMA drizzle OWNER TO admin;

--
-- Name: enum_pozicija; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_pozicija AS ENUM (
    'Golman',
    'Obrana',
    'Vezni',
    'Napadač'
);


ALTER TYPE public.enum_pozicija OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: __drizzle_migrations; Type: TABLE; Schema: drizzle; Owner: admin
--

CREATE TABLE drizzle.__drizzle_migrations (
    id integer NOT NULL,
    hash text NOT NULL,
    created_at bigint
);


ALTER TABLE drizzle.__drizzle_migrations OWNER TO admin;

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE; Schema: drizzle; Owner: admin
--

CREATE SEQUENCE drizzle.__drizzle_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNER TO admin;

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: drizzle; Owner: admin
--

ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNED BY drizzle.__drizzle_migrations.id;


--
-- Name: igrac; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.igrac (
    id integer NOT NULL,
    ime text NOT NULL,
    prezime text NOT NULL,
    nacionalnost text,
    datum_rodenja date,
    pozicija text,
    broj_dresa integer,
    vrijednost_eur integer,
    datum_potpisa date,
    klub_id integer
);


ALTER TABLE public.igrac OWNER TO admin;

--
-- Name: igrac_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.igrac_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.igrac_id_seq OWNER TO admin;

--
-- Name: igrac_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.igrac_id_seq OWNED BY public.igrac.id;


--
-- Name: klub; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.klub (
    id integer NOT NULL,
    ime text NOT NULL,
    stadion_domacin text,
    godina_osnutka integer
);


ALTER TABLE public.klub OWNER TO admin;

--
-- Name: klub_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.klub_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.klub_id_seq OWNER TO admin;

--
-- Name: klub_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.klub_id_seq OWNED BY public.klub.id;


--
-- Name: stadion; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.stadion (
    stadion_id integer NOT NULL,
    ime character varying(100) NOT NULL,
    grad character varying(50) NOT NULL,
    kapacitet integer
);


ALTER TABLE public.stadion OWNER TO admin;

--
-- Name: stadion_stadion_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.stadion_stadion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.stadion_stadion_id_seq OWNER TO admin;

--
-- Name: stadion_stadion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.stadion_stadion_id_seq OWNED BY public.stadion.stadion_id;


--
-- Name: __drizzle_migrations id; Type: DEFAULT; Schema: drizzle; Owner: admin
--

ALTER TABLE ONLY drizzle.__drizzle_migrations ALTER COLUMN id SET DEFAULT nextval('drizzle.__drizzle_migrations_id_seq'::regclass);


--
-- Name: igrac id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.igrac ALTER COLUMN id SET DEFAULT nextval('public.igrac_id_seq'::regclass);


--
-- Name: klub id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.klub ALTER COLUMN id SET DEFAULT nextval('public.klub_id_seq'::regclass);


--
-- Name: stadion stadion_id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.stadion ALTER COLUMN stadion_id SET DEFAULT nextval('public.stadion_stadion_id_seq'::regclass);


--
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: admin
--

COPY drizzle.__drizzle_migrations (id, hash, created_at) FROM stdin;
1	80815ca4d924d461e36358ce2e8b4caf373499ea5fb27cdc10fe465d74e664b9	1762696398021
\.


--
-- Data for Name: igrac; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.igrac (id, ime, prezime, nacionalnost, datum_rodenja, pozicija, broj_dresa, vrijednost_eur, datum_potpisa, klub_id) FROM stdin;
1	Bruno	Petković	Hrvatska	\N	Napadač	9	8000000	\N	1
2	Martin	Baturina	Hrvatska	\N	Vezni	10	20000000	\N	1
3	Josip	Mišić	Hrvatska	\N	Vezni	27	5000000	\N	1
4	Marko	Livaja	Hrvatska	\N	Napadač	10	5500000	\N	2
5	Filip	Krovinović	Hrvatska	\N	Vezni	23	2800000	\N	2
6	Niko	Sigur	SAD/Hrvatska	\N	Obrana	21	2000000	\N	2
7	Domagoj	Bukvić	Hrvatska	\N	Napadač	77	1500000	\N	3
8	Ramón	Miérez	Argentina	\N	Napadač	13	4500000	\N	3
9	Toni	Fruk	Hrvatska	\N	Vezni	7	4000000	\N	4
10	Niko	Galešić	Hrvatska	\N	Obrana	5	2000000	\N	4
\.


--
-- Data for Name: klub; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.klub (id, ime, stadion_domacin, godina_osnutka) FROM stdin;
1	GNK Dinamo	Maksimir	1911
2	HNK Hajduk	Poljud	1911
3	NK Osijek	Opus Arena	1947
4	HNK Rijeka	Rujevica	1946
\.


--
-- Data for Name: stadion; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.stadion (stadion_id, ime, grad, kapacitet) FROM stdin;
1	Maksimir	Zagreb	24800
2	Poljud	Split	33900
3	Opus Arena	Osijek	13000
4	Rujevica	Rijeka	8200
\.


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: admin
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 1, true);


--
-- Name: igrac_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.igrac_id_seq', 10, true);


--
-- Name: klub_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.klub_id_seq', 4, true);


--
-- Name: stadion_stadion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.stadion_stadion_id_seq', 4, true);


--
-- Name: __drizzle_migrations __drizzle_migrations_pkey; Type: CONSTRAINT; Schema: drizzle; Owner: admin
--

ALTER TABLE ONLY drizzle.__drizzle_migrations
    ADD CONSTRAINT __drizzle_migrations_pkey PRIMARY KEY (id);


--
-- Name: igrac igrac_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.igrac
    ADD CONSTRAINT igrac_pkey PRIMARY KEY (id);


--
-- Name: klub klub_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.klub
    ADD CONSTRAINT klub_pkey PRIMARY KEY (id);


--
-- Name: stadion stadion_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.stadion
    ADD CONSTRAINT stadion_pkey PRIMARY KEY (stadion_id);


--
-- Name: igrac igrac_klub_id_klub_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.igrac
    ADD CONSTRAINT igrac_klub_id_klub_id_fk FOREIGN KEY (klub_id) REFERENCES public.klub(id);


--
-- PostgreSQL database dump complete
--

\unrestrict Q9XXeJ4IN517VjArzPZQQ8y2vaiIX0A7A4jjNJWEu4NdbLHGuhHTLGOZD0Fk6aV

