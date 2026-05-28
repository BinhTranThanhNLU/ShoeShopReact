import { Outlet } from "react-router-dom";
import Header from "../components/HeaderAndFooter/Header";
import Footer from "../components/HeaderAndFooter/Footer";
import { AuthProvider } from "../context/AuthContext";

const UserLayout = () => {
  return (
    <AuthProvider>
      <Header />
      {/* <Outlet /> chính là nơi các component con sẽ được render */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </AuthProvider>
  );
};

export default UserLayout;