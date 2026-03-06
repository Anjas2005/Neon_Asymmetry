from django.contrib import admin
from django.urls import path,include

from .views import CreateUserView,AddToCartView,RemoveFromCartView,ReduceCartItemView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns= [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("register/", CreateUserView.as_view(), name="register"),
    path("add_cart/",AddToCartView.as_view(),name="add_cart"),
    path("remove_cart/",RemoveFromCartView.as_view(),name="remove_cart"),
    path("reduce_cart/",ReduceCartItemView.as_view(),name="reduce_cart"),
]
