const geocoder = new window.google.maps.Geocoder;

export const getLatLngLocation = placeId => {
    return new Promise(resolve => {
        geocoder.geocode({'placeId': placeId}, function (result, status) {
            const location = result[0].geometry.location;
            return resolve({lng: location.lng(), lat: location.lat()});
        });
    });
};
