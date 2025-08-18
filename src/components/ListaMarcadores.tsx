import React from "react";

type Poi = { key: string; location: google.maps.LatLngLiteral };

const ListaMarcadores = ({
  locations,
  onSelect,
}: {
  locations: Poi[];
  onSelect: (coords: google.maps.LatLngLiteral) => void;
}) => {
  return (
    <div className="ListaMarcadores">
      <h3 style={{ margin: '0', marginBottom: '1rem' }}>Pontos cadastrados</h3>
      <ul>
        {locations.map((poi) => (
          <li
            key={poi.key}
            style={{ display: 'flex', cursor: 'pointer' }}
            onClick={() => onSelect(poi.location)}
          >
            <div style={{ flex: '1' }}>
              <img
                src={"LOGO-MARKER.png"}
                alt="LOGOTIPO"
                style={{ width: '2rem', marginLeft: '0.5rem' }}
              />
            </div>
            <div style={{ flex: '3' }}>
              <div style={{ fontWeight: 600 }}>{poi.key}</div>
              <div style={{ fontSize: 12 }}>
                {poi.location.lat.toFixed(6)}, {poi.location.lng.toFixed(6)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaMarcadores;
    