CREATE OR REPLACE FUNCTION public.resolved_manifest_child_edges_recursive(root_manifest resolved_manifest)
 RETURNS SETOF manifest_dependency_edge
 LANGUAGE sql
 STABLE
AS $function$
    WITH RECURSIVE find_edges(id) AS (
        SELECT '00000000-0000-0000-0000-000000000000'::uuid as parent_id, md.manifest_dependency_node_id as child_id, '00000000-0000-0000-0000-000000000000'::uuid as id
        FROM manifest_dependency md
        WHERE md.manifest_id = root_manifest.id
        UNION
        SELECT e.parent_id, e.child_id, e.id FROM manifest_dependency_edge e JOIN find_edges c ON e.parent_id = c.child_id
    )
    SELECT * FROM find_edges;
$function$;

CREATE OR REPLACE FUNCTION manifest_dependency_node_child_edges_recursive(root_node manifest_dependency_node) RETURNS SETOF manifest_dependency_edge AS $$
WITH RECURSIVE find_edges(id) AS (
    SELECT '00000000-0000-0000-0000-000000000000'::uuid as parent_id, root_node.id as child_id, '00000000-0000-0000-0000-000000000000'::uuid as id
    UNION
    SELECT e.parent_id, e.child_id, e.id FROM manifest_dependency_edge e INNER JOIN find_edges c ON e.parent_id = c.child_id
)
SELECT * FROM find_edges;
$$ LANGUAGE sql STABLE;
