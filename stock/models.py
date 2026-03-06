from django.db import models


class TShirt(models.Model):
    SIZE_CHOICES = (
        ("XS", "Extra Small"),
        ("S", "Small"),
        ("M", "Medium"),
        ("L", "Large"),
        ("XL", "Extra Large"),
        ("XXL", "Double XL"),
    )

    collection_name = models.CharField(max_length=200)
    size = models.CharField(max_length=3, choices=SIZE_CHOICES)
    instock = models.IntegerField()
    #image = models.ImageField(upload_to='tshirts/')
    # Change ImageField to URLField for external links only for testing purpose
    image = models.URLField(max_length=500)
    price = models.DecimalField(max_digits=10, decimal_places=2)
