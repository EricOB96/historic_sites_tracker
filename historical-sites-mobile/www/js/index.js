document.addEventListener('deviceready', function() {
    if (typeof L !== 'undefined') {
        onDeviceReady();
    } else {
        document.getElementById('status').innerHTML = 'Error: Leaflet not loaded';
        console.error('Leaflet not loaded');
    }
}, false);

let map;

function onDeviceReady() {
    document.getElementById('status').innerHTML = 'Device is ready';
    console.log('Device is ready');
    initializeMap();
}

function initializeMap() {
    try {
        document.getElementById('status').innerHTML = 'Initializing map...';
        
        // Create map with Dublin coordinates
        map = L.map('map').setView([53.3498, -6.2603], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Get current location
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                map.setView([lat, lng], 13);
                L.marker([lat, lng]).addTo(map)
                    .bindPopup('You are here');
                    
                // Load sites after getting location
                loadHistoricalSites();
            },
            function(error) {
                document.getElementById('status').innerHTML = 'Location error: ' + error.message;
                // Load sites even if location fails
                loadHistoricalSites();
            }
        );
    } catch (e) {
        document.getElementById('status').innerHTML = 'Map error: ' + e.message;
        console.error('Map error:', e);
    }
}

function loadHistoricalSites() {
    document.getElementById('status').innerHTML = 'Loading sites...';
    
    // Replace this URL with your actual API endpoint
    fetch('http://localhost:8000/api/sites/')
        .then(response => response.json())
        .then(sites => {
            console.log('Sites loaded:', sites);
            sites.forEach(site => {
                // Parse the PostGIS point format
                const coords = extractCoordinates(site.location);
                if (coords) {
                    L.marker([coords[1], coords[0]]).addTo(map)
                        .bindPopup(`
                            <h3>${site.name}</h3>
                            <p>${site.description}</p>
                            <p>Built: ${site.date_built || 'Unknown'}</p>
                        `);
                }
            });
            document.getElementById('status').innerHTML = `Loaded ${sites.length} sites`;
        })
        .catch(error => {
            document.getElementById('status').innerHTML = 'Error loading sites: ' + error.message;
            console.error('Error loading sites:', error);
        });
}

function extractCoordinates(location) {
    // Handle PostGIS point format: "POINT(longitude latitude)"
    const match = location.match(/POINT\s*\(([-\d.]+)\s+([-\d.]+)\)/);
    if (match) {
        return [parseFloat(match[1]), parseFloat(match[2])];
    }
    return null;
}