mapboxgl.accessToken =
  "pk.eyJ1IjoidmlydHlvejc3NyIsImEiOiJja2Mza3Q3MnUyZW1rMndteG5ydjZzc2JxIn0.Ls5ngdxaI4Ag80Ji2acbpA";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-100.486052, 37.830348],
  zoom: 2,
});
var hoveredStateId = null;

map.on("load", function () {
  map.addSource("states", {
    type: "geojson",
    data: "https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson",
  });

  // The feature-state dependent fill-opacity expression will render the hover effect
  // when a feature's hover state is set to true.
  map.addLayer({
    id: "state-fills",
    type: "fill",
    source: "states",
    layout: {},
    paint: {
      "fill-color": "#627BC1",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        1,
        0.2,
      ],
    },
  });

  map.addLayer({
    id: "state-borders",
    type: "line",
    source: "states",
    layout: {},
    paint: {
      "line-color": "#627BC1",
      "line-width": 1,
    },
  });

  // When the user moves their mouse over the state-fill layer, we'll update the
  // feature state for the feature under the mouse.
  map.on("mousemove", "state-fills", function (e) {
    console.log(map.setFeatureState);
    if (e.features.length > 0) {
      if (hoveredStateId !== null) {
        map.setFeatureState(
          { source: "states", id: hoveredStateId },
          { hover: false }
        );
      }
      hoveredStateId = e.features[0].id;
      map.setFeatureState(
        { source: "states", id: hoveredStateId },
        { hover: true }
      );
    }
  });

  // When the mouse leaves the state-fill layer, update the feature state of the
  // previously hovered feature.
  map.on("mouseleave", "state-fills", function () {
    if (hoveredStateId !== null) {
      map.setFeatureState(
        { source: "states", id: hoveredStateId },
        { hover: false }
      );
    }
    hoveredStateId = null;
  });
});
