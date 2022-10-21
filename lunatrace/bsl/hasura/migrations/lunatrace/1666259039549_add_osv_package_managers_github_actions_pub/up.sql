ALTER TYPE public.package_manager ADD VALUE IF NOT EXISTS 'github_actions';
ALTER TYPE public.package_manager ADD VALUE IF NOT EXISTS 'pub';

ALTER TABLE package.release_dependency DROP COLUMN dependency_release_id;
