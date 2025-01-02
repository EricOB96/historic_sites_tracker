from django.contrib.gis.db import models
from django.contrib.auth.models import User

class HistoricalSite(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    location = models.PointField()
    date_built = models.DateField(null=True, blank=True)
    category = models.CharField(max_length=100)
    image_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Visit(models.Model):
    site = models.ForeignKey(HistoricalSite, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    visit_date = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True)
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
