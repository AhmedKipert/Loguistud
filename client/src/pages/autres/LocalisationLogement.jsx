import React, { useEffect, useState } from 'react';
import { LayersControl, MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder';
import L from 'leaflet';

const { BaseLayer } = LayersControl;

const Marqueur = ({ onChoixPosition }) => {
    const [position, setPosition] = useState(null);
    const map = useMap();

    useEffect(() => {
        const geocoder = L.Control.geocoder({ defaultMarkGeocode: false })
            .on('markgeocode', (e) => {
                const center = e.geocode.center;
                map.setView(center, 16);
            })
            .addTo(map);

        return () => geocoder.remove();
    }, [map]);

    useEffect(() => {
        map.on('click', (e) => {
            setPosition(e.latlng);
            onChoixPosition(e.latlng);
        });
        return () => map.off('click');
    }, [map, onChoixPosition]);

    return position === null ? null : <Marker position={position} />;
};

// Nouveau composant pour le bouton "Ma position"
const BoutonMaPosition = () => {
    const map = useMap();

    const allerAMaPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const latlng = [pos.coords.latitude, pos.coords.longitude];
                    map.setView(latlng, 16);
                    L.marker(latlng).addTo(map); // ajoute un marqueur sur la position
                },
                (err) => {
                    alert("Impossible de récupérer votre position : " + err.message);
                }
            );
        } else {
            alert("La géolocalisation n'est pas supportée par votre navigateur.");
        }
    };

    return (
        <button
            onClick={allerAMaPosition}
            type='button'
            style={{
                position: 'absolute',
                bottom: 10,
                left: 10,
                zIndex: 1000,
                backgroundColor: 'white',
                padding: '6px 12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
            }}
        >
            Ma position
        </button>
    );
};

const LocalisationLogement = ({ onChoixPosition }) => {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <MapContainer
                center={[9.6412, -13.5784]}
                zoom={13}
                className="w-full h-full"
            >
                <LayersControl>
                    <BaseLayer checked name="Plan">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                    </BaseLayer>
                    <BaseLayer name="Satellite">
                        <TileLayer
                            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                            attribution='Tiles &copy; Esri & contributors'
                        />
                    </BaseLayer>
                </LayersControl>
                <Marqueur onChoixPosition={onChoixPosition} />
            <BoutonMaPosition />
            </MapContainer>
        </div>
    );
};

export default LocalisationLogement;
