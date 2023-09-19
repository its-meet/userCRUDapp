import { useContext } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Signup from "./components/Signup/Signup.jsx";
import Login from "./components/Login/Login.jsx";
import AllUsers from "./components/All Users/AllUsers.jsx";
import UserSettings from "./components/User Settings/UserSettings.jsx";

import { Context } from "./Context/Context.jsx";

function App() {
  const { user } = useContext(Context);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="users" element={user ? <AllUsers /> : <Signup />} />
        <Route path="settings" element={user ? <UserSettings /> : <Signup />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
