document.addEventListener('deviceready', onDeviceReady, false);

let map;
let markers = [];

function onDeviceReady() {
    initializeMap();
    loadHistoricalSites();
}

function initializeMap() {
    map = L.map('map').setView([53.3498, -6.2603], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    navigator.geolocation.getCurrentPosition(
        function(position) {
            map.setView([position.coords.latitude, position.coords.longitude], 13);
        },
        function(error) {
            console.error('Error getting location:', error);
        }
    );
}

function loadHistoricalSites() {
    fetch('http://localhost:8000/api/sites/')
        .then(response => response.json())
        .then(sites => {
            sites.forEach(site => {
                const marker = L.marker([
                    site.location.coordinates[1],
                    site.location.coordinates[0]
                ]).addTo(map);

                marker.bindPopup(`
                    <div class="site-popup">
                        <h3>${site.name}</h3>
                        <p>${site.description}</p>
                        <p>Built: ${site.date_built}</p>
                        <p>Category: ${site.category}</p>
                    </div>
                `);
            });
        })
        .catch(error => console.error('Error:', error));
}