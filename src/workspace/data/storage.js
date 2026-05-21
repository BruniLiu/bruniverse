export const STORAGE_KEYS = {
  LITERATURE: "bruniverse-literature",
  NOTES: "bruniverse-notes",
  ACTIVITY: "bruniverse-activity",
};

export function createLiteratureItem({ title, authors, abstract, doi, year, tags, source }) {
  return {
    id: crypto.randomUUID(),
    title: title || "",
    authors: authors || [],
    abstract: abstract || "",
    doi: doi || "",
    year: year || null,
    tags: tags || [],
    source: source || "manual",
    relationships: [],
    graphPosition: {
      x: 200 + Math.random() * 400,
      y: 200 + Math.random() * 400,
    },
    createdAt: new Date().toISOString(),
  };
}

export function createNoteItem({ title, content }) {
  return {
    id: crypto.randomUUID(),
    title: title || "Untitled Note",
    content: content || "",
    linkedLiteratureIds: [],
    tags: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function createActivityEntry({ type, description, relatedId }) {
  return {
    id: crypto.randomUUID(),
    type,
    description,
    relatedId: relatedId || null,
    timestamp: new Date().toISOString(),
  };
}

export function readStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage full or unavailable — silently fail
  }
}
