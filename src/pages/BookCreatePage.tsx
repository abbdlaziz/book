import {useNavigate} from 'react-router-dom';
import {Box, Button, TextField, Typography} from '@mui/material';
import PageContainer from "../layout/PageContainer.tsx";
import {useState} from "react";
import {createBook} from "../services/bookService.ts";

const BookCreatePage = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [year, setYear] = useState('');
    const [authorId, setAuthorId] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createBook({
                id: 0, // Not required by backend but exists in Book type
                title,
                category,
                publishingYear: Number(year),
                author: {
                    id: Number(authorId),
                    name: '' // Optional; backend doesn't use it for POST
                }
            });
            navigate('/books');
        } catch (err) {
            console.error('Failed to create book:', err);
        }
    };

    return (
        <PageContainer>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Button variant="outlined" color="inherit" onClick={() => navigate(-1)}>
                    ← Back
                </Button>
                <Typography variant="h5" gutterBottom>
                    ➕ Add New Book
                </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2} maxWidth={400}>
                <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} required/>
                <TextField label="Category" value={category} onChange={e => setCategory(e.target.value)} required/>
                <TextField label="Year" type="number" value={year} onChange={e => setYear(e.target.value)} required/>
                <TextField label="Author ID" type="number" value={authorId} onChange={e => setAuthorId(e.target.value)}
                           required/>
                <Button type="submit" variant="contained">Save</Button>
                <Button variant="outlined" onClick={() => navigate('/books')}>Cancel</Button>
            </Box>
        </PageContainer>
    );
};

export default BookCreatePage;