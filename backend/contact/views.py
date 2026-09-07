from rest_framework.generics import CreateAPIView
from rest_framework.throttling import AnonRateThrottle

from .models import ContactMessage
from .serializers import ContactMessageSerializer


class ContactMessageCreateAPI(CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    throttle_classes = [AnonRateThrottle]