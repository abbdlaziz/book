import {Typography} from "@mui/material";

const PageTitle = ({ emoji, text }: { emoji: string; text: string }) => {
    return (
        <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center" gap={1} gutterBottom>
            <span>{emoji}</span> {text}
        </Typography>
    );
};

export default PageTitle;