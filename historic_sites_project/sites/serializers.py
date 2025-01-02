from rest_framework import serializers
from .models import HistoricalSite, Visit

class HistoricalSiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalSite
        fields = '__all__'

class VisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visit
        fields = '__all__'
