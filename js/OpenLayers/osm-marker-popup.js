var map;
function init() {
    
    // The overlay layer for our marker, with a simple diamond as symbol
    var overlay = new OpenLayers.Layer.Vector('Overlay', {
        styleMap: new OpenLayers.StyleMap({
            externalGraphic: 'marker.png',
            graphicWidth: 20, graphicHeight: 24, graphicYOffset: -24,
            title: '${tooltip}'
        })
    });

    // The location of our marker and popup. We usually think in geographic
    // coordinates ('EPSG:4326'), but the map is projected ('EPSG:3857').
    var myLocation = new OpenLayers.Geometry.Point(11.51120,3.89827)
        .transform('EPSG:4326', 'EPSG:3857');

    // We add the marker with a tooltip text to the overlay
    overlay.addFeatures([
        new OpenLayers.Feature.Vector(myLocation, {tooltip: 'OpenLayers'})
    ]);

    // A popup with some information about our location
    var popup = new OpenLayers.Popup.FramedCloud("Popup", 
        myLocation.getBounds().getCenterLonLat(), null,
        'CBI guesthouse<br>is here.', null,
        true // <-- true if we want a close (X) button, false otherwise
    );

    // Finally we create the map
    map = new OpenLayers.Map({
        div: "map", projection: "EPSG:3857",
        layers: [new OpenLayers.Layer.OSM(), overlay],
        center: myLocation.getBounds().getCenterLonLat(), zoom: 15
    });
    // and add the popup to it.
    map.addPopup(popup);
}
