import React, { useEffect, useState } from 'react';
import s from './Location.module.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet'; // Импортируем библиотеку Leaflet
import useFetch from "../../hooks/useFetch";
import { Preloader } from "../../common/Preloader/Preloader";

import 'leaflet/dist/leaflet.css'; // Импортируем стили Leaflet
// Импортируем иконку маркера (можно использовать свою или стандартную)
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';

// Настраиваем иконку маркера
const defaultIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerIconShadow,
    iconAnchor: [12, 41], // точка привязки иконки маркера
    popupAnchor: [0, -41] // точка привязки всплывающей подписи
});

// Заменяем стандартную иконку маркера на нашу
L.Marker.prototype.options.icon = defaultIcon;

const Map = () => {
    const { data, loading, error } = useFetch('/contacts?populate=*');
    const coordinateString = data?.attributes?.coordinate;
    const [coordinate, setCoordinate] = useState(null);

    useEffect(() => {
        if (coordinateString) {
            const [lat, lng] = coordinateString.split(',').map(parseFloat);
            setCoordinate([lat, lng]);
        }
    }, [coordinateString]);

    return (
        <div>
            {error ? (
                <p>Что-то пошло не так</p>
            ) : loading ? (
                <Preloader />
            ) : (
                coordinate && (
                    <div className={s.map}>
                        <MapContainer
                            center={coordinate}
                            zoom={13}
                            style={{ height: "600px", width: "100%" }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                            />


                            <Marker position={coordinate}>
                                <Popup style={{ textAlign: 'center' }}>
                                    {data?.attributes?.address} <br /> Добро пожаловать!
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                )
            )}
        </div>
    );
};

export default Map;
