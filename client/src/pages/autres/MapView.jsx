import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, LayersControl, useMap, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const { BaseLayer } = LayersControl;

// Calcul distance Haversine
const calculerDistance = (pos1, pos2) => {
    if (!pos1 || !pos2) return null;
    const R = 6371; // rayon Terre en km
    const toRad = (deg) => deg * Math.PI / 180;
    const dLat = toRad(pos2.lat - pos1.lat);
    const dLng = toRad(pos2.lng - pos1.lng);
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRad(pos1.lat)) * Math.cos(toRad(pos2.lat)) *
              Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // distance en km
};

// Bouton recentrer
const BoutonRecentrer = ({ position }) => {
    const map = useMap();
    return (
        <button
            onClick={() => map.setView(position, map.getZoom())}
            style={{ position: 'absolute', bottom: 50, left: 10, zIndex: 1000, backgroundColor: 'white', padding: '6px 12px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
        >
            Recentrer
        </button>
    );
};

// Bouton “Ma position”
const BoutonMaPosition = ({ onPositionTrouvee }) => {
    const map = useMap();
    const allerAMaPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const latlng = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                    map.setView(latlng, 16);
                    onPositionTrouvee(latlng);
                },
                (err) => alert("Impossible de récupérer votre position : " + err.message)
            );
        } else alert("La géolocalisation n'est pas supportée par votre navigateur.");
    };
    return (
        <button
            onClick={allerAMaPosition}
            style={{ position: 'absolute', bottom: 10, left: 10, zIndex: 1000, backgroundColor: 'white', padding: '6px 12px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
        >
            Ma position
        </button>
    );
};

const MapView = ({ latitude, longitude, zoom = 13 }) => {
    const positionInitiale = { lat: latitude, lng: longitude };
    const [positionActuelle, setPositionActuelle] = useState(null);

    // Calcul distance
    let distance = positionActuelle ? calculerDistance(positionInitiale, positionActuelle) : null;
    let distanceTexte = '';
    if (distance !== null) {
        if (distance < 1) {
            distanceTexte = `${Math.round(distance * 1000)} m`; // mètres
        } else {
            distanceTexte = `${distance.toFixed(2)} km`; // km
        }
    }

    // Message personnalisé
    const messageDistance = distance !== null
        ? distance < 0.1
            ? "Vous êtes très proche de votre destination !"
            : `Distance depuis votre destination : ${distanceTexte}`
        : '';

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <MapContainer center={[latitude, longitude]} zoom={zoom} className="w-full h-full">
                <LayersControl>
                    <BaseLayer checked name="Plan">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; OpenStreetMap contributors'
                        />
                    </BaseLayer>
                    <BaseLayer name="Satellite">
                        <TileLayer
                            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                            attribution='Tiles &copy; Esri & contributors'
                        />
                    </BaseLayer>
                </LayersControl>

                {/* Marker initial */}
                <Marker position={positionInitiale}>
                    <Popup>Destination</Popup>
                </Marker>

                {/* Marker position actuelle */}
                {positionActuelle && (
                    <Marker position={positionActuelle}>
                        <Popup>
                            <div>
                                <p>Votre position actuelle</p>
                                <p>{messageDistance}</p>
                            </div>
                        </Popup>
                    </Marker>
                )}

                <BoutonMaPosition onPositionTrouvee={setPositionActuelle} />
                <BoutonRecentrer position={[latitude, longitude]} />
            </MapContainer>
        </div>
    );
};

export default MapView;
