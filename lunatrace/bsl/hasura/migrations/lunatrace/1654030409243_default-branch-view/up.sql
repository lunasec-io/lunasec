-- Creates a view that only shows the builds on default branch

CREATE VIEW public.default_branch_builds AS
SELECT *
FROM public.builds AS build
WHERE build.git_branch = ( -- get the default branch by going to the build's project and then the project's github_repository
    SELECT default_branch
    FROM public.projects project
    INNER JOIN public.github_repositories
    ON project.id = public.github_repositories.project_id
    WHERE project.id = build.project_id)
AND EXISTS (SELECT 1 FROM public.scans WHERE build_id = build.id)
;
