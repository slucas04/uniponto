import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from '@vis.gl/react-google-maps';

type Poi = { key: string; location: google.maps.LatLngLiteral };

const MAP_API_KEY = 'API_KEY';


export default function Mapa({
  locations,
  setLocations,
  center,
}: {
  locations: Poi[];
  setLocations: React.Dispatch<React.SetStateAction<Poi[]>>;
  center: google.maps.LatLngLiteral | null;
}) {
  return (
    <div style={{ display: 'flex' }}>
      <div className="Mapa">
        <APIProvider apiKey={MAP_API_KEY}>
          <Map
            defaultZoom={17}
            defaultCenter={{ lat: -3.7691, lng: -38.478 }}
            mapId="da37f3254c6a6d1c"
            style={{ width: '100%', height: '100%' }}
          >
            {/* centraliza quando clica na lista */}
            <CenterHandler center={center} />

            {/* clique direito + markers */}
            <RightClickHandler setLocations={setLocations} />
            <PoiMarkers pois={locations} setLocations={setLocations} />
          </Map>
        </APIProvider>
      </div>
    </div>
  );
}

function CenterHandler({ center }: { center: google.maps.LatLngLiteral | null }) {
  const map = useMap();

  useEffect(() => {
    if (map && center) {
      map.panTo(center);
    }
  }, [center, map]);

  return null;
}

function RightClickHandler({
  setLocations,
}: {
  setLocations: React.Dispatch<React.SetStateAction<Poi[]>>;
}) {
  const map = useMap();
  const [menuPos, setMenuPos] = useState<google.maps.LatLngLiteral | null>(null);

  const countRef = useRef(1);
  const listenerRef = useRef<google.maps.MapsEventListener | null>(null);
  const clickListenerRef = useRef<google.maps.MapsEventListener | null>(null);
  const domHandlerRef = useRef<(e: MouseEvent) => void>();
  const ignoreNextMapClickRef = useRef(false);

  useEffect(() => {
    if (!map) return;

    listenerRef.current = map.addListener(
      'rightclick',
      (ev: google.maps.MapMouseEvent) => {
        if (!ev.latLng) return;
        setMenuPos({ lat: ev.latLng.lat(), lng: ev.latLng.lng() });
      }
    );

    clickListenerRef.current = map.addListener('click', () => {
      if (ignoreNextMapClickRef.current) {
        ignoreNextMapClickRef.current = false;
        return;
      }
      setMenuPos(null);
    });

    const div = map.getDiv();
    const domHandler = (e: MouseEvent) => e.preventDefault();
    domHandlerRef.current = domHandler;
    div.addEventListener('contextmenu', domHandler);

    return () => {
      if (listenerRef.current) listenerRef.current.remove();
      if (clickListenerRef.current) clickListenerRef.current.remove();
      if (div && domHandlerRef.current)
        div.removeEventListener('contextmenu', domHandlerRef.current);
    };
  }, [map]);

  const handleAdd = useCallback(
    (pos: google.maps.LatLngLiteral | null) => {
      if (!pos) return;
      ignoreNextMapClickRef.current = true;

      const newKey = `Marcador ${countRef.current}`;
      countRef.current += 1;

      setLocations((prev) => [
        ...prev,
        { key: newKey, location: { lat: pos.lat, lng: pos.lng } },
      ]);

      setMenuPos(null);

      setTimeout(() => {
        ignoreNextMapClickRef.current = false;
      }, 50);
    },
    [setLocations]
  );

  return (
    <div id="Mapa">
      {menuPos && (
        <AdvancedMarker position={menuPos} clickable>
          <button
            onClick={() => handleAdd(menuPos)}
            style={{
              padding: '6px 10px',
              cursor: 'pointer',
              marginLeft: '45%',
              borderRadius: '0',
              backgroundColor: '#0e1767',
              color: '#fff',
            }}
          >
            Adicionar marcador
          </button>
        </AdvancedMarker>
      )}
    </ div>
  );
}

const PoiMarkers = ({
  pois,
  setLocations,
}: {
  pois: Poi[];
  setLocations: React.Dispatch<React.SetStateAction<Poi[]>>;
}) => {
  const handleDragEnd = useCallback(
    (key: string, e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      setLocations((prev) =>
        prev.map((p) =>
          p.key === key ? { ...p, location: { lat, lng } } : p
        )
      );
    },
    [setLocations]
  );

  return (
    <>
      {pois.map((poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}
          clickable
          draggable
          onDragEnd={(e) => handleDragEnd(poi.key, e)}
        >
          <div style={{ textAlign: 'center', cursor: 'grab' }}>
            <img
              className="marker"
              src="LOGO-MARKER-AZUL.png"
              alt="LOGOTIPO"
              style={{ display: 'block', margin: '0 auto', width: '2rem' }}
            />
            <div
              style={{
                fontSize: 12,
                color: '#000',
                marginTop: 2,
                whiteSpace: 'nowrap',
              }}
            >
              {poi.key}
            </div>
          </div>
        </AdvancedMarker>
      ))}
    </>
  );
};
