

firebase.database().ref("/projects").orderByChild("title").once('value').then(function(snapshot) {

    const data = snapshot.val();
    console.log(data);
    console.log(map);

    // early exit if there is no data
    if (data === null || data === undefined) {
        return;
    }

    const geojson = {
        type: "FeatureCollection",
        features: []
    };

    $.each(data, function(i) {
        let project = {
            type: "Project",
            properties: {
                title: data[i].title,
                description: data[i].description,
                more_info: data[i].more_info,
                tag: data[i].tag,
                icon_size: [34,34]
            },
            geometry: {
                type: "Point",
                coordinates: [
                    data[i].long,
                    data[i].lat
                ]
            }
        };
        geojson.features.push(project);
    });

    geojson.features.forEach(function(marker) {
        // create a DOM element for the marker
        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url(https://placekitten.com/g/' + marker.properties.icon_size.join('/') + '/)';
        el.style.width = marker.properties.icon_size[0] + 'px';
        el.style.height = marker.properties.icon_size[1] + 'px';

        el.addEventListener('click', function() {
            // just an alert for now
            window.alert(marker.properties.description);
        });

        // add marker to map
        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
    });
});