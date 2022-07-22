import { NavLink } from "react-router-dom";
import { useCallback } from "react/cjs/react.development";
import { useLogout, useSession } from "../contexts/AuthProvider";

const NavItem = ({
  to,
  label,
}) => (
  <span>
    <NavLink
      to={to}
      className="hover:text-blue-500"
      activeClassName="text-blue-500-cursor-default">
      {label}
    </NavLink>
  </span>
);

export default function NavMenu() {
  const { isAuthed, user } = useSession();
  const logout = useLogout();

  const handleLogout = useCallback(() => {
    logout()
  }, [logout]);
  return (
    <div className="mb-6">
      <nav className="flex space-x-6">
        <NavItem to="/transactions" label="Transactions" />
        <NavItem to="/places" label="Places" />
        <div className="flex-1">
          {
            isAuthed ? (
              <>
                <span>{user ? user.name : 'geen user'}</span>
                <button onClick={handleLogout}>Sign out</button>
              </>
            ) : (
              <>
                <NavItem to="/login" label="Sign in" />
                <NavItem to="/register" label="Register" />

              </>
            )
          }
        </div>
      </nav>

    </div>
  )
}
