import type {BorrowedBook} from "../type";
import PageContainer from "../layout/PageContainer.tsx";
import PageTitle from "../layout/PageTitle.tsx";
import {Box, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAllBorrowedBooks} from "../services/borrowedService.ts";

const BorrowedBooksPage = () => {
    const navigate = useNavigate();
    const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);

    useEffect(() => {
        getAllBorrowedBooks()
            .then(setBorrowedBooks)
            .catch(err => console.error('Failed to fetch borrowed books:', err));
    }, []);

    return (
        <PageContainer>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <PageTitle emoji="📖" text="Borrowed Books" />
                <Button variant="contained" onClick={() => navigate('/borrowed-books/create')}>
                    Add Borrowed Book
                </Button>
            </Box>

            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Book</TableCell>
                            <TableCell>Member</TableCell>
                            <TableCell>Borrow Date</TableCell>
                            <TableCell>Return Date</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {borrowedBooks.map((bb) => (
                            <TableRow key={bb.id}>
                                <TableCell>{bb.book.title}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="text"
                                        onClick={() => navigate(`/members/${bb.member.id}`)}
                                    >
                                        {bb.member.name}
                                    </Button>
                                </TableCell>
                                <TableCell>{bb.borrowDate}</TableCell>
                                <TableCell>{bb.returnDate}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        size="small"
                                        onClick={() => navigate(`/borrowed-books/edit/${bb.id}`)}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </PageContainer>
    );
};

export default BorrowedBooksPage;