import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeaderAndSidebar/AdminHeader";
import AdminSidebar from "../components/AdminHeaderAndSidebar/AdminSidebar";
import "../assets/css/admin.css";


const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`admin-layout ${collapsed ? "admin-layout--collapsed" : ""}`}>
      <AdminSidebar collapsed={collapsed} />
      <div className="admin-layout__main">
        <AdminHeader
          onToggleSidebar={() => setCollapsed((c) => !c)}
          sidebarCollapsed={collapsed}
        />
        <main className="admin-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
