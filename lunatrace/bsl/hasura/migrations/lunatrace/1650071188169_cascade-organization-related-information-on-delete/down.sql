
ALTER TABLE "public"."findings" DROP CONSTRAINT "findings_build_id_fkey",
  ADD CONSTRAINT "findings_build_id_fkey"
  FOREIGN KEY ("build_id")
  REFERENCES "public"."builds"
  ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "public"."findings" DROP CONSTRAINT "findings_scan_id_fkey",
  ADD CONSTRAINT "findings_scan_id_fkey"
  FOREIGN KEY ("scan_id")
  REFERENCES "public"."scans"
  ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "public"."scans" DROP CONSTRAINT "scans_build_id_fkey",
  ADD CONSTRAINT "scans_build_id_fkey"
  FOREIGN KEY ("build_id")
  REFERENCES "public"."builds"
  ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "public"."manifests" DROP CONSTRAINT "manifests_build_id_fkey",
  ADD CONSTRAINT "manifests_build_id_fkey"
  FOREIGN KEY ("build_id")
  REFERENCES "public"."builds"
  ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "public"."manifests" DROP CONSTRAINT "manifests_project_id_fkey",
  ADD CONSTRAINT "manifests_project_id_fkey"
  FOREIGN KEY ("project_id")
  REFERENCES "public"."projects"
  ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "public"."builds" DROP CONSTRAINT "builds_project_id_fkey",
  ADD CONSTRAINT "builds_project_id_fkey"
  FOREIGN KEY ("project_id")
  REFERENCES "public"."projects"
  ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;
