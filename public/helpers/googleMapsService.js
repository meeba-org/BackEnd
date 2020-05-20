const geocoder = new window.google.maps.Geocoder;
const autocompleteService = new window.google.maps.places.AutocompleteService();
// const placesService = new window.google.maps.places.PlacesService();

export const getLatLngLocation = placeId => {
    return new Promise(resolve => {
        geocoder.geocode({'placeId': placeId}, function (result) {
            const location = result[0].geometry.location;
            return resolve({lng: location.lng(), lat: location.lat()});
        });
    });
};

/**
 *
 * @param placeId
 * @return {PlaceResult} https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceResult
 */
export const getPlace = async (placeId, map) => {
    const service = new window.google.maps.places.PlacesService(map);

    return new Promise(resolve => {
        service.getDetails({'placeId': placeId}, function (placeResult) {
            return resolve(placeResult); // We return the first one
        });
    });
};

export const getPlaceByLocation = location => {
    if (!location?.lat || !location?.lng)
        return;

    return new Promise(resolve => {
        geocoder.geocode({'location': location}, function (result) {
            const place = result[0];
            return resolve(place);
        });
    });
};

/**
 *
 * @param text
 * @return {AutocompletePrediction} https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletePrediction
 */
export const getPredictions = text => {
    if (!text)
        return;

    return new Promise(resolve => {
        autocompleteService.getPlacePredictions({input: text}, function (predictions) {
            return resolve(predictions);
        });
    });
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
