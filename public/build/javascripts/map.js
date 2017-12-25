function initMap() {
    var coordinates = {
        lat: 4.633745,
        lng: 7.930911
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: coordinates
    });
    var marker = new google.maps.Marker({
        position: coordinates,
        map: map
    });
}