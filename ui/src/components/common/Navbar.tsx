import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { Logout } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { clearCookies } from "../../services/cookie-handler";
import { getUserEmail, getUserName } from "../../services/identity";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    clearCookies();
    handleClose();
    navigate("/login");
  };

  useEffect(() => {
    setUserName(getUserName());
    setUserEmail(getUserEmail());
  }, []);

  return (
    <>
      <Stack
        sx={{
          height: "60px",
          bgcolor: "teal",
          textAlign: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          px: "45px",
        }}
      >
        <Box />
        <Typography
          sx={{ fontSize: "1.5rem", fontWeight: "700", color: "white" }}
        >
          Welcome
        </Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {userName?.charAt(0)}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Stack>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {userName && <MenuItem>{userName}</MenuItem>}
        {userEmail && <MenuItem>{userEmail}</MenuItem>}
        <Divider />
        <MenuItem onClick={logoutHandler}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;
