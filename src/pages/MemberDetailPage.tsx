import type {BorrowedBook, Member} from "../type";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import PageContainer from "../layout/PageContainer.tsx";
import {getMemberById} from "../services/memberService.ts";
import {useEffect, useState} from "react";
import {getAllBorrowedBooks} from "../services/borrowedService.ts";

const MemberDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const memberId = Number(id);

    const [member, setMember] = useState<Member | null>(null);
    const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);

    useEffect(() => {
        getMemberById(memberId)
            .then(setMember)
            .catch(err => console.error('Failed to fetch member', err));

        getAllBorrowedBooks()
            .then(all => setBorrowedBooks(all.filter(bb => bb.member.id === memberId)))
            .catch(err => console.error('Failed to fetch borrowed books', err));
    }, [memberId]);

    if (!member) return <Typography>Member not found</Typography>;

    return (
        <PageContainer>
            {/* Member Info Header */}
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                <Box display="flex" alignItems="center" gap={2}>
                    <Button variant="outlined" onClick={() => navigate(-1)}>← Back</Button>
                    <Typography variant="h5">👤 Member Details</Typography>
                </Box>
                <Button variant="contained" onClick={() => navigate(`/members/edit/${member.id}`)}>
                    Edit Member
                </Button>
            </Box>

            {/* Member Info */}
            <Box mb={4}>
                <Typography><strong>Name:</strong> {member.name}</Typography>
                <Typography><strong>Email:</strong> {member.email}</Typography>
                <Typography><strong>Phone:</strong> {member.phone}</Typography>
            </Box>

            {/* Borrowed Books Table */}
            <Typography variant="h6" gutterBottom>📚 Borrowed Books</Typography>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Book</TableCell>
                            <TableCell>Borrow Date</TableCell>
                            <TableCell>Return Date</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {borrowedBooks.map((bb) => (
                            <TableRow key={bb.id}>
                                <TableCell>{bb.book.title}</TableCell>
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

export default MemberDetailPage;