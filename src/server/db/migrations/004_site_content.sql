CREATE TABLE IF NOT EXISTS site_pages (
  id TEXT PRIMARY KEY NOT NULL,
  eyebrow TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  name TEXT NOT NULL,
  legal_name TEXT NOT NULL,
  descriptor TEXT NOT NULL,
  address TEXT NOT NULL,
  location TEXT NOT NULL,
  general_email TEXT NOT NULL,
  enquiry_email TEXT NOT NULL,
  office_phone TEXT NOT NULL,
  office_tel TEXT NOT NULL,
  mobile_phone TEXT NOT NULL,
  mobile_tel TEXT NOT NULL,
  whatsapp TEXT NOT NULL DEFAULT '',
  directions_url TEXT NOT NULL DEFAULT '',
  opening_hours TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS gallery_items (
  id TEXT PRIMARY KEY NOT NULL,
  image_url TEXT NOT NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  category TEXT NOT NULL,
  alt TEXT NOT NULL,
  caption TEXT NOT NULL,
  featured INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS gallery_items_sort_order_idx ON gallery_items(sort_order);
