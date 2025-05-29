import type {Author} from "../type";
import PageContainer from "../layout/PageContainer.tsx";
import PageTitle from "../layout/PageTitle.tsx";
import {Box, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAllAuthors} from "../services/authorService.ts";

const AuthorsPage = () => {
    const navigate = useNavigate();
    const [authors, setAuthors] = useState<Author[]>([]);

    useEffect(() => {
        getAllAuthors()
            .then(setAuthors)
            .catch((err) => {
                console.error('Failed to fetch authors:', err);
            });
    }, []);

    return (
        <PageContainer>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <PageTitle emoji="✍️" text="Author List" />
                <Button variant="contained" onClick={() => navigate('/authors/create')}>
                    Add Author
                </Button>
            </Box>

            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {authors.map((author) => (
                            <TableRow
                                key={author.id}
                                hover
                                onClick={() => navigate(`/authors/${author.id}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <TableCell>{author.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </PageContainer>
    );
};

export default AuthorsPage;