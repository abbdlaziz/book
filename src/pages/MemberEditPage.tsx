import {useNavigate, useParams} from "react-router-dom";
import {getMemberById, updateMember} from "../services/memberService.ts";
import {useEffect, useState} from "react";
import PageContainer from "../layout/PageContainer.tsx";
import {Box, Button, TextField, Typography} from "@mui/material";

const MemberEditPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if (id) {
            getMemberById(Number(id))
                .then(member => {
                    setName(member.name);
                    setEmail(member.email);
                    setPhone(member.phone);
                })
                .catch(err => {
                    console.error('Failed to fetch member', err);
                });
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateMember(Number(id), { name, email, phone });
            navigate('/members');
        } catch (err) {
            console.error('Failed to update member', err);
        }
    };

    return (
        <PageContainer>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Button variant="outlined" onClick={() => navigate(-1)}>← Back</Button>
                <Typography variant="h5">✏️ Edit Member</Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2} maxWidth={400}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    label="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained">Update</Button>
                <Button variant="outlined" onClick={() => navigate('/members')}>Cancel</Button>
            </Box>
        </PageContainer>
    );
};

export default MemberEditPage;