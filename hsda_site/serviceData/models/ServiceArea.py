from django.db import models
from uuid import uuid4


class ServiceArea(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    service_id = models.ForeignKey('serviceData.Services', on_delete=models.CASCADE, blank=True, null=True)
    service_area = models.CharField(max_length=1000, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'service_area'
