create or replace function vulnerability.match_reference_embedding_for_vulnerability (
    query_embedding vector(1536),
    vuln_id text,
    similarity_threshold float,
    match_count int
)
    returns table (
                      id uuid,
                      url text,
                      content text,
                      similarity float
                  )
    language plpgsql
as $$
begin
    return query
        select
            r.id,
            r.url,
            re.content,
            1 - (re.embedding <=> query_embedding) as similarity
        from vulnerability.reference_embedding re
                 join vulnerability.reference_content rc on rc.id = re.reference_content_id
                 join vulnerability.reference r on r.id = rc.reference_id
                 join vulnerability.vulnerability v on v.id = r.vulnerability_id
        where 1 - (re.embedding <=> query_embedding) > similarity_threshold
        and v.source_id = vuln_id
        order by re.embedding <=> query_embedding
        limit match_count;
end;
$$;
