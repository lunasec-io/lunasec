CREATE TABLE public.ignored_vulnerabilities
(
    id               uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    project_id       uuid    NOT NULL references public.projects ON DELETE CASCADE,
    vulnerability_id uuid    NOT NULL references public.vulnerabilities ON DELETE CASCADE,
    creator_id       uuid    references public.identities ON DELETE SET NULL,
    locations        jsonb NOT NULL,
    note             text    NOT NULL,
    UNIQUE (project_id, vulnerability_id)
)


-- NONE OF THE BELOW STRATEGIES FOR COMPUTING IGNORED FINDINGS SERVERSIDE SEEMED EASY SO IT IS DONE CLIENT SIDE.  THESE ARE LEFT HERE FOR POSTERITY
-- create or replace function public.unignored_findings(parm1 text, parm2 text)
--   returns public.findings (param_label text, param_graphics_label text)
-- as
-- $body$
-- select * from public.findings
--   WHERE region_label = $1
--      AND model_id = (SELECT model_id FROM models WHERE model_label = $2)
--   ....
-- $body$
-- language sql;
--
-- CREATE FUNCTION unignored_findings(build_id_arg uuid, project_id uuid)
--     RETURNS SETOF public.findings AS $$
-- SELECT *
-- FROM public.findings
-- WHERE
--     build_id is build_id_arg
-- INNER JOIN
-- $$ LANGUAGE sql STABLE;

--
-- CREATE VIEW unignored_findings AS
-- SELECT
--     zoo_1.id id_a,
--     zoo_1.animal animal_a,
--     zoo_2.id id_b,
--     zoo_2.animal animal_b
-- FROM
--     zoo_1
--         INNER JOIN zoo_2 ON zoo_1.animal = zoo_2.animal;
