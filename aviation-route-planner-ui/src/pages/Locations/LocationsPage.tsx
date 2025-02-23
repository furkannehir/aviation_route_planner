import { useEffect, useState } from "react";
import { getLocations } from "../../api/api";
import { Location } from "../../types/entities";
import "./LocationsPage.css";

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
            await fetch("http://localhost:8080/api/v1/locations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newLocation)
            });
            setNewLocation({ name: "", city: "", country: "", locationCode: "" });
            loadLocations();
        } catch (error) {
            console.error("Failed to create location:", error);
        }
    };

    const handleUpdate = async (id: number) => {
        if (!editLocation) return;
        try {
            await fetch(`http://localhost:8080/api/v1/locations/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editLocation)
            });
            setEditLocation(null);
            loadLocations();
        } catch (error) {
            console.error("Failed to update location:", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this location?")) return;
        try {
            await fetch(`http://localhost:8080/api/v1/locations/${id}`, {
                method: "DELETE"
            });
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
        <div className="locations-container">
            <h2>Locations</h2>
            <div className="create-block">
                <h3>Add New Location</h3>
                <div className="create-form">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newLocation.name}
                        onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={newLocation.city}
                        onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Country"
                        value={newLocation.country}
                        onChange={(e) => setNewLocation({ ...newLocation, country: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Location Code"
                        value={newLocation.locationCode}
                        onChange={(e) => setNewLocation({ ...newLocation, locationCode: e.target.value })}
                    />
                    <button onClick={handleCreate}>Add Location</button>
                </div>
            </div>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="locations-list">
                {filteredLocations.map((loc) => (
                    <div key={loc.id} className="location-item">
                        {editLocation?.id === loc.id ? (
                            <div className="edit-form">
                                <input
                                    type="text"
                                    value={editLocation.name}
                                    onChange={(e) => setEditLocation({ ...editLocation, name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editLocation.city}
                                    onChange={(e) => setEditLocation({ ...editLocation, city: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editLocation.country}
                                    onChange={(e) => setEditLocation({ ...editLocation, country: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editLocation.locationCode}
                                    onChange={(e) => setEditLocation({ ...editLocation, locationCode: e.target.value })}
                                />
                                <button onClick={() => handleUpdate(loc.id)}>Save</button>
                                <button onClick={() => setEditLocation(null)}>Cancel</button>
                            </div>
                        ) : (
                            <>
                                <div className="location-info">
                                    {loc.name} - {loc.city}, {loc.country} ({loc.locationCode})
                                </div>
                                <div className="location-actions">
                                    <button onClick={() => setEditLocation(loc)}>Edit</button>
                                    <button onClick={() => handleDelete(loc.id)}>Delete</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LocationsPage;