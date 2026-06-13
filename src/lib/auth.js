export const AUTH_USERS_KEY = "bruniverse-auth-users";
export const AUTH_SESSION_KEY = "bruniverse-auth-session";

function normalizeIdentifier(value) {
  return String(value || "").trim().toLowerCase();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function readLegacyUsers() {
  try {
    const raw = window.localStorage.getItem(AUTH_USERS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLegacyUsers(users) {
  window.localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

function findLegacyUser(identifier) {
  const normalized = normalizeIdentifier(identifier);
  return readLegacyUsers().find(
    (user) =>
      normalizeIdentifier(user.email) === normalized ||
      normalizeIdentifier(user.fullName) === normalized,
  );
}

async function postJson(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.error || "Request failed. Please try again.");
  }

  return data;
}

export function toPublicUser(user) {
  if (!user) return null;

  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    interests: user.interests || [],
  };
}

export function loadSession() {
  try {
    const raw = window.localStorage.getItem(AUTH_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveSession(user) {
  window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(toPublicUser(user)));
}

export function clearSession() {
  window.localStorage.removeItem(AUTH_SESSION_KEY);
}

export function getSessionToken() {
  const session = loadSession();
  if (!session?.id || !session?.email) return "";
  return window.btoa(unescape(encodeURIComponent(`${session.id}:${session.email}`)));
}

export async function signupUser(signupData) {
  const payload = {
    fullName: String(signupData.fullName || "").trim(),
    email: String(signupData.email || "").trim(),
    role: signupData.role || "Researcher",
    interests: signupData.interests || [],
    password: signupData.password || "",
  };

  if (!payload.fullName || !isValidEmail(payload.email) || payload.password.length < 6) {
    throw new Error("Please enter a valid name, email, and password.");
  }

  try {
    const data = await postJson("/api/auth/signup", payload);
    saveSession(data.user);
    return toPublicUser(data.user);
  } catch (error) {
    if (!String(error.message || "").includes("Failed to fetch")) throw error;

    const users = readLegacyUsers();
    if (users.some((user) => normalizeIdentifier(user.email) === normalizeIdentifier(payload.email))) {
      throw new Error("This email is already registered. Please log in instead.");
    }

    const user = {
      id: `user-${Date.now()}`,
      fullName: payload.fullName,
      email: payload.email,
      role: payload.role,
      interests: payload.interests,
      password: payload.password,
      createdAt: new Date().toISOString(),
    };

    writeLegacyUsers([...users, user]);
    saveSession(user);
    return toPublicUser(user);
  }
}

export async function loginUser(identifier, password) {
  try {
    const data = await postJson("/api/auth/login", { identifier, password });
    saveSession(data.user);
    return toPublicUser(data.user);
  } catch (error) {
    if (!String(error.message || "").includes("Failed to fetch")) throw error;

    const user = findLegacyUser(identifier);
    if (!user || user.password !== password) {
      throw new Error("Invalid email/name or password.");
    }

    saveSession(user);
    return toPublicUser(user);
  }
}
