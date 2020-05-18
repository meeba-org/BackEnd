const geocoder = new window.google.maps.Geocoder;

export const getLatLngLocation = placeId => {
    return new Promise(resolve => {
        geocoder.geocode({'placeId': placeId}, function (result) {
            const location = result[0].geometry.location;
            return resolve({lng: location.lng(), lat: location.lat()});
        });
    });
};

export const getPlace = location => {
    return new Promise(resolve => {
        geocoder.geocode({'location': location}, function (result) {
            const place = result[0];
            return resolve(place);
        });
    });
};

export const getAddress = async location => {
    const place = await getPlace(location);
    return place?.formatted_address;
};

export const fetchDeviceLocation = (callback) => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let currentLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            callback(currentLocation);
        }, function () {
        });
    } else {
        // Browser doesn't support Geolocation
    }
};
