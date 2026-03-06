from .models import TShirt
from rest_framework.permissions import AllowAny,IsAuthenticated
from .serializers import TShirtSerializer
from rest_framework.generics import ListAPIView,RetrieveAPIView



class ListAllStock(ListAPIView):
    queryset= TShirt.objects.all() 
    serializer_class = TShirtSerializer
    permission_classes = [IsAuthenticated] # Only valid tokens can access


class StockInfo(RetrieveAPIView):
    serializer_class = TShirtSerializer
    queryset = TShirt.objects.all()
    lookup_field = "id"

    
