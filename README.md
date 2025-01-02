# historic_sites_tracker
 AWM CA2


- Overview
  
The Historic Sites Tracker is a location-based web and mobile application that allows users to explore, locate, and track historical sites. The app uses mapping technologies to provide users with spatial data and information about historical landmarks.

Architecture

Frontend:

- A React-based application with PWA support for seamless offline functionality.
- Interactive maps powered by Leaflet and OpenStreetMap.

  
Backend:

- Django provides APIs for fetching historical site data and tracking visits.
- Geospatial queries implemented using PostGIS.

  
Database:

- PostgreSQL stores site and visit data, with PostGIS enabling geospatial queries.

  
Deployment:

- Dockerized containers for both frontend and backend.
- Hosted on AWS EC2 with domain mapping using Namecheap.

Setup

- git clone
- go into backend
- pip install -r requirements.txt
- python manage.py makemigrations
- python manage.py migrate
- python manage.py runserver

frontend
- go into frontend
- npm install
- npm start



 docker image repo link https://hub.docker.com/r/ericob96/historic-sites-web/tags

Issues

Issues had with deployment from cloud using aws. The instance did not have enough space to push the frontend and will charge extra fees for volume increase. Due to this ,this domain will not work http://www.parkfinder.xyz/

Will only work on local machine

 ![image](https://github.com/user-attachments/assets/e094fccc-28cb-4856-9dae-6e8631f51f01)

