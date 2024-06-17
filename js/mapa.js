if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const latitude =
        document.querySelector("#lat").value || position.coords.latitude;
      const longitude =
        document.querySelector("#lng").value || position.coords.longitude;
      const mapa = L.map("mapa").setView([latitude, longitude], 16);
      let marker;

      //Utilizar Provider y Geocoder
      const geocodeService = L.esri.Geocoding.geocodeService();

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapa);

      //El pin
      marker = new L.marker([latitude, longitude], {
        draggable: true,
        autoPan: true,
      }).addTo(mapa);

      marker.on("moveend", function (e) {
        marker = e.target;
        const position = marker.getLatLng();
        mapa.panTo(new L.LatLng(position.lat, position.lng));

        //obtener la info de las calles
        geocodeService
          .reverse()
          .latlng(position, 13)
          .run(function (error, result) {
            marker.bindPopup(result.address.LongLabel);
            //llenar los campos
            document.querySelector(".street").textContent =
              result?.address?.Address ?? "";
            document.querySelector("#street").value =
              result?.address?.Address ?? "";
            document.querySelector("#lat").value = result?.latlng?.lat ?? "";
            document.querySelector("#lng").value = result?.latlng?.lng ?? "";
          });
      });
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
