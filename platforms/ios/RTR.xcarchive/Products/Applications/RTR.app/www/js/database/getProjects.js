

var layerIDs = []; // Will contain a list used to filter against.


function projectsCallback(snapshot) {

    const data = snapshot.val();

    // early exit if there is no data
    if (data === null || data === undefined) { return; }

    const places = {
        type: "FeatureCollection",
        features: [] // we will add the projects here
    };

    $.each(data, function(i) {
        let project = {
            type: "Feature",
            properties: {
                id: i,
                title: data[i].title,
                description: data[i].description,
                more_info: data[i].more_info,
                image: data[i].image,
                tag: data[i].tag,
                icon_size: [30,30]
            },
            geometry: {
                type: "Point",
                coordinates: [
                    data[i].long,
                    data[i].lat
                ]
            }
        };
        places.features.push(project);

    });

    map.addSource('places', {
        "type": "geojson",
        "data": places
    });

    places.features.forEach(function(marker) {
        // create a DOM element for the marker
        var el = document.createElement('div');
        el.className = 'marker';
        console.log(marker.properties.tag);
        //el.style.backgroundImage = '../../img/heritageIcon.png';
        if (marker.properties.tag == 'heritage'){
          el.style.backgroundImage = 'url(img/heritageIcon.png)';
          el.style.backgroundColor = '#C04C36';

        }
        else if (marker.properties.tag == 'communities'){
          el.style.backgroundImage = 'url(img/communityIcon.png)';
          el.style.backgroundColor = '#7BA7BC';
        }
        else if (marker.properties.tag == 'natural&environmental'){
          el.style.backgroundImage = 'url(img/natureIcon.png)';
          el.style.backgroundColor = '#7A9A01';
        }
        else if (marker.properties.tag == 'access'){
          el.style.backgroundImage = 'url(img/accessIcon.png)';
          el.style.backgroundColor = '#B6ADA5';
        }
        else{
          //el.style.backgroundImage = 'url(http://via.placeholder.com/30x30)';
          el.style.backgroundColor = '#0C2340';
        }
        el.style.width = marker.properties.icon_size[0] + 'px';
        el.style.height = marker.properties.icon_size[1] + 'px';

        var layerID = marker.properties.title.toLowerCase();
        // becauses spaces would mess up the id, replace all occurences with a dash
        var uniqueName = layerID.replace(/ /g, "-");

        el.id = uniqueName;
        el.dataID = marker.properties.id;

        if (!map.getLayer(layerID)) {
            map.addLayer({
                "id": layerID,
                "type": "symbol",
                "source": "places",
                "layout": {
                    "icon-image": '../../img/add.png',
                    "icon-allow-overlap": true,
                    "text-field": marker.properties.title,
                    "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
                    "text-size": 11,
                    "text-transform": "uppercase",
                    "text-letter-spacing": 0.05,
                    "text-offset": [0, 3]
                },
                "paint": {
                    "text-color": "#202",
                    "text-halo-color": "#fff",
                    "text-halo-width": 2
                },
                "filter": ["==", "title", marker.properties.title]
            });
            layerIDs.push(layerID);
        }

        el.addEventListener('click', function() {
            // set the current page for the android back button
            currentPage = 1;
            updateTitle("Project");
            let user = firebase.auth().currentUser;
            let admin = (user.email !== undefined && user.email !== null);
            if (admin==true){
            $("#topnav-title").append(`<img  id="editProject" src="img/edit.png" align="right" height="27px" width="27px" hspace="6px" vspace="2px">`);
            $("#topnav-title").on("click","#editProject", function(){editProject(el.dataID);});
          }
            // just an alert for now
            let newHtml = '';
            if (marker.properties.image !== null && marker.properties.image !== undefined) {
                newHtml += '<img src="' + marker.properties.image + '">';
            }
            newHtml += '<h1 class="standard-inset">' + marker.properties.title + '</h1>';
            newHtml += '<p class="standard-inset">' + marker.properties.description + '</p>';
            if (marker.properties.tag == 'heritage'){
              $('.topnav').css('background-color','#C04C36');
            }
            else if (marker.properties.tag == 'communities'){
              $('.topnav').css('background-color','#7BA7BC');
            }
            else if (marker.properties.tag == 'natural&environmental'){
              $('.topnav').css('background-color','#7A9A01');
            }
            else if (marker.properties.tag == 'access'){
              $('.topnav').css('background-color','#B6ADA5');
            }
            $(".app-section").hide();
            $("#map.content").css("display", "block");
            $("#project-detail").empty();
            $("#project-detail").html(newHtml);
            $("#topnav-title").prepend('<img id="backbutton" src="img/left-arrow.png" alt="back">');
            $(".content").css("display", "block");
            $("#events_main").hide();
            //because events-callback is called for some reason on opening of index.html. clumsy fix but it works...
            $("#project-detail").show();
            showBackButton();

        });

        // add marker to map
        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
    });

    $(".topnav").on('keyup', '#search-bar', function(e) {
        // If the input value matches a layerID set
        // it's visibility to 'visible' or else hide it.
        var value = e.target.value.trim().toLowerCase();
        layerIDs.forEach(function(layerID) {
            map.setLayoutProperty(layerID, 'visibility',
                layerID.indexOf(value) > -1 ? 'visible' : 'none');
        });
        if (value === "") {
            // no query, so display ALL the projects
            $(".marker").show();
            return;
        }
        // there is a query, so hide everything, then decide which of them to show
        $(".marker").hide();
        // because this is how the ids are formatted
        var valueForMarker = value.replace(/ /g, "-");
        // show only values the user has searched for
        $( "div[class*='marker'][id*='" + valueForMarker + "']" ).show();

        // every time a key is pressed, go back to viewing the correct area
        map.flyTo({
            center: [
                -1.60,
                54.3197364],
            zoom: 8
        });
    });
}
