from django.db import models
from uuid import uuid4

class Schedule(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    service_id = models.ForeignKey('serviceData.Services', on_delete=models.CASCADE, blank=True, null=True)
    location_id = models.ForeignKey('serviceData.Locations', on_delete=models.CASCADE, blank=True, null=True)
    service_at_location_id = models.CharField(max_length=100, blank=True, null=True)  #TODO Is this required? table is missing
    weekday = models.CharField(max_length=75, blank=True, null=True)
    opens_at = models.TimeField(blank=True, null=True)
    closes_at = models.TimeField(blank=True, null=True)

    class Meta:
        db_table = 'schedule'
