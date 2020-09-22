from django.db import models
from uuid import uuid4


class Organizations(models.Model):
    id                = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name              = models.CharField(max_length=500, blank=True, null=True)
    alternate_name    = models.CharField(max_length=500, blank=True, null=True)
    description       = models.TextField(blank=True, null=True)
    email             = models.EmailField(max_length=500, blank=True, null=True)
    url               = models.URLField(max_length=1000, blank=True, null=True)
    tax_status        = models.CharField(max_length=100, blank=True, null=True) # Do we need control on types?
    tax_id            = models.CharField(max_length=50, blank=True, null=True)
    year_incorporated = models.CharField(max_length=50, blank=True, null=True)
    legal_status      = models.CharField(max_length=250, blank=True, null=True) # Do we need control on types?

    class Meta:
        db_table = 'organizations'
