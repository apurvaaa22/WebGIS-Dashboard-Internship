
        fetch("../data/raster_tile.tif")
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => {
                    parseGeoraster(arrayBuffer).then(georaster => {
                        // console.log("georaster:", georaster);

                        var layer = new GeoRasterLayer({
                            georaster: georaster,
                            opacity: 0.7,
                            //pixelValuesToColorFn: values => values <50 ? 'red' : 'blue',
                            resolution: 256 // optional parameter for adjusting display resolution
                        });
                        layer.addTo(map);

                        map.fitBounds(layer.getBounds());

                    });
                });
