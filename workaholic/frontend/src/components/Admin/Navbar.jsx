import { Box, IconButton, InputBase, Typography } from "@mui/material";
import {
  DarkModeOutlined,
  LightModeOutlined,
  NotificationsOutlined,
  PersonOutlined,
  SettingsOutlined,
  SearchOutlined,
} from "@mui/icons-material";

const NavbarAdmin = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="10px"
      bgcolor="#2f3136"
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="h6" color="white">
          Admin Dashboard
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          bgcolor="#4b4f56"
          borderRadius="5px"
          padding="5px"
        >
          <InputBase placeholder="Search..." sx={{ marginLeft: 2, color: "white" }} />
          <IconButton>
            <SearchOutlined sx={{ color: "white" }} />
          </IconButton>
        </Box>
      </Box>

      <Box>
        <IconButton>
          <NotificationsOutlined sx={{ color: "white" }} />
        </IconButton>
        <IconButton>
          <SettingsOutlined sx={{ color: "white" }} />
        </IconButton>
        <IconButton>
          <PersonOutlined sx={{ color: "white" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default NavbarAdmin;
