import {useParams, useNavigate} from 'react-router-dom';
import {Box, Button, TextField, Typography} from '@mui/material';
import {useEffect, useState} from "react";
import PageContainer from '../layout/PageContainer';
import {getBookById, updateBook} from "../services/bookService.ts";
import type {Book} from "../type";

const BookEditPage = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [year, setYear] = useState('');
    const [authorId, setAuthorId] = useState<number>(0);
    const [authorName, setAuthorName] = useState('');

    useEffect(() => {
        if (id) {
            getBookById(Number(id))
                .then((book: Book) => {
                    setTitle(book.title);
                    setCategory(book.category);
                    setYear(book.publishingYear.toString());
                    setAuthorId(book.author.id);
                    setAuthorName(book.author.name);
                })
                .catch(err => {
                    console.error('Failed to fetch book:', err);
                });
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedBook: Book = {
            id: Number(id),
            title,
            category,
            publishingYear: Number(year),
            author: {
                id: authorId,
                name: authorName
            }
        };

        try {
            await updateBook(updatedBook.id, updatedBook);
            navigate('/books');
        } catch (err) {
            console.error('Failed to update book:', err);
        }
    };

    return (
        <PageContainer>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Button variant="outlined" color="inherit" onClick={() => navigate(-1)}>
                    ← Back
                </Button>
                <Typography variant="h5" gutterBottom>
                    ✏️ Edit Book
                </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2} maxWidth={400}>
                <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} required/>
                <TextField label="Category" value={category} onChange={e => setCategory(e.target.value)} required/>
                <TextField label="Year" value={year} onChange={e => setYear(e.target.value)} required/>
                <TextField label="Author Name" value={authorName} onChange={e => setAuthorName(e.target.value)}
                           required/>
                <Button type="submit" variant="contained">Update</Button>
                <Button variant="outlined" onClick={() => navigate('/books')}>Cancel</Button>
            </Box>
        </PageContainer>
    );
};

export default BookEditPage;