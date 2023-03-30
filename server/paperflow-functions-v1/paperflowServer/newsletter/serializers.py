from rest_framework import serializers
from .models import NewsletterEmail


class NewsletterEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterEmail
        fields = '__all__'
