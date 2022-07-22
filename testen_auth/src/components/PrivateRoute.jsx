import { useMemo } from 'react';
import { Redirect, Route, useLocation } from 'react-router';
import { useSession } from '../contexts/AuthProvider';

export default function PrivateRoute({ children, role, ...rest }) {
  const { isAuthed, hasRole } = useSession();
  const { pathname } = useLocation();

  const canShowRoute = useMemo(() => {
    if (!role) return isAuthed;
    return isAuthed && hasRole(role);
  }, [isAuthed, role, hasRole]);

  return (
    <Route {...rest}>
      {
        canShowRoute ? (
          children
        ) : (
          <Redirect from={pathname} to="/login" />
        )
      }
    </Route>
  );
}
