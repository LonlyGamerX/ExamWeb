import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

// Components
import Navigation from "./components/Navigation";
import AdminNavigation from "./components/AdminNavigation";
import LoginNavigation from "./components/LoginNavigation";
import Logout from "./components/Logout";
import Footer from "./components/Footer";

// Error
import NotLoggedIn from "./pages/Errors/NotLoggedIn";
import Error404 from "./pages/Errors/Error404";
import NotAdmin from "./pages/Errors/NotAdmin";

// Pages
import Home from "./pages/Home";
import Service from "./pages/Service";
import Feature from "./pages/Feature";
import LoginUser from "./pages/LoginUser";

// Admin pages
import Users from "./pages/admin/Users";
import Dashboard from "./pages/admin/Dashboard";
import EditTreatmentPage from "./pages/admin/EditTreatmentPage";
import DeleteTreatmentPage from "./pages/admin/DeleteTreatmentPage";

function App() {
  const admin = Cookies.get("admin");
  const logIn = Cookies.get("user");
  const [user, setUser] = useState(logIn);
  const [IsAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    if (!logIn) {
      setUser(false);
    }

    if (!admin) {
      setIsAdmin(false);
    }
  }, [admin, logIn]);

  return (
    <>
      <Router>
        {IsAdmin ? (
          <AdminNavigation />
        ) : user ? (
          <LoginNavigation />
        ) : (
          <Navigation />
        )}
        <section>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/service" element={<Service />} />
            <Route path="/feature" element={<Feature />} />
            {/* Admin Sites */}
            <Route
              path="/login"
              element={<LoginUser setUser={setUser} setIsAdmin={setIsAdmin} />}
            />
            <Route path="/logout" element={<Logout />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route
              path="/admin/editTreatments"
              element={<EditTreatmentPage />}
            />
            <Route
              path="/admin/deleteTreatments"
              element={<DeleteTreatmentPage />}
            />
            {/* Error Page */}
            <Route path="/notAdmin" element={<NotAdmin />} />\
            <Route path="/notlogin" element={<NotLoggedIn />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </section>
        <Footer />
      </Router>
    </>
  );
}

export default App;
