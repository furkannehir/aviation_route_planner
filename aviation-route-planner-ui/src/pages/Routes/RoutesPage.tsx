import { useEffect, useState } from "react";
import { getLocations, getRoutes } from "../../api/api";
import { Transportation, Location } from "../../types/entities";
import "./RoutesPage.css";

function RoutesPage() {
    const [routes, setRoutes] = useState<Transportation[][]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [originSearch, setOriginSearch] = useState("");
    const [destinationSearch, setDestinationSearch] = useState("");
    const [selectedOrigin, setSelectedOrigin] = useState<Location | null>(null);
    const [selectedDestination, setSelectedDestination] = useState<Location | null>(null);

    useEffect(() => {
        getLocations().then(setLocations).catch(console.error);
    }, []);

    useEffect(() => {
        if (selectedOrigin && selectedDestination) {
            getRoutes(selectedOrigin.id, selectedDestination.id)
                .then(setRoutes)
                .catch((error) => {
                    if (error.response.status === 404)
                        setRoutes([]);
                });
        }
    }, [selectedOrigin, selectedDestination]);

    const filterLocations = (searchTerm: string, locations: Location[]) =>
        locations.filter(location =>
            location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            location.locationCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            location.country.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <div className="routes-container">
            <h2>Find Routes</h2>
            <div className="search-container">
                <div className="search-box">
                    <label>Origin:</label>
                    <div className="dropdown-container">
                        <input
                            type="text"
                            value={originSearch}
                            onChange={(e) => setOriginSearch(e.target.value)}
                            placeholder="Search by city, country, or code..."
                        />
                        {originSearch && (
                            <ul className="dropdown-list">
                                {filterLocations(originSearch, locations).map((location) => (
                                    <li
                                        key={location.id}
                                        onClick={() => {
                                            setSelectedOrigin(location);
                                            setOriginSearch("");
                                        }}
                                    >
                                        {location.name}, {location.country} ({location.locationCode})
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {selectedOrigin && (
                        <div className="selected-location">
                            Selected: {selectedOrigin.name}, {selectedOrigin.country} ({selectedOrigin.locationCode})
                            <button onClick={() => setSelectedOrigin(null)}>×</button>
                        </div>
                    )}
                </div>

                <div className="search-box">
                    <label>Destination:</label>
                    <div className="dropdown-container">
                        <input
                            type="text"
                            value={destinationSearch}
                            onChange={(e) => setDestinationSearch(e.target.value)}
                            placeholder="Search by city, country, or code..."
                        />
                        {destinationSearch && (
                            <ul className="dropdown-list">
                                {filterLocations(destinationSearch, locations).map((location) => (
                                    <li
                                        key={location.id}
                                        onClick={() => {
                                            setSelectedDestination(location);
                                            setDestinationSearch("");
                                        }}
                                    >
                                        {location.name}, {location.country} ({location.locationCode})
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {selectedDestination && (
                        <div className="selected-location">
                            Selected: {selectedDestination.name}, {selectedDestination.country} ({selectedDestination.locationCode})
                            <button onClick={() => setSelectedDestination(null)}>×</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="routes-display">
                <h3>Available Routes</h3>
                {routes.length > 0 ? (
                    <div className="routes-list">
                        {routes.map((route, routeIndex) => (
                            <div key={routeIndex} className="route-card">
                                <h4>Route Option {routeIndex + 1}</h4>
                                <div className="route-steps">
                                    {route.map((step, stepIndex) => (
                                        <div key={stepIndex} className="route-step">
                                            <div className="route-location">
                                                {step.origin.name} ({step.origin.locationCode})
                                            </div>
                                            <div className="route-transport">
                                                ↓ {step.transportationType}
                                            </div>
                                            {stepIndex === route.length - 1 && (
                                                <div className="route-location">
                                                    {step.destination.name} ({step.destination.locationCode})
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-routes">
                        {selectedOrigin && selectedDestination 
                            ? "No routes found between selected locations"
                            : "Please select both origin and destination to search for routes"
                        }
                    </div>
                )}
            </div>
        </div>
    );
}

export default RoutesPage;