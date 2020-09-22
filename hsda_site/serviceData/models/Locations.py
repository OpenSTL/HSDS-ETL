from django.db import models
from uuid import uuid4

class Locations(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    organization_id = models.ForeignKey('serviceData.Organizations', on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=500, blank=True, null=True)
    alternate_name = models.CharField(max_length=500, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    transportation = models.CharField(max_length=500, blank=True, null=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)

    class Meta:
        db_table = 'locations'
