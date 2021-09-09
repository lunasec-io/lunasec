PRAGMA foreign_keys=ON;

CREATE TABLE users (
    username TEXT UNIQUE,
    hashed_password BLOB,
    salt BLOB,
    display_name TEXT,
    ssn_token TEXT
);

INSERT INTO users VALUES(
    'test',
--                          password hash of "test"
    X'86fac4c9b1ac2943d9ebdbf9c2d108e8d15620534467376bf676047dc591a21c',
    X'6458a2822ab5e7b181da15aac0e65389',
    'TestUser',
    NULL
);

CREATE TABLE documents (
    user_id INTEGER,
    token TEXT
);

