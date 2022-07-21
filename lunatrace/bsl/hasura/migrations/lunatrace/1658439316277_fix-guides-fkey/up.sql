--  this just wipes out the whole table, it's fine, we will just upsert next time anyway
DELETE FROM public.guide_vulnerabilities;
ALTER TABLE public.guide_vulnerabilities DROP COLUMN vulnerability_id;
ALTER TABLE public.guide_vulnerabilities ADD COLUMN vulnerability_id uuid references vulnerability.vulnerability (id) NOT NULL;
ALTER TABLE public.guide_vulnerabilities ADD CONSTRAINT guide_vulnerabilities_unique UNIQUE (guide_id, vulnerability_id);
