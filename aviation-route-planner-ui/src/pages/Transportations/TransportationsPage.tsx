import { useEffect, useState } from "react";
import { getTransportations, getLocations } from "../../api/api";
import { Transportation, Location, TransportationType } from "../../types/entities";
import "./TransportationsPage.css";

function TransportationsPage() {
    const [transportations, setTransportations] = useState<Transportation[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editTransportation, setEditTransportation] = useState<Transportation | null>(null);
    const [newTransportation, setNewTransportation] = useState({
        originId: "",
        destinationId: "",
        transportationType: ""
    });

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
            await fetch("http://localhost:8080/api/v1/transportations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    originId: parseInt(newTransportation.originId),
                    destinationId: parseInt(newTransportation.destinationId),
                    transportationType: newTransportation.transportationType
                })
            });
            setNewTransportation({ originId: "", destinationId: "", transportationType: "" });
            loadTransportations();
        } catch (error) {
            console.error("Failed to create transportation:", error);
        }
    };

    const handleUpdate = async (id: number) => {
        if (!editTransportation) return;
        try {
            await fetch(`http://localhost:8080/api/v1/transportations/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editTransportation)
            });
            setEditTransportation(null);
            loadTransportations();
        } catch (error) {
            console.error("Failed to update transportation:", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this transportation?")) return;
        try {
            await fetch(`http://localhost:8080/api/v1/transportations/${id}`, {
                method: "DELETE"
            });
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
        <div className="transportations-container">
            <h2>Transportations</h2>
            
            {/* Search Box */}
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search transportations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Create New Transportation Form */}
            <div className="create-form">
                <h3>Add New Transportation</h3>
                <select
                    value={newTransportation.originId}
                    onChange={(e) => setNewTransportation({ ...newTransportation, originId: e.target.value })}
                >
                    <option value="">Select Origin</option>
                    {locations.map(loc => (
                        <option key={loc.id} value={loc.id}>
                            {loc.name} ({loc.locationCode})
                        </option>
                    ))}
                </select>
                <select
                    value={newTransportation.destinationId}
                    onChange={(e) => setNewTransportation({ ...newTransportation, destinationId: e.target.value })}
                >
                    <option value="">Select Destination</option>
                    {locations.map(loc => (
                        <option key={loc.id} value={loc.id}>
                            {loc.name} ({loc.locationCode})
                        </option>
                    ))}
                </select>
                <select
                    value={newTransportation.transportationType}
                    onChange={(e) => setNewTransportation({ ...newTransportation, transportationType: e.target.value })}
                >
                    <option value="">Select Transportation Type</option>
                    {Object.values(TransportationType).map(type => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                <button onClick={handleCreate}>Add Transportation</button>
            </div>

            {/* Transportations List */}
            <div className="transportations-list">
                {filteredTransportations.map((t) => (
                    <div key={t.id} className="transportation-item">
                        {editTransportation?.id === t.id ? (
                            <div className="edit-form">
                                <select
                                    value={editTransportation.origin.id}
                                    onChange={(e) => setEditTransportation({
                                        ...editTransportation,
                                        origin: locations.find(l => l.id === parseInt(e.target.value)) || editTransportation.origin
                                    })}
                                >
                                    {locations.map(loc => (
                                        <option key={loc.id} value={loc.id}>
                                            {loc.name} ({loc.locationCode})
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={editTransportation.destination.id}
                                    onChange={(e) => setEditTransportation({
                                        ...editTransportation,
                                        destination: locations.find(l => l.id === parseInt(e.target.value)) || editTransportation.destination
                                    })}
                                >
                                    {locations.map(loc => (
                                        <option key={loc.id} value={loc.id}>
                                            {loc.name} ({loc.locationCode})
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={editTransportation.transportationType}
                                    onChange={(e) => setEditTransportation({
                                        ...editTransportation,
                                        transportationType: (e.target.value as TransportationType)
                                    })}
                                >
                                    {Object.values(TransportationType).map(type => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={() => handleUpdate(t.id)}>Save</button>
                                <button onClick={() => setEditTransportation(null)}>Cancel</button>
                            </div>
                        ) : (
                            <>
                                <div className="transportation-info">
                                    {t.origin.name} ({t.origin.locationCode}) → 
                                    {t.destination.name} ({t.destination.locationCode}) 
                                    <span className="transport-type">({t.transportationType})</span>
                                </div>
                                <div className="transportation-actions">
                                    <button onClick={() => setEditTransportation(t)}>Edit</button>
                                    <button onClick={() => handleDelete(t.id)}>Delete</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TransportationsPage;