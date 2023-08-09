create TABLE notes(
    id SERIAL PRIMARY KEY,
    note VARCHAR(100),
    archived BOOLEAN default false,
    created VARCHAR,
    category VARCHAR,
    content VARCHAR(400),
    dates VARCHAR
);