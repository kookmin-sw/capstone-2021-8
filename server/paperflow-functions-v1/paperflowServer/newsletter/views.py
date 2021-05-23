from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import NewsletterEmailSerializer
from .models import NewsletterEmail
from .apis import send_newsletter


class NewsletterEmailView(APIView):
    def get(self, request):
        emails = NewsletterEmail.objects.all()
        serializer = NewsletterEmailSerializer(emails, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = NewsletterEmailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SendingNewsletterView(APIView):
    def get(self, request):
        emails = NewsletterEmail.objects.all()
        send_newsletter(emails)
        return Response({}, status=status.HTTP_200_OK)