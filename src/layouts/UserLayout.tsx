import { Outlet } from "react-router-dom";
import Header from "../components/HeaderAndFooter/Header";
import Footer from "../components/HeaderAndFooter/Footer";

const UserLayout = () => {
  return (
    <>
      <Header />
      {/* <Outlet /> chính là nơi các component con sẽ được render */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;