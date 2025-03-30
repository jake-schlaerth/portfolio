CREATE TABLE whiteboards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR NOT NULL,
    password VARCHAR NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
