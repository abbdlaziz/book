import {AppBar, Toolbar, Typography} from "@mui/material";

const Topbar = () => {
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography variant="h6">📚 Library Management</Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;