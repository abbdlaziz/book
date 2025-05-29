import {Box} from '@mui/material';
import type {ReactNode} from "react";

const PageContainer = ({ children }: { children: ReactNode }) => {
    return (
        <Box width="100%">
            {children}
        </Box>
    );
};

export default PageContainer;