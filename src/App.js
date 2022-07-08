import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./components/views/Login";
import Register from "./components/views/Register";
import Forgot from "./components/views/Forgot";
import Dashboard from "./components/views/Dashboard/Dashboard";
import AddProject from "./components/views/Dashboard/AddProject";
import ChangeRole from "./components/views/Dashboard/ChangeRole";


const Auth = () => {
const token = window.localStorage.getItem("token");
  if (!token) {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgot-password" component={Forgot} />
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    );
  } else {
    return (
      <Router>
        <Switch>
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/AddProject" component={AddProject} />
          <Route path="/ChangeRole" component={ChangeRole} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </Router>
    );
  }
}

export default Auth;
