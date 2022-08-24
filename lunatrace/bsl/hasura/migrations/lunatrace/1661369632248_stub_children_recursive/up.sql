CREATE OR REPLACE FUNCTION manifest_dependency_node_children_recursive(manifest_dependency_node_in manifest_dependency_node)
    RETURNS SETOF manifest_dependency_node AS $$
    SELECT manifest_dependency_node_in;
$$ LANGUAGE sql STABLE;
