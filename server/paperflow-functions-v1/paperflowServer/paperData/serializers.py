from rest_framework import serializers
from .models import PaperInfo

class PaperInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaperInfo
        fields = '__all__'
