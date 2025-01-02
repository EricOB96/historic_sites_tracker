// Import React and Leaflet components
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// TypeScript interface defining the structure of a historical site object
interface HistoricalSite {
  id: number;
  name: string;
  description: string;
  location: string;        
  date_built: string | null;
  category: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

// Helper function to extract coordinates from PostGIS POINT format
// Returns: [longitude, latitude] or null if invalid format
function extractCoordinates(location: string): [number, number] | null {
  const match = location.match(/POINT \((-?\d+\.\d+) (-?\d+\.\d+)\)/);
  if (match) {
    return [parseFloat(match[1]), parseFloat(match[2])];
  }
  return null;
}

// Main Map component
const Map: React.FC = () => {
  // State management using hooks
  const [sites, setSites] = useState<HistoricalSite[]>([]); // Store historical sites
  const [isLoading, setIsLoading] = useState(true);        // Loading state indicator

  // useEffect hook to fetch data when component mounts
  useEffect(() => {
    const fetchSites = async () => {
      try {
        // Fetch data from Django backend
        const response = await fetch('http://localhost:8000/api/sites/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        setSites(data);
      } catch (error) {
        console.error('Error fetching sites:', error);
        setSites([]);  // Set empty array on error
      } finally {
        setIsLoading(false);  // Update loading state
      }
    };

    fetchSites();
  }, []); // Empty dependency array means this runs once on mount

  // Show loading message while data is being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render the map
  return (
    <MapContainer
      center={[53.3498, -6.2603]} // Center map on Dublin coordinates
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
    >
      {/* Add OpenStreetMap tile layer */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Map through sites array and create markers */}
      {sites.map(site => {
        // Extract coordinates from location string
        const coordinates = extractCoordinates(site.location);
        if (!coordinates) {
          console.warn(`Invalid location data for site ${site.id}`);
          return null;
        }

        // Create marker for each site
        return (
          <Marker
            key={site.id}
            position={[coordinates[1], coordinates[0]]} // [latitude, longitude]
          >
            {/* Popup content shown when marker is clicked */}
            <Popup>
              <h3>{site.name}</h3>
              <p>{site.description}</p>
              <p>Built: {site.date_built || 'Unknown'}</p>
              <p>Category: {site.category}</p>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;