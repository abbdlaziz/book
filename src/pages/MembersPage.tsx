import type {Member} from "../type";
import PageContainer from "../layout/PageContainer.tsx";
import PageTitle from "../layout/PageTitle.tsx";
import {Box, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import {getAllMembers} from "../services/memberService.ts";

const MembersPage = () => {
    const navigate = useNavigate();
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        getAllMembers()
            .then(setMembers)
            .catch((err) => {
                console.error('Failed to fetch members:', err);
            });
    }, []);

    return (
        <PageContainer>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <PageTitle emoji="👥" text="Member List" />
                <Button variant="contained" onClick={() => navigate('/members/create')}>
                    Add Member
                </Button>
            </Box>

            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {members.map((m) => (
                            <TableRow key={m.id}>
                                <TableCell>{m.name}</TableCell>
                                <TableCell>{m.email}</TableCell>
                                <TableCell>{m.phone}</TableCell>
                                <TableCell align="right">
                                    <Button size="small" onClick={() => navigate(`/members/${m.id}`)}>
                                        View Detail
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

export default MembersPage;