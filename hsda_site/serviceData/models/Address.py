from django.db import models
from uuid import uuid4
from localflavor.us.models import USPostalCodeField, USStateField
from pycountry import countries


countriesList = [(co.alpha_2, co.name) for co in countries if hasattr(co, 'alpha_2')]

class Address(models.Model):
    id             = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    location_id    = models.ForeignKey('serviceData.Locations', on_delete=models.CASCADE, blank=True, null=True)
    attention      = models.CharField(max_length=500, blank=True, null=True)
    address_1      = models.CharField(max_length=250, blank=True, null=True)
    address_2      = models.CharField(max_length=250, blank=True, null=True)
    address_3      = models.CharField(max_length=250, blank=True, null=True)
    address_4      = models.CharField(max_length=250, blank=True, null=True)
    city           = models.CharField(max_length=250, blank=True, null=True)
    region         = models.CharField(max_length=250, blank=True, null=True)
    state_province = USStateField(max_length=100, blank=True, null=True)
    postal_code    = USPostalCodeField(max_length=50, blank=True, null=True)
    country        = models.CharField(max_length=150, blank=True, null=True, choices=countriesList, default= 'US' )

    class Meta:
        db_table = 'address'
