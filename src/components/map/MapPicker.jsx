import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function ClickHandler({ onPick }) {
  useMapEvents({
    click(e) {
      onPick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export default function MapPicker({
  initialPosition,
  onConfirm,
  onClose,
}) {
  const [position, setPosition] = useState(
    Array.isArray(initialPosition) && initialPosition.length === 2
      ? initialPosition
      : null
  );

  const center = useMemo(() => {
    if (position) return position;
    return [33.5138, 36.2765];
  }, [position]);

  useEffect(() => {
    function onEsc(e) {
      if (e.key === "Escape") onClose?.();
    }
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3 style={{ margin: 0 }}>Pick your location</h3>
          <button onClick={onClose} style={styles.closeBtn} aria-label="Close">
            ×
          </button>
        </div>
        <div style={{ height: 360, borderRadius: 8, overflow: "hidden" }}>
          <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickHandler onPick={setPosition} />
            {position && <Marker position={position} icon={markerIcon} />} 
          </MapContainer>
        </div>
        <div style={styles.footer}>
          <div style={{ fontSize: 12, color: "#555" }}>
            {position
              ? `Selected: ${position[0].toFixed(6)}, ${position[1].toFixed(6)}`
              : "Click on the map to choose a point"}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onClose} style={styles.secondaryBtn}>Cancel</button>
            <button
              onClick={() => {
                if (!position) return;
                console.log("Confirming selected location:", {
                  latitude: position[0],
                  longitude: position[1],
                });
                onConfirm?.(position[0], position[1]);
              }}
              style={styles.primaryBtn}
              disabled={!position}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: 16,
  },
  modal: {
    width: "min(720px, 100%)",
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    borderBottom: "1px solid #eee",
  },
  footer: {
    marginTop: 12,
    padding: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    fontSize: 24,
    cursor: "pointer",
    lineHeight: 1,
  },
  primaryBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
  },
  secondaryBtn: {
    background: "#f3f4f6",
    color: "#111827",
    border: "1px solid #e5e7eb",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
  },
};


