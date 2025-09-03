import React from 'react'
import {MapContainer, TileLayer} from 'react-leaflet'

const MapView = () => {
  return (
    <div className="w-full h-[400px]">  {/* 🔥 hauteur fixée ici */}
      <MapContainer
        center={[9.6412, -13.5784]}
        zoom={13}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  )
}

export default MapView