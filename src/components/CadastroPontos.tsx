import React from 'react';
import { useState } from 'react';

const CadastroPontos = ({ setLocations }) => {
    const [key, setKey] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');



    const handleAdicionar = () => {
        console.log('clicou!')
        const novoPoi = {
        key,
        location: { lat: Number(lat), lng: Number(lng) }
        };
        setLocations(prev => [...prev, novoPoi]);
        setKey('');
        setLat('');
        setLng('');
    };

    return (
        <div className="Inputs">
            <input
                className="nomeMarcador"
                placeholder="Insira o nome do marcador..."
                value={key}
                onChange={e => setKey(e.target.value)}
            />
            <br />   
            <input
            className="latitude"
            placeholder="Insira a latitude (ex.: -2.5677)..."
            value={lat}
            onChange={e => setLat(e.target.value)}
            />   
            <br />  
            <input
                className="longitude"
                placeholder="Insira a longitude (ex.: -38.9800)..."
                value={lng}
                onChange={e => setLng(e.target.value)}
            />
            <br />
            <button type="button" onClick={handleAdicionar}>
            Adicionar marcador
            </button>
        </div>
    )
}

export default CadastroPontos
