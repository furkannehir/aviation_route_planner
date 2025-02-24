import { useEffect, useState } from "react";
import { getLocations, createLocation, updateLocation, deleteLocation } from "../../api/api";
import { Location } from "../../types/entities";
import {
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Box,
    Stack,
    Card,
    CardContent,
    IconButton,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

function LocationsPage() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editLocation, setEditLocation] = useState<Location | null>(null);
    const [newLocation, setNewLocation] = useState({
        name: "",
        city: "",
        country: "",
        locationCode: ""
    });

    useEffect(() => {
        loadLocations();
    }, []);

    const loadLocations = () => {
        getLocations().then(setLocations).catch(console.error);
    };

    const handleCreate = async () => {
        try {
            await createLocation(newLocation);
            setNewLocation({ name: "", city: "", country: "", locationCode: "" });
            loadLocations();
        } catch (error) {
            console.error("Failed to create location:", error);
        }
    };

    const handleUpdate = async () => {
        if (!editLocation) return;
        try {
            await updateLocation(editLocation);
            setEditLocation(null);
            loadLocations();
        } catch (error) {
            console.error("Failed to update location:", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this location?")) return;
        try {
            await deleteLocation(id);
            loadLocations();
        } catch (error) {
            console.error("Failed to delete location:", error);
        }
    };

    const filteredLocations = locations.filter(loc =>
        loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loc.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loc.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loc.locationCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
                Locations
            </Typography>

            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Add New Location
                </Typography>
                <Stack spacing={2}>
                    <TextField
                        label="Name"
                        value={newLocation.name}
                        onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        label="City"
                        value={newLocation.city}
                        onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        label="Country"
                        value={newLocation.country}
                        onChange={(e) => setNewLocation({ ...newLocation, country: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        label="Location Code"
                        value={newLocation.locationCode}
                        onChange={(e) => setNewLocation({ ...newLocation, locationCode: e.target.value })}
                        fullWidth
                    />
                    <Button 
                        variant="contained" 
                        onClick={handleCreate}
                        sx={{ mt: 2 }}
                    >
                        Add Location
                    </Button>
                </Stack>
            </Paper>

            <Box sx={{ mb: 3 }}>
                <TextField
                    label="Search locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    fullWidth
                />
            </Box>

            <Stack spacing={2}>
                {filteredLocations.map((loc) => (
                    <Card key={loc.id}>
                        <CardContent>
                            {editLocation?.id === loc.id ? (
                                <Stack spacing={2}>
                                    <TextField
                                        label="Name"
                                        value={editLocation.name}
                                        onChange={(e) => setEditLocation({ ...editLocation, name: e.target.value })}
                                        fullWidth
                                    />
                                    <TextField
                                        label="City"
                                        value={editLocation.city}
                                        onChange={(e) => setEditLocation({ ...editLocation, city: e.target.value })}
                                        fullWidth
                                    />
                                    <TextField
                                        label="Country"
                                        value={editLocation.country}
                                        onChange={(e) => setEditLocation({ ...editLocation, country: e.target.value })}
                                        fullWidth
                                    />
                                    <TextField
                                        label="Location Code"
                                        value={editLocation.locationCode}
                                        onChange={(e) => setEditLocation({ ...editLocation, locationCode: e.target.value })}
                                        fullWidth
                                    />
                                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<SaveIcon />}
                                            onClick={() => handleUpdate()}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            startIcon={<CancelIcon />}
                                            onClick={() => setEditLocation(null)}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                </Stack>
                            ) : (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography>
                                        {loc.name} - {loc.city}, {loc.country} ({loc.locationCode})
                                    </Typography>
                                    <Box>
                                        <IconButton 
                                            color="primary" 
                                            onClick={() => setEditLocation(loc)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton 
                                            color="error" 
                                            onClick={() => handleDelete(loc.id)}
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

export default LocationsPage;