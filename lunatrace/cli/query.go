package cli

var _ = `# @genqlient
query GetSbomUrl($build_id: uuid!) {
    builds_by_pk(id: $build_id) {
        s3_url_signed
    }
}

`
