"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Icon from "./Icon";

export default function ProfileButton() {
  const { user, signIn, logout, switchAccount } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const clientId =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div className="profile-wrapper" ref={ref}>
      {/* PROFILE ICON / AVATAR */}
          <button
          className={`profile-button ${user ? "has-avatar" : "no-avatar"}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Profile menu"
          >

        {user ? (
          <img
            src={user.picture}
            alt={user.name}
            className="profile-avatar"
          />
        ) : (
          <Icon name="user" />
        )}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="profile-dropdown">
          {!user ? (
            <>
              <button
                className="profile-action"
                onClick={() => {
                  setOpen(false);
                  if (clientId) signIn(false);
                }}
              >
                Sign in with Google
              </button>

              {!clientId && (
                <p className="profile-hint">
                  Sign-in coming soon
                </p>
              )}
            </>
          ) : (
            <>
              <div className="profile-user">
                <strong>{user.name}</strong>
                <span>{user.email}</span>
              </div>

              <button
                className="profile-action"
                onClick={() => {
                  setOpen(false);
                  switchAccount();
                }}
              >
                Change account
              </button>

              <button
                className="profile-action danger"
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
