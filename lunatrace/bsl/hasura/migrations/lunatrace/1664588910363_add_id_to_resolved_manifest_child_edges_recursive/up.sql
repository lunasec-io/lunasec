CREATE OR REPLACE FUNCTION public.resolved_manifest_child_edges_recursive(root_manifest resolved_manifest)
 RETURNS SETOF manifest_dependency_edge
 LANGUAGE sql
 STABLE
AS $function$
    WITH RECURSIVE find_edges(id) AS (
        SELECT '00000000-0000-0000-0000-000000000000'::uuid as id, '00000000-0000-0000-0000-000000000000'::uuid as parent_id, md.manifest_dependency_node_id as child_id
        FROM manifest_dependency md
        WHERE md.manifest_id = root_manifest.id
        UNION
        SELECT e.* FROM manifest_dependency_edge e JOIN find_edges c ON e.parent_id = c.child_id
    )
    SELECT * FROM find_edges;
$function$;
