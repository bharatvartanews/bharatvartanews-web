// "use client";

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// type User = {
//   name: string;
//   email: string;
//   picture: string;
// };

// type AuthContextType = {
//   user: User | null;
//   signIn: (silent?: boolean) => Promise<void>;
//   logout: () => void;
//   switchAccount: () => Promise<void>;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// function waitForGoogle(): Promise<void> {
//   return new Promise((resolve) => {
//     if (window.google?.accounts?.id) {
//       resolve();
//       return;
//     }

//     const interval = setInterval(() => {
//       if (window.google?.accounts?.id) {
//         clearInterval(interval);
//         resolve();
//       }
//     }, 100);
//   });
// }

// export function AuthProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const saved = localStorage.getItem("public_user");
//     if (saved) setUser(JSON.parse(saved));
//   }, []);

//   function handleCredential(response: any) {
//     if (!response?.credential) return;

//     const payload = JSON.parse(
//       atob(response.credential.split(".")[1])
//     );

//     const userData: User = {
//       name: payload.name,
//       email: payload.email,
//       picture: payload.picture,
//     };

//     setUser(userData);
//     localStorage.setItem(
//       "public_user",
//       JSON.stringify(userData)
//     );
//     localStorage.removeItem("google_prompt_dismissed");
//   }

//   async function signIn(silent: boolean = false) {
//     const clientId =
//       process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

//     // 🔒 SAFE EXIT: auth disabled until client id exists
//     if (!clientId) return;

//     await waitForGoogle();

//     if (!window.google?.accounts?.id) return;

//     window.google.accounts.id.initialize({
//       client_id: clientId,
//       callback: handleCredential,
//       auto_select: silent,
//     });

//     if (!silent) {
//       window.google.accounts.id.prompt((notification: any) => {
//         if (
//           notification?.isNotDisplayed?.() ||
//           notification?.isSkippedMoment?.()
//         ) {
//           localStorage.setItem(
//             "google_prompt_dismissed",
//             "1"
//           );
//         }
//       });
//     }
//   }

//   function logout() {
//     setUser(null);
//     localStorage.removeItem("public_user");
//     window.google?.accounts?.id.disableAutoSelect();
//   }

//   async function switchAccount() {
//     logout();
//     await signIn(false);
//   }

//   return (
//     <AuthContext.Provider
//       value={{ user, signIn, logout, switchAccount }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) {
//     throw new Error(
//       "useAuth must be used inside AuthProvider"
//     );
//   }
//   return ctx;
// }


"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  signIn: () => Promise<void>;
  logout: () => void;
  switchAccount: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

function waitForGoogle(): Promise<void> {
  return new Promise((resolve) => {
    if (window.google?.accounts?.id) {
      resolve();
      return;
    }

    const interval = setInterval(() => {
      if (window.google?.accounts?.id) {
        clearInterval(interval);
        resolve();
      }
    }, 100);
  });
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // 🔁 Restore login on refresh
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    fetch(`${API_BASE}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data?.user) setUser(data.user);
      })
      .catch(() => {
        localStorage.removeItem("auth_token");
      });
  }, []);

  async function handleGoogleCredential(response: any) {
    if (!response?.credential) return;

    const res = await fetch(`${API_BASE}/api/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: response.credential,
      }),
    });

    if (!res.ok) return;

    const data = await res.json();

    localStorage.setItem("auth_token", data.token);
    setUser(data.user);
  }

  async function signIn() {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) return;

    await waitForGoogle();

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleGoogleCredential,
    });

    window.google.accounts.id.prompt();
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("auth_token");
    window.google?.accounts?.id.disableAutoSelect();
  }

  async function switchAccount() {
    logout();
    await signIn();
  }

  return (
    <AuthContext.Provider
      value={{ user, signIn, logout, switchAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
