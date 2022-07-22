import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Places from "./pages/Places";
import { TransactionsProvider } from "./contexts/TransactionsProvider";
import TransactionForm from "./pages/TransactionForm";
import Transactions from "./pages/Transactions";
import { PlacesProvider } from "./contexts/PlacesProvider";
import NavMenu from "./components/NavMenu";
import { AuthProvider } from "./contexts/AuthProvider";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <PlacesProvider>
        <TransactionsProvider>
          <Router>
            <NavMenu />
            <Switch>
              <Route path="/" exact>
                <Redirect to="/transactions" />
              </Route>

              <PrivateRoute path="/transactions" exact>
                <Transactions />
              </PrivateRoute>

              <PrivateRoute path="/transactions/add" exact>
                <TransactionForm />
              </PrivateRoute>

              <PrivateRoute path="/transactions/edit/:id" exact>
                <TransactionForm />
              </PrivateRoute>

              <PrivateRoute path="/places">
                <Places />
              </PrivateRoute>

              <Route path="/login">
                <Login />
              </Route>

              <Route path="/register">
                <Register />
              </Route>
            </Switch>
          </Router>
        </TransactionsProvider>
      </PlacesProvider>
    </AuthProvider>
  );
}

export default App;
