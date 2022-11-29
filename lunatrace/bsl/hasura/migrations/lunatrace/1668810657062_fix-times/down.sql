-- It's really tricky to have a down migration for these times, so instead I made the up migration idempotent
SELECT * FROM public.builds; -- placeholder
