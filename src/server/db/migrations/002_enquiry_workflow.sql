ALTER TABLE enquiries ADD COLUMN status TEXT NOT NULL DEFAULT 'new';
ALTER TABLE enquiries ADD COLUMN internal_note TEXT;
ALTER TABLE enquiries ADD COLUMN updated_at TEXT NOT NULL DEFAULT '';

CREATE INDEX IF NOT EXISTS enquiries_status_created_at_idx ON enquiries(status, created_at DESC);
