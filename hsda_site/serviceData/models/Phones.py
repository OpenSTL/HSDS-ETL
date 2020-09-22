from django.db import models
from uuid import uuid4
from phonenumber_field.modelfields import PhoneNumberField
from pycountry import languages

languageList = [(lang.alpha_2, lang.name) for lang in languages if hasattr(lang, 'alpha_2')]

class Phones(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    location_id = models.ForeignKey('serviceData.Locations', on_delete=models.CASCADE, blank=True, null=True)
    service_id = models.ForeignKey('serviceData.Services', on_delete=models.CASCADE, blank=True, null=True)
    organization_id = models.ForeignKey('serviceData.Organizations', on_delete=models.CASCADE, blank=True, null=True)
    contact_id = models.ForeignKey('serviceData.Contact', on_delete=models.CASCADE, blank=True, null=True)
    service_at_location_id = models.CharField(max_length=100, blank=True, null=True)
    number = PhoneNumberField(max_length=50, blank=True, null=True)
    extension = models.IntegerField(blank=True, null=True)
    type = models.CharField(max_length=100, blank=True, null=True) # Do we need control on types?
    department = models.CharField(max_length=250, blank=True, null=True)
    language = models.CharField(max_length=100, blank=True, null=True, choices=languageList, default='en') # Do we need control on types?
    description = models.CharField(max_length=250, blank=True, null=True)

    class Meta:
        db_table = 'phones'
