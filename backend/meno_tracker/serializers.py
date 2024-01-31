from rest_framework import serializers
from rest_framework.serializers import SerializerMethodField
from .models import *

from django.contrib.auth import get_user_model, authenticate

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name',
                  'last_name', 'date_joined', 'id', 'password']
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# class ProfileSerializer(serializers.ModelSerializer):
#     user_id = UserSerializer()

#     class Meta:
#         model = Profile
#         fields = ['user_id', 'birthdate', 'menopause', 'last_period', 'daily_reminders']
    
#     user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())


#     def create(self, validated_data):
#         user_data = self.initial_data.get('user_id')
#         user_model = User(**{**validated_data,
#                              'user_id': User.objects.get(pk=user_data['id'])
#                              })
#         user_model.save()
#         return user_model
    

class SymptomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Symptom
        fields = ['id', 'name', 'description']

class TreatmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Treatment
        fields = ['id', 'name', 'description']

class Symptom_TreatmentSerializer(serializers.ModelSerializer):
    symptom_id = SymptomSerializer()
    treatment_id = TreatmentSerializer()
    
    class Meta:
        model = Symptom_Treatment
        fields = ['id', 'symptom_id', 'treatment_id']
        depth = 1

    symptom_id = serializers.PrimaryKeyRelatedField(queryset=Symptom.objects.all())
    treatment_id = serializers.PrimaryKeyRelatedField(queryset=Treatment.objects.all())

class Track_SymptomSerializer(serializers.ModelSerializer):
    user_id = UserSerializer()
    symptom_id = SymptomSerializer()

    class Meta: 
        model = Track_Symptom
        fields = ['id', 'user_id', 'symptom_id', 'severity', 'mood', 'duration', 'date', 'notes']
    
    symptom_id = serializers.PrimaryKeyRelatedField(queryset=Symptom.objects.all())
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    def create(self, validated_data):
        user_id = validated_data.get('user_id')
        symptom_id = validated_data.get('symptom_id')
        
        track_symptom = Track_Symptom.objects.create(
            user_id=user_id,
            symptom_id=symptom_id,
            severity=validated_data.get('severity'),
            mood=validated_data.get('mood'),
            duration=validated_data.get('duration'),
            date=validated_data.get('date'),
            notes=validated_data.get('notes')
        )
        return track_symptom
    
class Track_SymptomSerializer2(serializers.ModelSerializer):
    class Meta:
        model = Track_Symptom
        fields = '__all__'

class ReportSerializer(serializers.ModelSerializer):
    user_id = UserSerializer()

    class Meta: 
        model = Report
        fields = ['id', 'user_id', 'date', 'file']

    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())


