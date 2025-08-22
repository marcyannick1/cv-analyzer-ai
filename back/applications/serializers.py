from rest_framework import serializers
from .models import Application

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ["id", "job", "candidate", "cover_letter", "cv", "status", "score", "created_at"]
        read_only_fields = ["id", "candidate", "status", "score", "created_at"]