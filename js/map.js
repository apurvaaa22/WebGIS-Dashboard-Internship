
// map initialization
var map = L.map('map').setView([19.7515, 75.7139], 6);

// default layer(osm)
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

});
osm.addTo(map);

// Fetch the geoJSON data from data folder
// fetch('data/Maharashtra_Wells_Jan_2023.geojson').then(response => 
//     response.json()
// ).then(data => {
//     // create geojson layer and add to map
//     L.geoJSON(data).addTo(map);
// }).catch(error => {
//     console.error('Error loading GeoJSON data :',error);
// });

// // Add the Geojson data to the map
// L.geoJSON(maharashtraWellsGeoJSON).addTo(map);

const geojsonMarkerOption = {
    radius: 8,
    fillColor: "#0ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};


//    //custom icons
//    const iconOptions = {
//       iconSize:[25,41],
//       iconAnchor:[12,41],  
//    }

//    const boreWell=L.icon({
//     ...iconOptions,
//     iconUrl:'https://tse1.mm.bing.net/th?id=OIP.VQd7A7v1mLHC31bZVMiNvgHaHa&pid=Api&P=0&h=220'
//    })

//    const dugWell=L.icon({
//     ...iconOptions,
//     iconUrl:'https://tse4.mm.bing.net/th?id=OIP.YIYFyhzxyIrS4mGGPeX1hAHaHa&pid=Api&P=0&h=220'
//    })

//Marker clustering
const markers = L.markerClusterGroup();

// // Loading GeoJSON with custom icons
// L.geoJSON(maharashtraWellsGeoJSON,{
//     pointToLayer:function(feature,latlng){
//         let icon;
//         if(feature.properties.SITE_TYPE==='Bore Well'){
//             icon=boreWell;
//         }
//         else if(feature.properties.SITE_TYPE==='Dug Well'){
//             icon=dugWell;
//         }
//         else{
//             icon=L.divIcon(geojsonMarkerOption);
//         }

//         return markers.addLayer(L.marker(latlng,{icon:icon}));
//     }
// }).addTo(map);


// Custom icons using SVG files from the marker/svg/ folder
const boreWellIcon = L.icon({
    iconUrl: "https://www.svgrepo.com/show/500043/water-tank.svg",
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12, 41] // point of the icon which will correspond to marker's location
});

const dugWellIcon = L.icon({
    iconUrl: 'https://www.svgrepo.com/show/276095/well.svg',
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12, 41] // point of the icon which will correspond to marker's location
});

// Loading GeoJSON with custom icons
L.geoJSON(maharashtraWellsGeoJSON, {
    pointToLayer: function (feature, latlng) {
        let icon;
        // Assign the appropriate icon based on the SITE_TYPE property
        if (feature.properties.SITE_TYPE === 'Bore Well') {
            icon = boreWellIcon;
        } else if (feature.properties.SITE_TYPE === 'Dug Well') {
            icon = dugWellIcon;
        } else {
            // Use a default div icon if the SITE_TYPE doesn't match
            icon = L.divIcon(geojsonMarkerOption);
        }

        // Add the marker to the marker cluster group
        return markers.addLayer(L.marker(latlng, { icon: icon }));
    }
}).addTo(map);

// Add marker clustering to the map
map.addLayer(markers);

// Function to create popup content for a feature
function createPopupContent(feature, layer) {
    let popupContent = "";
    if (feature.properties) {
        for (let property in feature.properties) {
            popupContent +=
                "<b>" + property + "</b>: " + feature.properties[property] + "<br />";
        }
    }
    layer.bindPopup(popupContent);
}

function style_Maharashtra_Wells_Jan_2023(feature) {
  return {
    opacity: 1,
    color: "#1affd1",
    dashArray: "",
    lineCap: "square",
    lineJoin: "bevel",
    weight: 4.0,
    fillOpacity: 0,
    interactive: true,
  };
}

// Create the geojson layers
// Maharashtra_Wells_Jan_2023
let maharashtraWellsGeoJSON_Jan2023= addGeoJsonLayer(
  maharashtraWellsGeoJSON,
  style_Maharashtra_Wells_Jan_2023,
  createPopupContent,
);

maharashtraWellsGeoJSON_Jan2023.addTo(map);


// Fit map bounds 
map.fitBounds(maharashtraWellsGeoJSON.getBounds());





