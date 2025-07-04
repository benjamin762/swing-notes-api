-- Code from pgadmin for setting up database.


-- Database: swing-notes

-- DROP DATABASE IF EXISTS "swing-notes";

CREATE DATABASE "swing-notes"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Swedish_Sweden.1252'
    LC_CTYPE = 'Swedish_Sweden.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;



-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    username character varying(30) COLLATE pg_catalog."default" NOT NULL,
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    password character varying(100) COLLATE pg_catalog."default" NOT NULL,
    role character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;




-- Table: public.notes

-- DROP TABLE IF EXISTS public.notes;

CREATE TABLE IF NOT EXISTS public.notes
(
    id character varying(50) COLLATE pg_catalog."default" NOT NULL,
    title character varying(200) COLLATE pg_catalog."default",
    text character varying(4000) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone,
    "modifiedAt" timestamp with time zone,
    username character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT notes_pkey PRIMARY KEY (id),
    CONSTRAINT "usernameFK" FOREIGN KEY (username)
        REFERENCES public.users (username) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.notes
    OWNER to postgres;
-- Index: fki_usernameFK

-- DROP INDEX IF EXISTS public."fki_usernameFK";

CREATE INDEX IF NOT EXISTS "fki_usernameFK"
    ON public.notes USING btree
    (username COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;