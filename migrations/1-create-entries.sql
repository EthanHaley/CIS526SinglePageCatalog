CREATE TABLE entries (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  imageFilename TEXT NOT NULL,
  image BLOB NOT NULL
);
