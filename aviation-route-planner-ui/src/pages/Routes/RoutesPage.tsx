import { useEffect, useState } from "react";
import { getLocations, getRoutes } from "../../api/api";
import { Transportation, Location } from "../../types/entities";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import {
    Container,
    Typography,
    TextField,
    Paper,
    Box,
    Autocomplete,
    Card,
    CardContent,
    Chip,
    Stack,
    Divider
} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import dayjs, { Dayjs } from 'dayjs';

function RoutesPage() {
    const [routes, setRoutes] = useState<Transportation[][]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [selectedOrigin, setSelectedOrigin] = useState<Location | null>(null);
    const [selectedDestination, setSelectedDestination] = useState<Location | null>(null);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

    useEffect(() => {
        getLocations().then(setLocations).catch(console.error);
    }, []);

    useEffect(() => {
        if (selectedOrigin && selectedDestination && selectedDate) {
            getRoutes(selectedOrigin.id, selectedDestination.id, selectedDate.format('YYYY-MM-DD'))
                .then(setRoutes)
                .catch((error) => {
                    if (error.response?.status === 404)
                        setRoutes([]);
                });
        }
        else {
            setRoutes([]);
        }
    }, [selectedOrigin, selectedDestination, selectedDate]);

    const handleChangeSelectedOrigin = (value:Location|null) => {
        console.log(value);
        setSelectedOrigin(value);
        console.log(selectedOrigin);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container maxWidth="lg">
                <Typography variant="h4" gutterBottom sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FlightTakeoffIcon /> Find Routes
                </Typography>

                <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                    <Stack spacing={3}>
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                            <Box flex={1}>
                                <Autocomplete
                                    value={selectedOrigin}
                                    onChange={(_, newValue) => handleChangeSelectedOrigin(newValue)}
                                    options={locations}
                                    getOptionLabel={(option) => 
                                        `${option.name} (${option.locationCode})`
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Origin"
                                            placeholder="Select departure location"
                                            fullWidth
                                        />
                                    )}
                                    renderOption={(props, option) => (
                                        <Box component="li" {...props}>
                                            {option.name} ({option.locationCode})
                                        </Box>
                                    )}
                                />
                            </Box>
                            <Box flex={1}>
                                <Autocomplete
                                    value={selectedDestination}
                                    onChange={(_, newValue) => setSelectedDestination(newValue)}
                                    options={locations}
                                    getOptionLabel={(option) => 
                                        `${option.name} (${option.locationCode})`
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Destination"
                                            placeholder="Select arrival location"
                                            fullWidth
                                        />
                                    )}
                                    renderOption={(props, option) => (
                                        <Box component="li" {...props}>
                                            {option.name} ({option.locationCode})
                                        </Box>
                                    )}
                                />
                            </Box>
                            <Box flex={1}>
                                <DatePicker
                                    label="Travel Date"
                                    value={selectedDate}
                                    onChange={(newValue) => setSelectedDate(newValue)}
                                    sx={{ width: '100%' }}
                                    slotProps={{
                                        textField: {
                                            placeholder: 'Select travel date'
                                        }
                                    }}
                                />
                            </Box>
                        </Stack>
                    </Stack>
                </Paper>

                <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Available Routes
                </Typography>

                {routes.length > 0 ? (
                    <Stack spacing={2}>
                        {routes.map((route, routeIndex) => (
                            <Card key={routeIndex} sx={{ '&:hover': { boxShadow: 6 } }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom color="primary">
                                        Route Option {routeIndex + 1}
                                    </Typography>
                                    <Divider sx={{ mb: 2 }} />
                                    <Stack spacing={2}>
                                        {route.map((step, stepIndex) => (
                                            <Box key={stepIndex}>
                                                <Paper 
                                                    elevation={1} 
                                                    sx={{ 
                                                        p: 2,
                                                        backgroundColor: 'background.default',
                                                        '&:hover': { backgroundColor: 'action.hover' }
                                                    }}
                                                >
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Box sx={{ minWidth: 200 }}>
                                                            <Typography variant="subtitle1">
                                                                {step.origin.name}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {step.origin.locationCode}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ 
                                                            display: 'flex', 
                                                            flexDirection: 'column', 
                                                            alignItems: 'center'
                                                        }}>
                                                            <ArrowForwardIcon color="action" />
                                                            <Chip 
                                                                label={step.transportationType} 
                                                                size="small" 
                                                                color="primary" 
                                                                variant="outlined"
                                                                sx={{ mt: 0.5 }}
                                                            />
                                                        </Box>
                                                        <Box sx={{ minWidth: 200 }}>
                                                            <Typography variant="subtitle1">
                                                                {step.destination.name}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {step.destination.locationCode}
                                                            </Typography>
                                                        </Box>
                                                    </Stack>
                                                </Paper>
                                            </Box>
                                        ))}
                                    </Stack>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                ) : (
                    <Paper 
                        elevation={1} 
                        sx={{ 
                            p: 4, 
                            textAlign: 'center',
                            backgroundColor: 'background.default'
                        }}
                    >
                        <Typography color="text.secondary">
                            {selectedOrigin && selectedDestination 
                                ? "No routes found between selected locations"
                                : "Please select origin, destination, and date to search for routes"
                            }
                        </Typography>
                    </Paper>
                )}
            </Container>
        </LocalizationProvider>
    );
}

export default RoutesPage;