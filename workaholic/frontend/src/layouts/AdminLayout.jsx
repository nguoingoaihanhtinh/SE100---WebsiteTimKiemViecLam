import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/Admin/Sidebar";
import NavbarAdmin from "../components/Admin/Navbar";

const AdminLayout = () => {
  return (
    <Box display="flex" height="100vh">
      <SidebarAdmin />
      <Box flex={1} display="flex" flexDirection="column">
        <NavbarAdmin />
        <Box flex={1} bgcolor="#f4f5f7" overflow="auto" padding="20px">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
