--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: tattoos; Type: TABLE; Schema: public; Owner: wendyzhu
--

CREATE TABLE public.tattoos (
    id integer NOT NULL,
    title text,
    image_url text,
    category text,
    artist text,
    user_id integer
);


ALTER TABLE public.tattoos OWNER TO wendyzhu;

--
-- Name: tattoos_id_seq; Type: SEQUENCE; Schema: public; Owner: wendyzhu
--

CREATE SEQUENCE public.tattoos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tattoos_id_seq OWNER TO wendyzhu;

--
-- Name: tattoos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wendyzhu
--

ALTER SEQUENCE public.tattoos_id_seq OWNED BY public.tattoos.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: wendyzhu
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text,
    username text,
    password_digest text
);


ALTER TABLE public.users OWNER TO wendyzhu;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: wendyzhu
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO wendyzhu;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wendyzhu
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: tattoos id; Type: DEFAULT; Schema: public; Owner: wendyzhu
--

ALTER TABLE ONLY public.tattoos ALTER COLUMN id SET DEFAULT nextval('public.tattoos_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: wendyzhu
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: tattoos; Type: TABLE DATA; Schema: public; Owner: wendyzhu
--

COPY public.tattoos (id, title, image_url, category, artist, user_id) FROM stdin;
4	Lotus Tattoo	https://i.pinimg.com/originals/f4/fe/d8/f4fed8e559fafca136509d25e3dc64f6.png	floral	mr k	1
5	Frenchies	https://img.buzzfeed.com/buzzfeed-static/static/2021-06/1/15/asset/8d87162a5ee0/sub-buzz-6074-1622561318-14.jpg	dog	molly j	2
1	flower tattoo	https://i.pinimg.com/originals/0b/86/55/0b8655aa8a7724e5a0ddfe5afb0e85d1.jpg	floral	mr k	1
2	dream	https://inkably.co.uk/wp-content/uploads/2019/10/Untitled-3.jpg	lettering	juliana	1
8	test	https://christieathome.com/wp-content/uploads/2020/12/Mochi-Pancakes1-scaled.jpg	food	juliana	1
3	three dogs realistic tattoo	https://images.squarespace-cdn.com/content/v1/5729d25040261d0fbc27d24f/1683865904413-TRVE43UM6WY2G99DM4VJ/r.jpg	dog	molly j	1
9	love the grind	https://inkppl.com/assets/php/files/082022/200822-1543-417.JPG	lettering	juliana	2
10	waves & moon	https://tattoolist.co/wp-content/uploads/2020/02/Wave-Sea-Ocean-Moon-tattoo-4-768x768.jpg	nature	molly j	2
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: wendyzhu
--

COPY public.users (id, email, username, password_digest) FROM stdin;
1	test@test.com	test	$2b$10$fXweP9yOZcGoBmcOldiqAuZ1sSLAl7CAp5RVMZgEL/4RDdb/umfvC
2	wendy@test.com	wendyzz	$2b$10$e93/hS3h510L9TdH2iPymOcegvxcr1gfdSCZTUkGvMUNPN8U/8cay
3	test1@test.com	test1	$2b$10$/vRc048yqpvtOdXrUE.dDOyd/GWoRmizA245CrvqFL8PF6ijmCoqK
\.


--
-- Name: tattoos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wendyzhu
--

SELECT pg_catalog.setval('public.tattoos_id_seq', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wendyzhu
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: tattoos tattoos_pkey; Type: CONSTRAINT; Schema: public; Owner: wendyzhu
--

ALTER TABLE ONLY public.tattoos
    ADD CONSTRAINT tattoos_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: wendyzhu
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

