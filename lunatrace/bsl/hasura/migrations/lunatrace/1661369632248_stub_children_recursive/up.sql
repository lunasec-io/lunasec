CREATE OR REPLACE FUNCTION manifest_dependency_node_children_recursive(manifest_dependency_node_in manifest_dependency_node)
    RETURNS SETOF manifest_dependency_node AS
$$
SELECT manifest_dependency_node_in;
$$ LANGUAGE sql STABLE;

/*
CREATE OR REPLACE FUNCTION manifest_dependency_edges_for_build(manifest_dependency_in manifest_dependency)
    RETURNS SETOF manifest_dependency_edge AS $$


    -- union of fake row with all transitive deps

SELECT manifest_dependency_node_in;
$$ LANGUAGE sql STABLE;
*/
