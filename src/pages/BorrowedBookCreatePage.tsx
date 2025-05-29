import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import type {Book, Member} from "../type";
import {getAllBooks} from "../services/bookService.ts";
import {getAllMembers} from "../services/memberService.ts";
import {createBorrowedBook} from "../services/borrowedService.ts";
import PageContainer from "../layout/PageContainer.tsx";
import {Box, Button, MenuItem, TextField, Typography} from "@mui/material";

const BorrowedBookCreatePage = () => {
    const navigate = useNavigate();

    const [bookId, setBookId] = useState('');
    const [memberId, setMemberId] = useState('');
    const [borrowDate, setBorrowDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    const [books, setBooks] = useState<Book[]>([]);
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        getAllBooks().then(setBooks).catch(err => console.error('Failed to load books', err));
        getAllMembers().then(setMembers).catch(err => console.error('Failed to load members', err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createBorrowedBook({
                bookId: Number(bookId),
                memberId: Number(memberId),
                borrowDate,
                returnDate
            });
            navigate('/borrowed-books');
        } catch (err) {
            console.error('Failed to create borrowed book:', err);
        }
    };

    return (
        <PageContainer>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Button variant="outlined" onClick={() => navigate(-1)}>← Back</Button>
                <Typography variant="h5">➕ Add Borrowed Book</Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2} maxWidth={400}>
                <TextField
                    select
                    label="Book"
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                    required
                >
                    {books.map(book => (
                        <MenuItem key={book.id} value={book.id}>
                            {book.title}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    label="Member"
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    required
                >
                    {members.map(member => (
                        <MenuItem key={member.id} value={member.id}>
                            {member.name}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    label="Borrow Date"
                    type="date"
                    value={borrowDate}
                    onChange={(e) => setBorrowDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                />

                <TextField
                    label="Return Date"
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                />

                <Button type="submit" variant="contained">Save</Button>
                <Button variant="outlined" onClick={() => navigate('/borrowed-books')}>Cancel</Button>
            </Box>
        </PageContainer>
    );
};

export default BorrowedBookCreatePage;