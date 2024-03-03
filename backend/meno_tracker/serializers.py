from rest_framework import serializers
from rest_framework.serializers import SerializerMethodField
from .models import *

from django.contrib.auth import get_user_model, authenticate
from django.utils import timezone


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name',
                  'last_name', 'date_joined', 'id', 'password']
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


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

# class CountBySymptomsSerializer(serializers.Serializer):
#     # date = serializers.DateField()
#     truncated_date = serializers.DateField()

#     symptom_count = serializers.IntegerField()
class CountBySymptomsSerializer(serializers.Serializer):
    date = serializers.DateField()  # Assuming 'date' is already a datetime.date field
    symptom_count = serializers.IntegerField()

    def to_representation(self, instance):
        return {
            'date': instance['date'],
            'symptom_count': instance['symptom_count'],
        }
    
# class Track_Symptom_TreatmentSerializer(serializers.Serializer):
#     track_symptom = Track_SymptomSerializer()
#     symptom_treatment = serializers.SerializerMethodField()

#     def get_symptom_treatment(self, obj):
#         # Fetch Symptom_Treatment data related to the Track_Symptom instance
#         symptom_treatment_data = Symptom_Treatment.objects.filter(symptom_id=obj.track_symptom.symptom.id)
        
#         # Serialize the data
#         serializer = Symptom_TreatmentSerializer(symptom_treatment_data, many=True)
#         return serializer.data

class Track_Symptom_TreatmentSerializer(serializers.Serializer):
    track_symptom = Track_SymptomSerializer()
    symptom_treatment = Symptom_TreatmentSerializer()

    def to_representation(self, instance):
        track_symptom_data = instance
        symptom_treatment_data = instance.symptom_treatment

        joined_data = {
            'track_symptom': Track_SymptomSerializer(track_symptom_data).data,
            'symptom_treatment_data': Symptom_TreatmentSerializer(symptom_treatment_data).data,
        }

        return joined_data

class ProfileSerializer(serializers.ModelSerializer):
    user_id = UserSerializer()
    id = serializers.UUIDField() 

    class Meta: 
        model = Profile
        fields = ['id', 'user_id', 'birthdate', 'menopause', 'last_period', 'daily_reminders', 'current_treatments']
        read_only_fields = ['id']
    
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    def create(self, validated_data):
        user_id = validated_data.get('user_id')
        
        profile = Profile.objects.create(
            user_id=user_id,
            birthdate=validated_data.get('birthdate'),
            menopause=validated_data.get('menopause'),
            last_period=validated_data.get('last_period'),
            daily_reminders=validated_data.get('daily_reminders'),
            current_treatments=validated_data.get('current_treatments')
        )
        return profile
    
class BaseSymptomSerializer(serializers.ModelSerializer):
    profile_id = ProfileSerializer()
    symptom_id = SymptomSerializer()

    class Meta: 
        model = BaseSymptoms
        fields = ['id', 'profile_id', 'symptom_id', 'severity', 'starting_date']
    
    symptom_id = serializers.PrimaryKeyRelatedField(queryset=Symptom.objects.all())
    profile_id = serializers.PrimaryKeyRelatedField(queryset=Profile.objects.all())

    def create(self, validated_data):
        profile_id = validated_data.get('profile_id')
        symptom_id = validated_data.get('symptom_id')
        
        base_symptom = BaseSymptoms.objects.create(
            profile_id=profile_id,
            symptom_id=symptom_id,
            severity=validated_data.get('severity'),
            starting_date=validated_data.get('starting_date'),
        )
        return base_symptom