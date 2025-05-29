import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {createAuthor} from "../services/authorService.ts";
import PageContainer from "../layout/PageContainer.tsx";
import {Box, Button, TextField, Typography} from "@mui/material";

const AuthorCreatePage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createAuthor({ name });
            navigate('/authors');
        } catch (err) {
            console.error('Failed to create author:', err);
        }
    };

    return (
        <PageContainer>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Button variant="outlined" onClick={() => navigate(-1)}>← Back</Button>
                <Typography variant="h5">➕ Add New Author</Typography>
            </Box>

            <Box
                component="form"
                onSubmit={handleSubmit}
                display="flex"
                flexDirection="column"
                gap={2}
                maxWidth={400}
            >
                <TextField
                    label="Author Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained">Save</Button>
                <Button variant="outlined" onClick={() => navigate('/authors')}>Cancel</Button>
            </Box>
        </PageContainer>
    );
};

export default AuthorCreatePage;