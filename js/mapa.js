if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    async function (position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      const mapa = L.map("mapa").setView([latitude, longitude], 16);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapa);
    },
    function (error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.error("Permiso denegado para obtener la ubicación.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.error("La información de ubicación no está disponible.");
          break;
        case error.TIMEOUT:
          console.error("La solicitud para obtener la ubicación ha caducado.");
          break;
        case error.UNKNOWN_ERROR:
          console.error("Ha ocurrido un error desconocido.");
          break;
      }
    }
  );
} else {
  console.error("Geolocalización no es soportada por este navegador.");
}
