import logo from './logo.svg';
import { BrowserRouter as Router, Route } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage"
import HomePage from "./components/HomePage";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./Auth";

function App() {
  return (
    <AuthProvider>
      <Router>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route exact path="/signup" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
      </Router>
    </AuthProvider>
  );
}

export default App;
