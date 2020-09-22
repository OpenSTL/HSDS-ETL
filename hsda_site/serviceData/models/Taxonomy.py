from django.db import models
from uuid import uuid4


class Taxonomy(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=250, blank=True, null=True)
    parent_id = models.ForeignKey('Taxonomy', on_delete=models.CASCADE, blank=True, null=True)
    parent_name = models.CharField(max_length=100, blank=True, null=True)
    vocabulary = models.CharField(max_length=250, blank=True, null=True)

    class Meta:
        db_table = 'taxonomy'
