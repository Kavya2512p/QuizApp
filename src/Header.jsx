import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Drawer, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Header = ({ user, logoutUser, navigator }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setIsDrawerOpen(open);
    };

    const menuItems = user == null ? [
        { text: "Home", link: "/" },
        { text: "Login", link: "/login" },
        { text: "Register", link: "/signup" },
    ] : [
        { text: "Home", link: "/" },
        { text: "Play", link: "/play" },
        { text: "Logout", action: () => { logoutUser(); navigator("/"); } },
    ];

    return (
        <div>
            <AppBar position="static" style={{ backgroundColor: "#333" }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            fontFamily: "'Poppins', sans-serif",
                            color: 'orange',
                            fontWeight: 'bold',
                            letterSpacing: '1px',
                        }}
                    >
                        Quizzer
                    </Typography>

                    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                        <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {menuItems.map((item, index) => (
                            item.action ? (
                                <Button
                                    key={index}
                                    color="inherit"
                                    style={{ marginRight: "10px" }}
                                    onClick={item.action}
                                >
                                    {item.text}
                                </Button>
                            ) : (
                                <Link to={item.link} key={index}>
                                    <Button
                                        color="inherit"
                                        style={{
                                            marginRight: "10px",
                                            backgroundColor: item.text === "Register" || item.text === "Play" ? "#FF5722" : "transparent",
                                            color: item.text === "Register" || item.text === "Play" ? "#fff" : "inherit",
                                        }}
                                        variant={item.text === "Register" || item.text === "Play" ? "contained" : "text"}
                                    >
                                        {item.text}
                                    </Button>
                                </Link>
                            )
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        {menuItems.map((item, index) => (
                            <ListItem button key={index} onClick={item.action}>
                                {item.action ? (
                                    <ListItemText primary={item.text} />
                                ) : (
                                    <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <ListItemText primary={item.text} />
                                    </Link>
                                )}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </div>
    );
};

export default Header;

