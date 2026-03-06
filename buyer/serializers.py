from django.contrib.auth.models import User
from rest_framework import serializers
from buyer.models import Cart,CartItem
from stock.models import TShirt



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        # This creates the user and automatically hashes the password
        user = User.objects.create_user(**validated_data)
        return user

class AddToCartSerializer(serializers.Serializer):
    tshirt_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1,default=1)

    def validate_tshirt_id(self,value):
        if not TShirt.objects.filter(id=value).exists():
            raise serializers.ValidationError("TShirt does not exist")
        return value
    def create(self,validated_data):
        user = self.context["request"].user
        tshirt_id = validated_data["tshirt_id"]
        qty = validated_data["quantity"]

        cart, _ = Cart.objects.get_or_create(owner=user)
        cart_item, created = CartItem.objects.get_or_create(
            cart = cart,
            tshirt_id = tshirt_id,
            defaults = {"quantity":qty}
        )
        if not created:
            cart_item.quantity += qty
            cart_item.save()
        return cart_item

class RemoveFromCartSerializer(serializers.Serializer):
    tshirt_id = serializers.IntegerField()

    def validate_tshirt_id(self,value):
        if not TShirt.objects.filter(id=value).exists():
            raise serializers.ValidationError("TShirt does not exist")
        return value
    
    def delete(self):
        user = self.context["request"].user
        tshirt_id = self.validated_data["tshirt_id"]

        cart = Cart.objects.filter(cart_owner=user).first()
        if not cart:
            raise serializers.ValidationError("Cart Does Not Exist")

        deleted,_ = CartItem.objects.filter(
            cart=cart,
            tshirt_id=tshirt_id,
        ).delete()

        if deleted==0:
            raise serializers.ValidationError("Item not in cart")

        return {"message":"Item removed from the cart"}

class ReduceCartItemSerializer(serializers.Serializer):
    tshirt_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1,default=1)

    def validated_tshirt_id(self,value):
        if not TShirt.objects.filter(id=value).exists():
            raise serializers.ValidationError("TShirt Does Not Exist")
        return value
    def create(self, validated_data):
        user = self.context["request"].user
        tshirt_id = validated_data["tshirt_id"]
        qty = validated_data["quantity"]

        cart = Cart.objects.filter(cart_owner=user).first()
        if not cart:
            raise serializers.ValidationError("Cart does not exist")

        cart_item = CartItem.objects.filter(
            cart=cart,
            tshirt_id=tshirt_id
        ).first()

        if not cart_item:
            raise serializers.ValidationError("Item not in cart")

        cart_item.quantity -= qty

        if cart_item.quantity <= 0:
            cart_item.delete()
            return {"message": "Item removed from cart"}

        cart_item.save()
        return cart_item
































