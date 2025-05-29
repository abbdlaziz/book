import {Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar} from "@mui/material";
import {NavLink} from "react-router-dom";

const Sidebar = () => {
    const navItems = [
        { label: 'Books', path: '/books' },
        { label: 'Authors', path: '/authors' },
        { label: 'Members', path: '/members' },
        { label: 'Borrowed Books', path: '/borrowed' },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: 240,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Toolbar />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.path} disablePadding>
                        <ListItemButton component={NavLink} to={item.path}>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;