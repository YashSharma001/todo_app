import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./components/Home";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./index";

function App() {

  const {setUser, setIsAuthenticated, setLoading } = useContext(Context)

  useEffect(() => {
    setLoading(true)

    axios.get(`${server}/users/me`,
      {
        withCredentials: true
      }).then((res) => {
        setUser(res.data.user)
        setIsAuthenticated(true)
        setLoading(false)
      }).catch((error) => {
        setUser({})
        setIsAuthenticated(false)
        setLoading(false)
      })
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </>
  );
}

export default App;
