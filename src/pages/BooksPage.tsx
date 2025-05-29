import {
    Box,
    Button,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper, Dialog, DialogTitle, DialogContent, DialogContentText,
    DialogActions,
} from '@mui/material';
import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import PageContainer from "../layout/PageContainer.tsx";
import PageTitle from "../layout/PageTitle.tsx";
import {deleteBook, getAllBooks} from "../services/bookService.ts";
import type {Book} from "../type";

const BooksPage = () => {
    const navigate = useNavigate();

    const [books, setBooks] = useState<Book[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

    useEffect(() => {
        getAllBooks()
            .then(setBooks)
            .catch(err => {
                console.error('Failed to fetch books:', err);
            });
    }, []);

    return (
        <PageContainer>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} sx={{width: '100%'}}>
                <PageTitle emoji="📚" text="Book Management"/>
                <Button variant="contained" onClick={() => navigate('/books/create')}>
                    Add Book
                </Button>
            </Box>

            <Paper sx={{width: '100%'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Year</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map(book => (
                            <TableRow key={book.id}>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.category}</TableCell>
                                <TableCell>{book.publishingYear}</TableCell>
                                <TableCell>{book.author.name}</TableCell>
                                <TableCell align="right">
                                    <Button size="small"
                                            onClick={() => navigate(`/books/edit/${book.id}`)}>Edit</Button>
                                    <Button
                                        size="small"
                                        color="error"
                                        onClick={() => {
                                            setSelectedBookId(book.id);
                                            setOpenDialog(true);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this book? This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button
                            onClick={async () => {
                                if (selectedBookId !== null) {
                                    try {
                                        await deleteBook(selectedBookId);
                                        setBooks(prev => prev.filter(book => book.id !== selectedBookId));
                                    } catch (err) {
                                        console.error('Failed to delete book:', err);
                                    }
                                }
                                setOpenDialog(false);
                            }}
                            color="error"
                        >
                            Delete
                        </Button>

                    </DialogActions>
                </Dialog>
            </Paper>
        </PageContainer>
    );
};

export default BooksPage;