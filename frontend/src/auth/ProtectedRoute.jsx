import {
  Navigate,
} from "react-router-dom";

import {
  useAuth,
} from "./AuthContext";

function ProtectedRoute({
  children,
}) {

  const {
    user,
    loading,
  } = useAuth();

  /* WAIT FOR AUTH CHECK */

  if (loading) {

    return null;

  }

  /* NOT LOGGED IN */

  if (!user) {

    return (

      <Navigate
        to="/login"
        replace
      />

    );

  }

  /* AUTHORIZED */

  return children;

}

export default ProtectedRoute;