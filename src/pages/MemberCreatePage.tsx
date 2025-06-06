import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {createMember} from "../services/memberService.ts";
import PageContainer from "../layout/PageContainer.tsx";
import {Box, Button, TextField, Typography} from "@mui/material";

const MemberCreatePage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createMember({name, email, phone});
            navigate('/members');
        } catch (err) {
            console.error('Failed to create member:', err);
        }
    };

    return (
        <PageContainer>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Button variant="outlined" onClick={() => navigate(-1)}>← Back</Button>
                <Typography variant="h5">➕ Add New Member</Typography>
            </Box>

            <Box
                component="form"
                onSubmit={handleSubmit}
                display="flex"
                flexDirection="column"
                gap={2}
                maxWidth={400}
            >
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
                <Button type="submit" variant="contained">Save</Button>
                <Button variant="outlined" onClick={() => navigate('/members')}>Cancel</Button>
            </Box>
        </PageContainer>
    );
};

export default MemberCreatePage;