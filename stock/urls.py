from django.urls import path
from .views import ListAllStock,StockInfo


urlpatterns = [
    path('tshirts/',ListAllStock.as_view(), name='tshirt-list'),
    path('tshirts/<int:id>/',StockInfo.as_view(), name='tshirt-info'),
]
