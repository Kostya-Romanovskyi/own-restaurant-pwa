import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function GoogleMapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBJ6jyiogQhf-t6KB7PpvUBSrDhP6PQy0k', // Замените на ваш ключ
  });
  // AIzaSyBJ6jyiogQhf-t6KB7PpvUBSrDhP6PQy0k
  // AIzaSyBNDDkNYzASf_iE7bnZDbIXlibY_dm4kkM
  const onLoad = React.useCallback(function callback(map: any) {
    // Здесь карта уже доступна, можно выполнять настройки, если нужно
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    // Здесь можно очистить или освободить ресурсы, если это необходимо
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(GoogleMapComponent);
