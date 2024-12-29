"use client";

// START: Preserve spaces to avoid auto-sorting
import "leaflet/dist/leaflet.css";

// END: Preserve spaces to avoid auto-sorting
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function MapCaller({ long, lat, width, height }) {
  return (
    <MapContainer
      preferCanvas={true}
      center={[lat, long]}
      zoom={11}
      scrollWheelZoom={true}
      style={{
        height: height,
        width: width,
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, long]}>
        <Popup>
          This Marker icon is displayed correctly with <i>leaflet-defaulticon-compatibility</i>.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
