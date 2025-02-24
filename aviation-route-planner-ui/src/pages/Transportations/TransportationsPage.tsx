import { useEffect, useState } from "react";
import { getTransportations, getLocations, createTransportation, updateTransportation, deleteTransportation } from "../../api/api";
import { Transportation, Location, TransportationType, DaysOfWeek } from "../../types/entities";
import {
    Container,
    Typography,
    TextField,
    Select,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    Checkbox,
    ListItemText,
    Box,
    Chip,
    Paper,
    Stack,
    Card,
    CardContent,
    IconButton,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function TransportationsPage() {
    const [transportations, setTransportations] = useState<Transportation[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editTransportation, setEditTransportation] = useState<Transportation | null>(null);
    const [newTransportation, setNewTransportation] = useState({
        originId: "",
        destinationId: "",
        transportationType: "",
        transportationDays: [] as DaysOfWeek[]
    });

    const daysOfWeek = Object.values(DaysOfWeek);

    useEffect(() => {
        loadTransportations();
        loadLocations();
    }, []);

    const loadTransportations = () => {
        getTransportations().then(setTransportations).catch(console.error);
    };

    const loadLocations = () => {
        getLocations().then(setLocations).catch(console.error);
    };

    const handleCreate = async () => {
        try {
            const body = {originId: parseInt(newTransportation.originId),
                destinationId: parseInt(newTransportation.destinationId),
                transportationType: newTransportation.transportationType,
                transportationDays: newTransportation.transportationDays
            };
            await createTransportation(body);
            setNewTransportation({ originId: "", destinationId: "", transportationType: "", transportationDays: [] });
            loadTransportations();
        } catch (error) {
            console.error("Failed to create transportation:", error);
        }
    };

    const handleUpdate = async (id: number) => {
        if (!editTransportation) return;
        try {
            console.log(id);
            const body = {
                originId: editTransportation.origin.id,
                destinationId: editTransportation.destination.id,
                transportationType: editTransportation.transportationType,
                transportationDays: editTransportation.transportationDays
            };
            await updateTransportation(id, body);
            setEditTransportation(null);
            loadTransportations();
        } catch (error) {
            console.error("Failed to update transportation:", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this transportation?")) return;
        try {
            await deleteTransportation(id);
            loadTransportations();
        } catch (error) {
            console.error("Failed to delete transportation:", error);
        }
    };

    const filteredTransportations = transportations.filter(t =>
        t.origin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.transportationType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
            Transportations
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
                Add New Transportation
            </Typography>
            <Stack spacing={2}>
                <FormControl fullWidth>
                    <InputLabel id="origin-label">Origin</InputLabel>
                    <Select
                        labelId="origin-label"
                        value={newTransportation.originId}
                        onChange={(e) => setNewTransportation({ ...newTransportation, originId: e.target.value })}
                        input={<OutlinedInput label="Origin" />}
                    >
                        {locations.map(loc => (
                            <MenuItem key={loc.id} value={loc.id}>
                                {loc.name} ({loc.locationCode})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="destination-label">Destination</InputLabel>
                    <Select
                        labelId="destination-label"
                        value={newTransportation.destinationId}
                        onChange={(e) => setNewTransportation({ ...newTransportation, destinationId: e.target.value })}
                        input={<OutlinedInput label="Destination" />}
                    >
                        {locations.map(loc => (
                            <MenuItem key={loc.id} value={loc.id}>
                                {loc.name} ({loc.locationCode})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="transportation-type-label">Type</InputLabel>
                    <Select
                        labelId="transportation-type-label"
                        value={newTransportation.transportationType}
                        onChange={(e) => setNewTransportation({ ...newTransportation, transportationType: e.target.value })}
                        input={<OutlinedInput label="Type" />}
                    >
                        {Object.values(TransportationType).map(type => (
                            <MenuItem key={type} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="days-label">Operating Days</InputLabel>
                    <Select
                        labelId="days-label"
                        multiple
                        value={newTransportation.transportationDays}
                        onChange={(e) => {
                            const selectedDays = typeof e.target.value === 'string' 
                                ? e.target.value.split(',') 
                                : e.target.value;
                            setNewTransportation({ 
                                ...newTransportation, 
                                transportationDays: selectedDays as DaysOfWeek[] 
                            });
                        }}
                        input={<OutlinedInput label="Operating Days" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} size="small" />
                                ))}
                            </Box>
                        )}
                    >
                        {daysOfWeek.map(day => (
                            <MenuItem key={day} value={day}>
                                <Checkbox checked={newTransportation.transportationDays.indexOf(day) > -1} />
                                <ListItemText primary={day} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button 
                    variant="contained" 
                    onClick={handleCreate}
                    sx={{ mt: 2 }}
                >
                    Add Transportation
                </Button>
            </Stack>
        </Paper>

        <Box sx={{ mb: 3 }}>
            <TextField
                label="Search transportations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
            />
        </Box>

        <Stack spacing={2}>
            {filteredTransportations.map((t) => (
                <Card key={t.id}>
                    <CardContent>
                        {editTransportation?.id === t.id ? (
                            <Stack spacing={2}>
                                <FormControl fullWidth>
                                    <InputLabel>Origin</InputLabel>
                                    <Select
                                        value={editTransportation.origin.id}
                                        onChange={(e) => setEditTransportation({
                                            ...editTransportation,
                                            origin: locations.find(l => l.id === e.target.value) || editTransportation.origin
                                        })}
                                        input={<OutlinedInput label="Origin" />}
                                    >
                                        {locations.map(loc => (
                                            <MenuItem key={loc.id} value={loc.id}>
                                                {loc.name} ({loc.locationCode})
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="edit-destination-label">Select Destination</InputLabel>
                                    <Select
                                        labelId="edit-destination-label"
                                        value={editTransportation.destination.id}
                                        onChange={(e) => setEditTransportation({
                                            ...editTransportation,
                                            destination: locations.find(l => l.id === e.target.value) || editTransportation.destination
                                        })}
                                        input={<OutlinedInput label="Select Destination" />}
                                    >
                                        {locations.map(loc => (
                                            <MenuItem key={loc.id} value={loc.id}>
                                                {loc.name} ({loc.locationCode})
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="edit-transportation-type-label">Select Transportation Type</InputLabel>
                                    <Select
                                        labelId="edit-transportation-type-label"
                                        value={editTransportation.transportationType}
                                        onChange={(e) => setEditTransportation({
                                            ...editTransportation,
                                            transportationType: (e.target.value as TransportationType)
                                        })}
                                        input={<OutlinedInput label="Select Transportation Type" />}
                                    >
                                        {Object.values(TransportationType).map(type => (
                                            <MenuItem key={type} value={type}>
                                                {type}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="edit-days-label">Select Operating Days</InputLabel>
                                    <Select
                                        labelId="edit-days-label"
                                        multiple
                                        value={editTransportation.transportationDays}
                                        onChange={(e) => {
                                            const selectedDays = Array.from(e.target.value).map((day) => day as DaysOfWeek);
                                            setEditTransportation({ ...editTransportation, transportationDays: selectedDays });
                                        }}
                                        input={<OutlinedInput label="Select Operating Days" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {daysOfWeek.map(day => (
                                            <MenuItem key={day} value={day}>
                                                <Checkbox checked={editTransportation.transportationDays.indexOf(day) > -1} />
                                                <ListItemText primary={day} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                        <Button
                                            variant="contained"
                                            startIcon={<SaveIcon />}
                                            onClick={() => handleUpdate(t.id)}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            startIcon={<CancelIcon />}
                                            onClick={() => setEditTransportation(null)}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                </Stack>
                            ) : (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Stack spacing={1}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant="body1">
                                                {t.origin.name} ({t.origin.locationCode})
                                            </Typography>
                                            <ArrowForwardIcon sx={{ mx: 1 }} />
                                            <Typography variant="body1">
                                                {t.destination.name} ({t.destination.locationCode})
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Chip 
                                                label={t.transportationType} 
                                                size="small" 
                                                color="primary" 
                                                variant="outlined"
                                            />
                                            {t.transportationDays.map(day => (
                                                <Chip 
                                                    key={day} 
                                                    label={day} 
                                                    size="small" 
                                                    variant="outlined"
                                                />
                                            ))}
                                        </Box>
                                    </Stack>
                                    <Box>
                                        <IconButton 
                                            color="primary" 
                                            onClick={() => setEditTransportation(t)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton 
                                            color="error" 
                                            onClick={() => handleDelete(t.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Container>
    );
}

export default TransportationsPage;