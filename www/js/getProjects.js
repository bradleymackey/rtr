

firebase.database().ref("/projects").orderByChild("title").once('value').then(function(snapshot) {

    const data = snapshot.val();

    // early exit if there is no data
    if (data === null || data === undefined) { return; }

    const geojson = {
        type: "FeatureCollection",
        features: [] // we will add the projects here
    };

    $.each(data, function(i) {
        let project = {
            type: "Project",
            properties: {
                title: data[i].title,
                description: data[i].description,
                more_info: data[i].more_info,
                image: data[i].image,
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
            // set the current page for the android back button
            currentPage = 1;
            $("#topnav-title").text("Project");
            // just an alert for now
            let newHtml = '';
            if (marker.properties.image !== null && marker.properties.image !== undefined) {
                newHtml += '<img src="' + marker.properties.image + '">';
            }
            newHtml += '<h1 class="standard-inset">' + marker.properties.title + '</h1>';
            newHtml += '<p class="standard-inset">' + marker.properties.description + '</p>';
            $(".app-section").hide();
            $(".content").css("display", "block");
            $("#project-detail").show();
            $("#project-detail").empty();
            $("#project-detail").html(newHtml);
        });

        // add marker to map
        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
    });
});