import { useAuth0} from '@auth0/auth0-react';
onst AuthenticationButton = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0 ();

  return (
    isAuthenticated ? (
      <button onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </button>
    ) : (
      <button onClick={() => loginWithRedirect()}>
        Log In
      </button>
    )
  );
};

export default AuthenticationButton;