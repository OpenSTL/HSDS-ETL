from django.db import models
from uuid import uuid4

class Contact(models.Model):
    id                     = models.UUIDField(primary_key=True,
                                              default=uuid4,
                                              editable=False)

    organization_id        = models.ForeignKey('serviceData.Organizations',
                                               on_delete=models.CASCADE,
                                               blank=True,
                                               null=True)

    service_id             = models.ForeignKey('serviceData.Services',
                                               on_delete=models.CASCADE,
                                               blank=True,
                                               null=True)
                            # service_at_location_id = models.ForeignKey('serviceData.Ser')

    name                   = models.CharField(max_length=500,
                                              blank=True,
                                              null=True)

    title                  = models.CharField(max_length=500,
                                              blank=True,
                                              null=True)

    department             = models.CharField(max_length=500,
                                              blank=True,
                                              null=True)

    email                  = models.EmailField(max_length=750,
                                               blank=True,
                                               null=True)

    class Meta:
        db_table = 'contact'
