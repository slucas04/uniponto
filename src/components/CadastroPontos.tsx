import React, { useState } from "react";
import axios from "axios";

type Props = {
  setLocations: React.Dispatch<React.SetStateAction<any[]>>;
};

const CadastroPontos: React.FC<Props> = ({ setLocations }) => {
  const [address, setAddress] = useState("");
  const [key, setKey] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const MAP_API_KEY = '...';    

  const handleAdicionar = () => {
    let latValue = lat;
    let lngValue = lng;

    if (latValue.includes(",")) latValue = latValue.replace(/,/g, ".");
    if (lngValue.includes(",")) lngValue = lngValue.replace(/,/g, ".");

    const novoPoi = {
      key,
      location: { lat: Number(latValue), lng: Number(lngValue) },
    };

    setLocations((prev) => [...prev, novoPoi]);
    setKey("");
    setLat("");
    setLng("");
  };

  const getCoordinates = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: address,
            key: MAP_API_KEY,
          },
        }
      );

      if (response.data.status === "OK") {
        const { lat, lng } = response.data.results[0].geometry.location;

        const novoPoi = {
          key: address,
          location: { lat, lng },
        };

        setLocations((prev) => [...prev, novoPoi]);
        setAddress("");
      } else {
        alert("Endereço não encontrado!");
      }
    } catch (error) {
      console.error("Erro ao buscar coordenadas:", error);
    }
  };

  return (
    <div className="Inputs">
      <h3 style={{ margin: "0 0 0.5rem 0.25rem", color: "white" }}>
        Cadastre pontos pelas coordenadas
      </h3>

      <input
        className="nomeMarcador"
        placeholder="Nome do marcador..."
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <br />
      <input
        className="latitude"
        placeholder="Latitude..."
        value={lat}
        onChange={(e) => setLat(e.target.value)}
      />
      <br />
      <input
        className="longitude"
        placeholder="Longitude..."
        value={lng}
        onChange={(e) => setLng(e.target.value)}
      />
      <br />
      <button type="button" onClick={handleAdicionar}>
        Adicionar marcador
      </button>

      <h3 style={{ marginTop: "2rem", marginBottom: "0", color: "white", marginLeft: '0.5rem' }}>
        Cadastre pontos pelo endereço
      </h3>

      <input
        className="endereco"
        placeholder="Digite o endereço..."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button type="button" onClick={getCoordinates}>
        Adicionar marcador
      </button>
    </div>
  );
};

export default CadastroPontos;
