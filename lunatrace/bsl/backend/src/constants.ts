if (!process.env.S3_SBOM_BUCKET && process.env.NODE_ENV === 'production') {
  throw new Error('Missing S3_SBOM_BUCKET env var');
}

export const sbomBucket = process.env.S3_SBOM_BUCKET || 'sbom-test-bucket';

if (!process.env.S3_MANIFEST_BUCKET && process.env.NODE_ENV === 'production') {
  throw new Error('Missing S3_MANIFEST_BUCKET env var');
}

export const manifestBucket = process.env.S3_MANIFEST_BUCKET || 'test-manifest-bucket-one';
