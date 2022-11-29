

-- Fixes timestamps with messed up timezones

-- Builds ---------

-- Delete dependent views that used the old format
-- Views need to be recreated because that's how postgres views work

DROP VIEW public.latest_builds;
DROP VIEW public.latest_default_builds;
DROP VIEW public.default_branch_builds;

ALTER TABLE builds
    ALTER COLUMN created_at TYPE TIMESTAMPTZ USING created_at::timestamptz;

ALTER TABLE builds
    ALTER COLUMN created_at SET DEFAULT NOW();

CREATE OR REPLACE VIEW public.default_branch_builds AS
SELECT build.*
FROM public.builds AS build
         JOIN public.projects AS project
              ON project.id = build.project_id
         JOIN public.github_repositories AS github_repository
              ON project.id = github_repository.project_id
WHERE build.git_branch = github_repository.default_branch
  AND EXISTS(SELECT 1 FROM public.scans WHERE build_id = build.id);


CREATE OR REPLACE VIEW public.latest_default_builds AS
SELECT DISTINCT ON (project_id) *
FROM public.default_branch_builds
ORDER BY public.default_branch_builds.project_id ASC, build_number DESC;


CREATE OR REPLACE VIEW public.latest_builds AS
SELECT latest_builds.*
FROM (SELECT DISTINCT project_id
      FROM public.builds) project_groups
         JOIN LATERAL (
    SELECT *
    FROM public.builds builds_inner
    WHERE builds_inner.project_id = project_groups.project_id
    ORDER BY builds_inner.build_number DESC
    LIMIT 10
    ) latest_builds ON true
UNION
SELECT *
FROM public.latest_default_builds
ORDER BY project_id, build_number;


-- Scans

ALTER TABLE scans
    ALTER COLUMN created_at TYPE TIMESTAMPTZ USING created_at::timestamptz;

ALTER TABLE scans
    ALTER COLUMN created_at SET DEFAULT NOW();

-- Projects

ALTER TABLE public.projects
    ALTER COLUMN created_at TYPE TIMESTAMPTZ USING created_at::timestamptz;

ALTER TABLE public.projects
    ALTER COLUMN created_at SET DEFAULT NOW();

-- Project access tokens

ALTER TABLE public.project_access_tokens
    ALTER COLUMN created_at TYPE TIMESTAMPTZ USING created_at::timestamptz;

ALTER TABLE public.project_access_tokens
    ALTER COLUMN created_at SET DEFAULT NOW();

ALTER TABLE public.project_access_tokens
    ALTER COLUMN last_used TYPE TIMESTAMPTZ USING last_used::timestamptz;

ALTER TABLE public.project_access_tokens
    ALTER COLUMN last_used SET DEFAULT NOW();


-- settings, why not

ALTER TABLE public.settings
    ALTER COLUMN created_at TYPE TIMESTAMPTZ USING created_at::timestamptz;

ALTER TABLE public.settings
    ALTER COLUMN created_at SET DEFAULT NOW();

-- instances

ALTER TABLE public.instances
    ALTER COLUMN created_at TYPE TIMESTAMPTZ USING created_at::timestamptz;

ALTER TABLE public.instances
    ALTER COLUMN created_at SET DEFAULT NOW();

ALTER TABLE public.instances
    ALTER COLUMN last_heartbeat TYPE TIMESTAMPTZ USING last_heartbeat::timestamptz;

-- manifests

ALTER TABLE public.manifests
    ALTER COLUMN created_at TYPE TIMESTAMPTZ USING created_at::timestamptz;

ALTER TABLE public.manifests
    ALTER COLUMN created_at SET DEFAULT NOW();

-- webhooks

ALTER TABLE public.webhook_cache
    ALTER COLUMN created_at TYPE TIMESTAMPTZ USING created_at::timestamptz;

ALTER TABLE public.webhook_cache
    ALTER COLUMN created_at SET DEFAULT NOW();


-- organizations

ALTER TABLE public.organizations
    ALTER COLUMN "createdAt" TYPE TIMESTAMPTZ USING "createdAt"::timestamptz;

ALTER TABLE public.organizations
    ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- findings

ALTER TABLE public.findings
    ALTER COLUMN "created_at" TYPE TIMESTAMPTZ USING created_at::timestamptz;

ALTER TABLE public.findings
    ALTER COLUMN "created_at" SET DEFAULT NOW();
