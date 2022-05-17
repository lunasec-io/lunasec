ALTER TABLE public.settings DROP COLUMN is_org_settings;
ALTER TABLE projects DROP COLUMN settings_id;
ALTER TABLE organizations DROP COLUMN settings_id;

ALTER TABLE public.settings ADD COLUMN pr_feedback_disabled boolean DEFAULT false;

ALTER TABLE public.settings ADD COLUMN "project_id" uuid null;
ALTER TABLE public.settings ADD CONSTRAINT "settings_project_id_key" UNIQUE ("project_id");

ALTER TABLE public.settings
    ADD CONSTRAINT "settings_project_id_fkey"
    FOREIGN KEY ("project_id")
    REFERENCES "public"."projects"
    ("id") ON UPDATE CASCADE ON DELETE CASCADE;
