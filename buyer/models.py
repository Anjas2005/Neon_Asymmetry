# buyer/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
from stock.models import TShirt

class User(AbstractUser):
    # Optional: add custom fields here
    phone_number = models.CharField(max_length=15, blank=True, null=True)

class Cart(models.Model):
    cart_owner = models.OneToOneField(User, on_delete=models.CASCADE,related_name="cart")
    created_at = models.DateTimeField(auto_now=True)

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete= models.CASCADE, related_name = "items")
    tshirt = models.ForeignKey(TShirt, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["cart","tshirt"],
                name="unique_cart_tshirt",
            )
        ]    
        
