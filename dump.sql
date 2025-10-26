--
-- PostgreSQL database dump
--

\restrict c8a1bro7AuH3IHCs8ltnxveFP4FtgnLOWj8R4uxycTxlNkr4YID6N5Dz49ZzKUX

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
-- Name: igrac; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.igrac (
    igrac_id integer NOT NULL,
    ime character varying(50) NOT NULL,
    prezime character varying(50) NOT NULL,
    datum_rodenja date,
    pozicija public.enum_pozicija,
    broj_dresa integer,
    klub_id integer NOT NULL,
    nacionalnost character varying(50),
    vrijednost_eur integer,
    datum_potpisa date
);


ALTER TABLE public.igrac OWNER TO admin;

--
-- Name: igrac_igrac_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.igrac_igrac_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.igrac_igrac_id_seq OWNER TO admin;

--
-- Name: igrac_igrac_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.igrac_igrac_id_seq OWNED BY public.igrac.igrac_id;


--
-- Name: klub; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.klub (
    klub_id integer NOT NULL,
    ime character varying(100) NOT NULL,
    godina_osnutka integer,
    stadion_id integer
);


ALTER TABLE public.klub OWNER TO admin;

--
-- Name: klub_klub_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.klub_klub_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.klub_klub_id_seq OWNER TO admin;

--
-- Name: klub_klub_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.klub_klub_id_seq OWNED BY public.klub.klub_id;


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
-- Name: igrac igrac_id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.igrac ALTER COLUMN igrac_id SET DEFAULT nextval('public.igrac_igrac_id_seq'::regclass);


--
-- Name: klub klub_id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.klub ALTER COLUMN klub_id SET DEFAULT nextval('public.klub_klub_id_seq'::regclass);


--
-- Name: stadion stadion_id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.stadion ALTER COLUMN stadion_id SET DEFAULT nextval('public.stadion_stadion_id_seq'::regclass);


--
-- Data for Name: igrac; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.igrac (igrac_id, ime, prezime, datum_rodenja, pozicija, broj_dresa, klub_id, nacionalnost, vrijednost_eur, datum_potpisa) FROM stdin;
9	Toni	Fruk	\N	Vezni	7	4	Hrvatska	4000000	2023-07-01
10	Domagoj	Bukvić	\N	Napadač	77	3	Hrvatska	1500000	2022-05-15
1	Bruno	Petković	\N	Napadač	9	1	Hrvatska	8000000	2023-09-01
2	Martin	Baturina	\N	Vezni	10	1	Hrvatska	20000000	2022-01-15
3	Josip	Mišić	\N	Vezni	27	1	Hrvatska	5000000	2021-07-01
4	Marko	Livaja	\N	Napadač	10	2	Hrvatska	5500000	2021-08-30
5	Filip	Krovinović	\N	Vezni	23	2	Hrvatska	2800000	2021-07-01
6	Niko	Sigur	\N	Obrana	21	2	SAD/Hrvatska	2000000	2023-03-01
7	Ramón	Miérez	\N	Napadač	13	3	Argentina	4500000	2021-07-01
8	Niko	Galešić	\N	Obrana	5	4	Hrvatska	2000000	2022-07-15
\.


--
-- Data for Name: klub; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.klub (klub_id, ime, godina_osnutka, stadion_id) FROM stdin;
1	GNK Dinamo	1911	1
2	HNK Hajduk	1911	2
3	NK Osijek	1947	3
4	HNK Rijeka	1946	4
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
-- Name: igrac_igrac_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.igrac_igrac_id_seq', 10, true);


--
-- Name: klub_klub_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.klub_klub_id_seq', 4, true);


--
-- Name: stadion_stadion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.stadion_stadion_id_seq', 4, true);


--
-- Name: igrac igrac_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.igrac
    ADD CONSTRAINT igrac_pkey PRIMARY KEY (igrac_id);


--
-- Name: klub klub_ime_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.klub
    ADD CONSTRAINT klub_ime_key UNIQUE (ime);


--
-- Name: klub klub_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.klub
    ADD CONSTRAINT klub_pkey PRIMARY KEY (klub_id);


--
-- Name: stadion stadion_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.stadion
    ADD CONSTRAINT stadion_pkey PRIMARY KEY (stadion_id);


--
-- Name: igrac igrac_klub_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.igrac
    ADD CONSTRAINT igrac_klub_id_fkey FOREIGN KEY (klub_id) REFERENCES public.klub(klub_id);


--
-- Name: klub klub_stadion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.klub
    ADD CONSTRAINT klub_stadion_id_fkey FOREIGN KEY (stadion_id) REFERENCES public.stadion(stadion_id);


--
-- PostgreSQL database dump complete
--

\unrestrict c8a1bro7AuH3IHCs8ltnxveFP4FtgnLOWj8R4uxycTxlNkr4YID6N5Dz49ZzKUX

