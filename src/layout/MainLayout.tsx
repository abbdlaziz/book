import type {ReactNode} from "react";
import {Box, Toolbar} from "@mui/material";
import Topbar from "./Topbar.tsx";
import Sidebar from "./Sidebar.tsx";

const MainLayout = ({children}: { children: ReactNode }) => {
    return (
        <Box sx={{display: 'flex'}}>
            {/* Top bar */}
            <Topbar/>

            {/* Sidebar */}
            <Sidebar/>

            {/* Main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    px: 3,
                    py: 2,
                    width: '100%',
                }}
            >
                {/* Ensures no vertical push */}
                <Toolbar sx={{height: '64px', mb: 2}}/> {/* Filler */}
                {children}
            </Box>
        </Box>
    );
};

export default MainLayout;