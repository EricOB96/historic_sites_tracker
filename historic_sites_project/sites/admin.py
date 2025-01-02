from django.contrib import admin
from django.contrib.gis.admin import OSMGeoAdmin
from .models import HistoricalSite, Visit

@admin.register(HistoricalSite)
class HistoricalSiteAdmin(OSMGeoAdmin):
    list_display = ('name', 'category', 'date_built', 'created_at')
    search_fields = ('name', 'description', 'category')
    list_filter = ('category', 'date_built')

@admin.register(Visit)
class VisitAdmin(admin.ModelAdmin):
    list_display = ('site', 'user', 'visit_date', 'rating')
    list_filter = ('rating', 'visit_date')
    search_fields = ('site__name', 'user__username', 'notes')