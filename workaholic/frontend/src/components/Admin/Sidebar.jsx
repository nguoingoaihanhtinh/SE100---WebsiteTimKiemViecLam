import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { Avatar, Box, Typography, IconButton } from "@mui/material";
import {
  DashboardOutlined,
  PeopleAltOutlined,
  ContactsOutlined,
  BarChartOutlined,
  ReceiptOutlined,
  TimelineOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import logo from "../../assets/react.svg"; // Thay bằng logo của bạn

const SidebarAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { title: "Dashboard", path: "/admin/dashboard", icon: <DashboardOutlined /> },
    { title: "Manage Companies", path: "/admin/companies", icon: <PeopleAltOutlined /> },
    { title: "Manage Users", path: "/admin/users", icon: <ContactsOutlined /> },
    { title: "Manage Jobs", path: "/admin/jobs", icon: <BarChartOutlined /> },
    { title: "Applications", path: "/admin/applications", icon: <ReceiptOutlined /> },
    { title: "Reports", path: "/admin/reports", icon: <TimelineOutlined /> },
  ];

  return (
    <Sidebar collapsed={collapsed} backgroundColor="#2f3136">
      <Menu>
        <MenuItem>
          <Box display="flex" alignItems="center" justifyContent="space-between" p="10px">
            {!collapsed && (
              <Box display="flex" alignItems="center">
                <Avatar src={logo} alt="Logo" sx={{ marginRight: "10px" }} />
                <Typography variant="h5" color="white">
                  Admin Portal
                </Typography>
              </Box>
            )}
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? ">" : "<"}
            </IconButton>
          </Box>
        </MenuItem>

        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            component={<Link to={item.path} />}
            icon={item.icon}
            active={location.pathname === item.path}
          >
            {!collapsed && item.title}
          </MenuItem>
        ))}
      </Menu>
    </Sidebar>
  );
};

export default SidebarAdmin;
