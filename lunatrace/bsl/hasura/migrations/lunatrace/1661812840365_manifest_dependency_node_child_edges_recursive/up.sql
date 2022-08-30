CREATE OR REPLACE FUNCTION manifest_dependency_node_child_edges_recursive(root_node manifest_dependency_node) returns SETOF manifest_dependency_edge AS $$
    WITH RECURSIVE find_edges(id) AS(
        SELECT * FROM manifest_dependency_edge p
        UNION
        SELECT e.* FROM manifest_dependency_edge e INNER JOIN manifest_dependency_edge c ON e.parent_id = c.child_id
    ) SELECT * FROM find_edges WHERE id = root_node.id UNION (SELECT '00000000-0000-0000-0000-000000000000'::uuid, root_node.id);
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION manifest_dependency_child_edges_recursive(root_dependency manifest_dependency) returns SETOF manifest_dependency_edge AS $$
    SELECT recursed_nodes.* FROM manifest_dependency md
        JOIN manifest_dependency_node mdn on md.manifest_dependency_node_id = mdn.id,
        LATERAL manifest_dependency_node_child_edges_recursive(mdn) recursed_nodes;
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION resolved_manifest_child_edges_recursive(root_manifest resolved_manifest) returns SETOF manifest_dependency_edge AS $$
    SELECT recursed_nodes.* FROM resolved_manifest rd
        JOIN manifest_dependency md on rd.id = md.manifest_id
        JOIN manifest_dependency_node mdn on md.manifest_dependency_node_id = mdn.id,
        LATERAL manifest_dependency_node_child_edges_recursive(mdn) recursed_nodes;
$$ LANGUAGE sql STABLE;

