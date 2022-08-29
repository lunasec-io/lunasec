create function manifest_dependency_node_child_edges_recursive(root_node manifest_dependency_node) returns SETOF manifest_dependency_edge  AS $$
    SELECT '00000000-0000-0000-0000-000000000000'::uuid,'00000000-0000-0000-0000-000000000000'::uuid from manifest_dependency_edge LIMIT 1
$$ LANGUAGE sql STABLE;
