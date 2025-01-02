from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance
from .models import HistoricalSite, Visit
from .serializers import HistoricalSiteSerializer, VisitSerializer

class HistoricalSiteViewSet(viewsets.ModelViewSet):
    queryset = HistoricalSite.objects.all()
    serializer_class = HistoricalSiteSerializer

    def get_queryset(self):
        queryset = HistoricalSite.objects.all()
        lat = self.request.query_params.get('lat')
        lng = self.request.query_params.get('lng')
        
        if lat and lng:
            user_location = Point(float(lng), float(lat), srid=4326)
            return queryset.annotate(
                distance=Distance('location', user_location)
            ).order_by('distance')
        return queryset

class VisitViewSet(viewsets.ModelViewSet):
    queryset = Visit.objects.all()
    serializer_class = VisitSerializer