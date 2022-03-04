ALTER TABLE public.manifests ADD COLUMN IF NOT EXISTS build_id   uuid references public.builds (id);
