from django.db import models
from uuid import uuid4

class Services(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    organization_id = models.ForeignKey('serviceData.Organizations', on_delete=models.CASCADE, blank=True, null=True)
    program_id = models.CharField(max_length=38, blank=True, null=True)  #TODO Is this required? table is missing
    location_id = models.ForeignKey('serviceData.Locations', on_delete=models.SET_NULL, blank=True, null=True)
    name = models.CharField(max_length=1000, blank=True, null=True)
    alternate_name = models.CharField(max_length=1000, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    url = models.URLField(max_length=1000, blank=True, null=True)
    email = models.EmailField(max_length=500, blank=True, null=True)
    status = models.CharField(max_length=100, blank=True, null=True)
    interpretation_services = models.CharField(max_length=1500, blank=True, null=True)
    application_process = models.CharField(max_length=1000, blank=True, null=True)
    wait_time = models.CharField(max_length=100, blank=True, null=True)
    fees = models.CharField(max_length=250, blank=True, null=True)
    accreditations = models.CharField(max_length=250, blank=True, null=True)
    licenses = models.CharField(max_length=250, blank=True, null=True)
    taxonomy_ids = models.CharField(max_length=500, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'services'
