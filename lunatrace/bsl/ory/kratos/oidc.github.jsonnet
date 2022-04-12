local claims = {
  email_verified: false
} + std.extVar('claims');

{
  identity: {
    traits: {
      // Allowing unverified email addresses enables account
      // enumeration attacks, especially if the value is used for
      // e.g. verification or as a password login identifier.
      //
      // Therefore we only return the email if it (a) exists and (b) is marked verified
      // by GitHub.
      [if "email" in claims && claims.email_verified then "email" else null]: claims.email,
      [if "name" in claims then "name" else null]: claims.name,
      [if "username" in claims then "username" else null]: claims.nickname,
      [if "website" in claims then "website" else null]: claims.website,
      [if "picture" in claims then "picture" else null]: claims.picture,
      [if "profile" in claims then "profileUrl" else null]: claims.profile,
      [if "sub" in claims then "githubId" else null]: claims.sub
    },
  },
}
