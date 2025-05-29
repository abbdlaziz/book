import type {Author, Book} from "../type";
import {useNavigate, useParams} from "react-router-dom";
import {
    Box,
    Button,
    Dialog, DialogActions, DialogContent,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import PageContainer from "../layout/PageContainer";
import {useEffect, useState} from "react";
import {getAllAuthors} from "../services/authorService.ts";
import {deleteBook, getAllBooks} from "../services/bookService.ts";

const AuthorDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const authorId = Number(id);

    const [author, setAuthor] = useState<Author | null>(null);
    const [books, setBooks] = useState<Book[]>([]);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    useEffect(() => {
        getAllAuthors()
            .then(allAuthors => {
                const found = allAuthors.find(a => a.id === authorId);
                if (found) setAuthor(found);
                else console.warn('Author not found');
            })
            .catch(err => console.error('Failed to fetch author', err));

        getAllBooks()
            .then(setBooks)
            .catch(err => console.error('Failed to fetch books', err));
    }, [authorId]);

    const authoredBooks = books.filter(book => book.author.id === authorId);

    const handleDelete = async (bookId: number) => {
        try {
            await deleteBook(bookId);
            setBooks(prev => prev.filter(book => book.id !== bookId));
        } catch (err) {
            console.error('Failed to delete book:', err);
        }
        setDeleteId(null);
    };

    if (!author) return <Typography>Author not found</Typography>;

    return (
        <PageContainer>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Button variant="outlined" onClick={() => navigate(-1)}>← Back</Button>
                <Typography variant="h5">📘 {author.name}'s Books</Typography>
            </Box>

            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Year</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {authoredBooks.map((book) => (
                            <TableRow key={book.id}>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.category}</TableCell>
                                <TableCell>{book.publishingYear}</TableCell>
                                <TableCell align="right">
                                    <Button size="small" onClick={() => navigate(`/books/edit/${book.id}`)}>Edit</Button>
                                    <Button size="small" color="error" onClick={() => setDeleteId(book.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <Dialog open={deleteId !== null} onClose={() => setDeleteId(null)}>
                <DialogTitle>Delete Book</DialogTitle>
                <DialogContent>Are you sure you want to delete this book?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteId(null)}>Cancel</Button>
                    <Button onClick={() => deleteId !== null && handleDelete(deleteId)} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </PageContainer>
    );
};

export default AuthorDetailPage;