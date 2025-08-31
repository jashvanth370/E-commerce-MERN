// frontend/src/components/AuthButtons.jsx
import { useAuth0 } from "@auth0/auth0-react";

export default function AuthButtons() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <button onClick={() => loginWithRedirect()}>Log in</button>;
  }

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <span>
        {/* Display required profile fields per assignment */}
        <b>Username:</b> {user?.nickname || user?.preferred_username || user?.sub}<br/>
        <b>Name:</b> {user?.name}<br/>
        <b>Email:</b> {user?.email}<br/>
        <b>Phone:</b> {user?.phone_number || "—"}<br/>
        <b>Country:</b> {user?.address?.country || user?.locale || "—"}
      </span>
      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log out
      </button>
    </div>
  );
}
