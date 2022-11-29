

DROP TABLE public.project_environmental_adjustment;

DROP TABLE public.cvss_environmental_adjustment;



-- general use ENUMs for cvss modifiers since many are shared
DROP TYPE cvss_low_medium_high;
DROP TYPE cvss_none_low_high;

-- specific use case ENUMs for cvss modifiers that are unique
DROP TYPE cvss_vector;
DROP TYPE cvss_interaction;
DROP TYPE cvss_scope;
DROP TYPE cvss_complexity;

