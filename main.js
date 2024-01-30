var mymap = L.map('map').setView([-14.235, -51.925], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(mymap);

var drawnItems = new L.FeatureGroup();
mymap.addLayer(drawnItems);

var info = document.getElementById('info');
var areaSelecionadaHectares = document.getElementById('areaSelecionadaHectares');
var areaSelecionadaMetrosQuadrados = document.getElementById('areaSelecionadaMetrosQuadrados');

var drawControl = new L.Control.Draw({
  edit: {
    featureGroup: drawnItems
  },
  draw: {
    polygon: true,
    polyline: false,
    rectangle: false,
    circle: false,
    marker: false
  }
});
mymap.addControl(drawControl);

mymap.on(L.Draw.Event.CREATED, function (e) {
    var layer = e.layer;
    drawnItems.addLayer(layer);
  
    var area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
    var hectares = (area / 10000).toFixed(2); // Limita para duas casas decimais
  
    areaSelecionadaHectares.textContent = hectares;
  
    var metrosQuadrados = area.toFixed(2); // Área em metros quadrados
    areaSelecionadaMetrosQuadrados.textContent = metrosQuadrados;

    // Redirecionar para a página de resultados com os parâmetros de área
    var redirectUrl = `resultados.html?hectares=${hectares}&metrosQuadrados=${metrosQuadrados}`;
    window.location.href = redirectUrl; // Redireciona para a página de resultados
});
