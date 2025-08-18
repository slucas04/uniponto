import React, { useState } from 'react';
import { createRoot } from "react-dom/client";
import Mapa from './components/Mapa';
import MenuInput from './components/MenuInput';
import ListaMarcadores from './components/ListaMarcadores';
import Ajuda from './components/Ajuda';
import CadastroPontos from './components/CadastroPontos';
import '/styles.css';

type Poi = { key: string; location: google.maps.LatLngLiteral };

const App = () => {
  const [locations, setLocations] = useState<Poi[]>([
    { key: 'Ginásio Poliesportivo', location: { lat: -3.7698, lng: -38.4772069 } },
    { key: 'TEC UNIFOR', location: { lat: -3.768829, lng: -38.478680 } }
  ]);

  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: -3.7691,
    lng: -38.478
  });

  return (
    <div style={{paddingBottom: '2rem'}}>
      <MenuInput  />
      <div style={{display: 'flex'}}>
        <CadastroPontos setLocations={setLocations}/>
        <div style={{flex: '2.5'}}>
            <Mapa locations={locations} setLocations={setLocations} center={center} />
        </div>
        <div style={{flex: '1'}}>
            <ListaMarcadores
            locations={locations}
            onSelect={(coords) => setCenter(coords)}
            />

        </div>
      </div>
      <Ajuda />
    </div>
  );
};

const root = createRoot(document.getElementById('app')!);
root.render(<App />);

export default App;