import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import PageTransition from "./components/motion/PageTransition";
import Stepper, { Step } from "./components/react-bits/Stepper";
import ThemeToggle from "./components/theme/ThemeToggle";
import ResearchWorkspace from "./workspace/ResearchWorkspace";
import "./react.css";

const motionEase = [0.23, 1, 0.32, 1];

const fieldClass =
  "rounded-lg border border-white/14 bg-white/[0.07] px-4 py-2.5 text-sm font-medium text-white outline-none transition placeholder:text-white/45 focus:border-sky-100/46 focus:bg-white/[0.09]";

const primaryButtonClass =
  "mt-1 h-12 w-full rounded-lg bg-white px-5 text-sm font-bold text-black shadow-[0_14px_38px_rgba(255,255,255,0.12)] transition hover:bg-sky-100 hover:shadow-[0_16px_44px_rgba(186,230,253,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200 active:scale-[0.99]";

const footerLinkClass =
  "rounded-md px-1 py-1 text-sm font-semibold text-white/58 transition hover:text-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200";

const inlineActionClass =
  "rounded-md px-1 py-1 font-bold text-sky-100/84 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200";

const roleOptions = ["Student", "Educator", "Researcher", "Other"];

const interestOptions = [
  "Quality Education",
  "Climate Action",
  "Zero Hunger",
  "Peace, Justice and Strong Institutions",
  "Inequality and Justice",
  "General Sustainability Research",
];

const choiceButtonClass =
  "rounded-lg border px-3 py-2 text-left text-sm font-semibold leading-snug transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200";

const AUTH_USERS_KEY = "bruniverse-auth-users";
const AUTH_SESSION_KEY = "bruniverse-auth-session";

function normalizeIdentifier(value) {
  return String(value || "").trim().toLowerCase();
}

function readUsers() {
  try {
    const raw = window.localStorage.getItem(AUTH_USERS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  window.localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

function toPublicUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    interests: user.interests || [],
  };
}

function saveSession(user) {
  window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(toPublicUser(user)));
}

function loadSession() {
  try {
    const raw = window.localStorage.getItem(AUTH_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function clearSession() {
  window.localStorage.removeItem(AUTH_SESSION_KEY);
}

function findUser(identifier) {
  const normalized = normalizeIdentifier(identifier);
  return readUsers().find(
    (user) =>
      normalizeIdentifier(user.email) === normalized ||
      normalizeIdentifier(user.fullName) === normalized,
  );
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function createUser(signupData) {
  const email = signupData.email.trim();
  const users = readUsers();

  if (users.some((user) => normalizeIdentifier(user.email) === normalizeIdentifier(email))) {
    throw new Error("This email is already registered. Please log in instead.");
  }

  const user = {
    id: `user-${Date.now()}`,
    fullName: signupData.fullName.trim(),
    email,
    role: signupData.role,
    interests: signupData.interests,
    password: signupData.password,
    createdAt: new Date().toISOString(),
  };

  writeUsers([...users, user]);
  saveSession(user);
  return toPublicUser(user);
}

function FormField({ label, children }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-white/78">
      {label}
      {children}
    </label>
  );
}

function StarfieldBackground() {
  return (
    <div className="pointer-events-none absolute inset-[-5vh] z-0">
      <div className="hero-starfield hero-starfield-far absolute inset-0 opacity-40" />
      <div className="hero-starfield hero-starfield-near absolute inset-0 opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_26%,rgba(99,102,241,0.16)_0%,rgba(56,189,248,0.08)_26%,transparent_50%),radial-gradient(circle_at_28%_70%,rgba(129,140,248,0.09)_0%,transparent_40%),radial-gradient(circle_at_center,rgba(6,6,15,0.1)_0%,rgba(6,6,15,0.94)_78%)]" />
      <div className="noise-overlay absolute inset-0 opacity-[0.08] mix-blend-screen" />
    </div>
  );
}

function LoginForm({ onSwitchMode, onLoginSuccess }) {
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const identifier = String(data.get("identifier") || "").trim();
    const password = String(data.get("password") || "");

    const user = findUser(identifier);

    if (!user) {
      setMessage("No account was found for this email or name. Please sign up first.");
      return;
    }

    if (user.password !== password) {
      setMessage("Invalid password.");
      return;
    }

    saveSession(user);
    setMessage("");
    form.reset();
    onLoginSuccess(toPublicUser(user));
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <FormField label="Email or username">
        <input
          name="identifier"
          type="text"
          autoComplete="username"
          required
          className={fieldClass}
          placeholder="name@university.edu"
        />
      </FormField>

      <FormField label="Password">
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={fieldClass}
          placeholder="Enter your password"
        />
      </FormField>

      {message && (
        <p className="rounded-lg border border-red-300/18 bg-red-500/[0.08] px-4 py-3 text-sm font-medium leading-6 text-red-100/86">
          {message}
        </p>
      )}

      <button
        type="submit"
        className={primaryButtonClass}
      >
        Log in
      </button>

      <div className="flex flex-col gap-2 pt-1 text-sm sm:flex-row sm:items-center sm:justify-between">
        <a href="./index.html" className={footerLinkClass}>
          Back to Home
        </a>
        <p className="text-white/48">
          Need an account?{" "}
          <button type="button" onClick={onSwitchMode} className={inlineActionClass}>
            Sign up
          </button>
        </p>
      </div>
    </form>
  );
}

function DashboardPage({ onLogout }) {
  return <ResearchWorkspace onLogout={onLogout} />;
}

function SignUpForm({ onSwitchMode, onSignupSuccess }) {
  const [message, setMessage] = useState("");
  const [signupData, setSignupData] = useState({
    role: "Student",
    fullName: "",
    email: "",
    interests: [],
    password: "",
    confirmPassword: "",
  });

  function updateField(field, value) {
    setSignupData((current) => ({ ...current, [field]: value }));
  }

  function toggleInterest(interest) {
    setSignupData((current) => {
      const interests = current.interests.includes(interest)
        ? current.interests.filter((item) => item !== interest)
        : [...current.interests, interest];

      return { ...current, interests };
    });
  }

  function canProceed(step) {
    setMessage("");

    if (step === 2) {
      if (!signupData.fullName.trim() || !signupData.email.trim()) {
        setMessage("Please enter your full name and email before continuing.");
        return false;
      }

      if (!isValidEmail(signupData.email)) {
        setMessage("Please enter a valid email address.");
        return false;
      }

      if (readUsers().some((user) => normalizeIdentifier(user.email) === normalizeIdentifier(signupData.email))) {
        setMessage("This email is already registered. Please log in instead.");
        return false;
      }
    }

    if (step === 4) {
      if (!signupData.password || !signupData.confirmPassword) {
        setMessage("Please enter and confirm your password.");
        return false;
      }

      if (signupData.password !== signupData.confirmPassword) {
        setMessage("Passwords do not match.");
        return false;
      }

      if (signupData.password.length < 6) {
        setMessage("Please use at least 6 characters for the password.");
        return false;
      }
    }

    return true;
  }

  function handleComplete() {
    try {
      const user = createUser(signupData);
      setSignupData((current) => ({ ...current, password: "", confirmPassword: "" }));
      setMessage("");
      onSignupSuccess(user);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to create the account.");
    }
  }

  return (
    <div className="grid gap-4">
      <Stepper
        initialStep={1}
        onStepChange={() => {
          setMessage("");
        }}
        onFinalStepCompleted={handleComplete}
        backButtonText="Previous"
        nextButtonText="Next"
        completeButtonText="Complete Sign Up"
        disableStepIndicators
        canProceed={canProceed}
      >
        <Step>
          <div className="grid gap-4">
            <div>
              <h2 className="text-xl font-bold leading-tight text-white">
                Create your SDG Intelligence Hub account
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-white/62">
                Start learning, asking, researching, and acting with a sustainability-focused platform.
              </p>
            </div>

            <div className="grid gap-2">
              <p className="text-sm font-semibold text-white/76">User role</p>
              <div className="grid grid-cols-2 gap-2">
                {roleOptions.map((role) => {
                  const selected = signupData.role === role;

                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => updateField("role", role)}
                      className={`${choiceButtonClass} ${
                        selected
                          ? "border-cyan-100/48 bg-cyan-100/[0.12] text-sky-50 shadow-[0_0_24px_rgba(56,189,248,0.08)]"
                          : "border-white/12 bg-white/[0.04] text-white/62 hover:border-sky-100/30 hover:text-white"
                      }`}
                    >
                      {role}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Step>

        <Step>
          <div className="grid gap-4">
            <div>
              <h2 className="text-xl font-bold leading-tight text-white">Account Details</h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-white/62">
                Add the basics for your learning workspace.
              </p>
            </div>

            <FormField label="Full name">
              <input
                type="text"
                autoComplete="name"
                required
                value={signupData.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
                className={fieldClass}
                placeholder="Your full name"
              />
            </FormField>

            <FormField label="Email">
              <input
                type="email"
                autoComplete="email"
                required
                value={signupData.email}
                onChange={(event) => updateField("email", event.target.value)}
                className={fieldClass}
                placeholder="name@university.edu"
              />
            </FormField>
          </div>
        </Step>

        <Step>
          <div className="grid gap-4">
            <div>
              <h2 className="text-xl font-bold leading-tight text-white">Learning Interests</h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-white/62">
                Which SDG areas are you most interested in?
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {interestOptions.map((interest) => {
                const selected = signupData.interests.includes(interest);

                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`${choiceButtonClass} ${
                      selected
                        ? "border-teal-100/44 bg-teal-100/[0.11] text-teal-50 shadow-[0_0_24px_rgba(45,212,191,0.07)]"
                        : "border-white/12 bg-white/[0.04] text-white/62 hover:border-sky-100/30 hover:text-white"
                    }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>
        </Step>

        <Step>
          <div className="grid gap-4">
            <div>
              <h2 className="text-xl font-bold leading-tight text-white">Security</h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-white/62">
                Your account will be saved in this browser for the project demo.
              </p>
            </div>

            <FormField label="Password">
              <input
                type="password"
                autoComplete="new-password"
                required
                value={signupData.password}
                onChange={(event) => updateField("password", event.target.value)}
                className={fieldClass}
                placeholder="Create a password"
              />
            </FormField>

            <FormField label="Confirm password">
              <input
                type="password"
                autoComplete="new-password"
                required
                value={signupData.confirmPassword}
                onChange={(event) => updateField("confirmPassword", event.target.value)}
                className={fieldClass}
                placeholder="Confirm your password"
              />
            </FormField>
          </div>
        </Step>

        <Step>
          <div className="grid gap-4">
            <div>
              <h2 className="text-xl font-bold leading-tight text-white">You are ready to explore.</h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-white/62">
                Complete sign up to open your SDG research workspace.
              </p>
            </div>

            <div className="rounded-lg border border-white/12 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white/64">
              <span className="font-semibold text-sky-100/82">Selected role:</span>{" "}
              {signupData.role}
              <br />
              <span className="font-semibold text-sky-100/82">Interests:</span>{" "}
              {signupData.interests.length ? signupData.interests.join(", ") : "Not selected yet"}
            </div>
          </div>
        </Step>
      </Stepper>

      {message && (
        <p className="rounded-lg border border-cyan-100/16 bg-cyan-100/[0.06] px-4 py-3 text-sm font-medium leading-6 text-sky-100/78">
          {message}
        </p>
      )}

      <div className="flex flex-col gap-2 pt-1 text-sm sm:flex-row sm:items-center sm:justify-between">
        <a href="./index.html" className={footerLinkClass}>
          Back to Home
        </a>
        <p className="text-white/48">
          Already have an account?{" "}
          <button type="button" onClick={onSwitchMode} className={inlineActionClass}>
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}

function LoginPage() {
  const [mode, setMode] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);
  const shouldReduceMotion = useReducedMotion();
  const isSignUp = mode === "signup";

  useEffect(() => {
    setCurrentUser(loadSession());
  }, []);

  function handleLogout() {
    clearSession();
    setCurrentUser(null);
    setMode("login");
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {currentUser ? (
        <PageTransition
          key="dashboard"
          transitionKey="dashboard"
          shouldReduceMotion={shouldReduceMotion}
        >
          <DashboardPage onLogout={handleLogout} />
        </PageTransition>
      ) : (
        <PageTransition
          key={`auth-${mode}`}
          transitionKey={`auth-${mode}`}
          shouldReduceMotion={shouldReduceMotion}
        >
          <main className="aurora-landing relative min-h-[100svh] overflow-x-hidden bg-[#06060f] text-white">
            <StarfieldBackground />
            <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-5">
              <ThemeToggle />
            </div>

            <section className="relative z-10 grid min-h-[100svh] place-items-center px-4 py-4 sm:px-6 sm:py-5">
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14, scale: shouldReduceMotion ? 1 : 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.32, ease: motionEase }}
                className={`w-full overflow-hidden rounded-lg border border-indigo-200/14 bg-[#090918]/76 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md sm:p-5 ${
                  isSignUp ? "max-w-lg" : "max-w-md"
                }`}
              >
                <div className="mb-4 border-b border-white/10 pb-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-100/62">
                    SDG Intelligence Hub
                  </p>
                  <h1 className="mt-2 text-2xl font-bold leading-tight text-white sm:text-3xl">
                    {isSignUp ? "Sign up" : "Log in"}
                  </h1>
                  <p className="mt-1.5 text-sm font-medium leading-relaxed text-white/62">
                    {isSignUp
                      ? "Create access for learning, asking, researching, and acting."
                      : "Access SDG Intelligence Hub for learning, asking, researching, and acting."}
                  </p>
                </div>

                {isSignUp ? (
                  <SignUpForm
                    onSwitchMode={() => setMode("login")}
                    onSignupSuccess={(user) => setCurrentUser(user)}
                  />
                ) : (
                  <LoginForm
                    onSwitchMode={() => setMode("signup")}
                    onLoginSuccess={(user) => setCurrentUser(user)}
                  />
                )}
              </motion.div>
            </section>
          </main>
        </PageTransition>
      )}
    </AnimatePresence>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoginPage />
  </React.StrictMode>,
);
