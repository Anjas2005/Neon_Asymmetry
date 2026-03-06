from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer,AddToCartSerializer,ReduceCartItemSerializer,RemoveFromCartSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

# 1. Registration View
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny] # Important: Allow non-authenticated users to register

# 2. Add to cart view

class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request):
        serializer = AddToCartSerializer(
            data=request.data,
            context={"request":request}
        )
        serializer.is_valid(raise_exception=True)
        item = serializer.save()
        return Response({"message":"Item Added","qty":item.quantity})

class RemoveFromCartView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        serializer = RemoveFromCartSerializer(
            data=request.data,
            context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        result = serializer.delete()
        return Response(result)


class ReduceCartItemView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ReduceCartItemSerializer(
            data=request.data,
            context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        result = serializer.save()
        return Response(result)
