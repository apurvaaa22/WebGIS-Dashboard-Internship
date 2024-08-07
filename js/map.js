// Map initialization
var map = L.map('map').setView([19.7515, 75.7139], 6);

// Default layer (OSM)
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);

// Marker clustering
const markers = L.markerClusterGroup();

// Custom icons using SVG files
const boreWellIcon = L.icon({
    iconUrl: "https://www.svgrepo.com/show/500043/water-tank.svg",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const dugWellIcon = L.icon({
    iconUrl: 'https://www.svgrepo.com/show/276095/well.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const geojsonMarkerOption = {
    radius: 8,
    fillColor: "#0ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

// Function to handle loading GeoJSON data
function loadGeoJSON() {
    fetch('data/Maharashtra_Wells_Jan_2023.geojson')
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                pointToLayer: function (feature, latlng) {
                    let icon;
                    if (feature.properties.SITE_TYPE === 'Bore Well') {
                        icon = boreWellIcon;
                    } else if (feature.properties.SITE_TYPE === 'Dug Well') {
                        icon = dugWellIcon;
                    } else {
                        icon = L.divIcon(geojsonMarkerOption);
                    }

                    // Create the marker
                    let marker = L.marker(latlng, { icon: icon });

                    // Add a click event listener to the marker
                    marker.on('click', function () {
                        // Open the drawer
                        document.getElementById('my-drawer-4').checked = true;

                        // Populate the drawer with feature details
                        populateDrawer(feature.properties);
                    });

                    // Add the marker to the cluster group
                    return markers.addLayer(marker);
                }
            });

            // Add the marker cluster group to the map
            map.addLayer(markers);
        })
        .catch(error => {
            console.error('Error loading GeoJSON data:', error);
        });
}

// Function to populate the drawer with feature details
function populateDrawer(properties) {
    // Get the drawer content element
    var drawerContent = document.querySelector('.drawer-side .menu');

    // Clear existing content
    drawerContent.innerHTML = '';

    // Populate with new content
    // for (let key in properties) {
    //     let li = document.createElement('li');
    //     li.textContent = `${key}: ${properties[key]}`;
    //     drawerContent.appendChild(li);
    // }

    // Populate the site name, district, and state name
    document.getElementById('state-name').textContent = `State Name: ${properties.STATE_NAME}`;
    document.getElementById('site-name').textContent = `Site Name: ${properties.SITE_NAME}`;
    document.getElementById('district-name').textContent = `District: ${properties.DISTRICT_N}`;

    // Populate latitude and longitude
    document.getElementById('latitue').textContent = `latitude:${properties.LATITUDE}`;
    document.getElementById('longitude').textContent = `longitude:${properties.LONGITUDE}`;

    //Populate remaining values
    document.getElementById('value1').textContent = `${properties.SITE_ID}`;
    document.getElementById('value2').textContent = `${properties.SITE_TYPE}`;
    document.getElementById('value3').textContent = `${properties.TAHSIL_NAM}`;
    document.getElementById('value4').textContent = `${properties.BLOCK_NAME}`;
    document.getElementById('value5').textContent = `${properties.DEPTH}`;
    document.getElementById('value6').textContent = `${properties.WLS_DATE}`;
    document.getElementById('value7').textContent = `${properties.WLS_WTR_LE}`;
    document.getElementById('value8').textContent = `${properties.WLS_DRY_WE}`;
    document.getElementById('value9').textContent = `${properties.AQUIFER_TY}`;
    document.getElementById('value10').textContent = `${properties.SITE_SUB_T}`;

}

// Load GeoJSON data
loadGeoJSON();

// Drawer functionality
document.addEventListener('DOMContentLoaded', function () {
    var drawerToggle = document.getElementById('my-drawer-4');
    var drawer = document.querySelector('.drawer');

    drawerToggle.addEventListener('change', function () {
        if (drawerToggle.checked) {
            drawer.classList.add('open');
        } else {
            drawer.classList.remove('open');
        }
    });
});
