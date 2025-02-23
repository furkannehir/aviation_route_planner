import { useState } from "react";
import { Container, Tabs, Tab, Box, AppBar } from "@mui/material";
import LocationsPage from "./pages/Locations/LocationsPage";
import TransportationsPage from "./pages/Transportations/TransportationsPage";
import RoutesPage from "./pages/Routes/RoutesPage";
import "./App.css";

function App() {
    const [activeTab, setActiveTab] = useState<number>(0);

    return (
        <>
            <AppBar position="fixed" color="default" sx={{ backgroundColor: 'white' }}>
                <Container>
                    <h1>Aviation Route Planner</h1>
                    <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} centered>
                        <Tab label="Locations" />
                        <Tab label="Transportations" />
                        <Tab label="Routes" />
                    </Tabs>
                </Container>
            </AppBar>

            <Container>
                <Box sx={{ marginTop: '160px' }}> {/* Add padding to account for fixed header */}
                    {activeTab === 0 && <LocationsPage />}
                    {activeTab === 1 && <TransportationsPage />}
                    {activeTab === 2 && <RoutesPage />}
                </Box>
            </Container>
        </>
    );
}

export default App;