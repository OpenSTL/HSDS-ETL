from django.db import models
from uuid import uuid4


class Details(models.Model):
    id              = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    value           = models.TextField(blank=True, null=True)
    location_id     = models.ForeignKey('serviceData.Locations', on_delete=models.CASCADE, blank=True, null=True)
    detail_type     = models.TextField(db_column='Detail Type', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    service_id      = models.ForeignKey('serviceData.Services', on_delete=models.CASCADE, blank=True, null=True)
    organization_id = models.ForeignKey('serviceData.Organizations', on_delete=models.CASCADE, blank=True, null=True)
    description     = models.TextField(blank=True, null=True)
    phone_id        = models.ForeignKey('serviceData.Phones', on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        db_table = 'details'