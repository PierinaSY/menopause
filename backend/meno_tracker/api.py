from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework import mixins

from django.contrib.auth import get_user_model

from .models import *
from .serializers import *

from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView

from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated

from django.db.models import Count, Func, F, Value, DateField


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class SymptomList(generics.ListAPIView):
    queryset = Symptom.objects.all()
    serializer_class = SymptomSerializer


class SymptomDetails(mixins.CreateModelMixin, 
                     mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin, 
                     mixins.DestroyModelMixin, 
                     generics.GenericAPIView): 
    queryset = Symptom.objects.all()
    serializer_class = SymptomSerializer
    lookup_field = 'id'

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    

class TreatmentList(generics.ListAPIView):
    queryset = Treatment.objects.all()
    serializer_class = TreatmentSerializer


class TreatmentDetails(mixins.CreateModelMixin, 
                     mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin, 
                     mixins.DestroyModelMixin, 
                     generics.GenericAPIView): 
    queryset = Treatment.objects.all()
    serializer_class = TreatmentSerializer
    lookup_field = 'id'

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    
class Symptom_TreatmentList(generics.ListAPIView):
    queryset = Symptom_Treatment.objects.all()
    serializer_class = Symptom_TreatmentSerializer


class Symptom_TreatmentDetails(mixins.CreateModelMixin, 
                     mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin, 
                     mixins.DestroyModelMixin, 
                     generics.GenericAPIView):
    queryset = Symptom_Treatment.objects.all()
    serializer_class = Symptom_TreatmentSerializer

    lookup_field = 'id'

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        # users = Track_Symptom.objects.filter(user_id__id=id)
        # serializer = Track_SymptomSerializer(users, many=True)
        return self.retrieve(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class Track_SymptomList(generics.ListAPIView):
    queryset = Track_Symptom.objects.all()
    serializer_class = Track_SymptomSerializer


class Track_SymptomDetails(mixins.CreateModelMixin, 
                     mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin, 
                     mixins.DestroyModelMixin, 
                     generics.GenericAPIView): 
    queryset = Track_Symptom.objects.all()
    serializer_class = Track_SymptomSerializer
    lookup_field = 'id'

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        # users = Track_Symptom.objects.filter(user_id__id=id)
        # serializer = Track_SymptomSerializer(users, many=True)
        return self.retrieve(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class ReportList(generics.ListAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer


#Choices for add symptoms 
class GetSymptoms(generics.ListAPIView):
    def get(self, request):
        symptoms = Symptom.objects.all().values('id', 'name')
        return JsonResponse(list(symptoms), safe=False)

class GetSeverityLevels(generics.ListAPIView):
    def get(self, request):
        severity_levels = list(Track_Symptom.Severity.choices)
        return JsonResponse(severity_levels, safe=False)

class GetMoodLevels(generics.ListAPIView):
    def get(self, request):
        mood_levels = list(Track_Symptom.Mood.choices)
        return JsonResponse(mood_levels, safe=False)


class RecordedSymptomsAPIView(APIView):

    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_id = self.request.user.id
        data = Track_Symptom.objects.filter(user_id=user_id).select_related('symptom_id').values('id', 'duration', 'date', 'notes', 'symptom_id__id', 'symptom_id__name')
        return Response(data)

# class TruncDate(Func):
#     function = 'DATE_TRUNC'
#     template = '%(function)s(\'day\', %(expressions)s)'
#     output_field = models.DateTimeField()

class CountByDateAPIView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_id = self.request.user.id
        data = (
            Track_Symptom.objects
            .filter(user_id=user_id)
            .values('date')
            .annotate(symptom_count=Count('symptom_id', distinct=True))
        )
        serializer = CountBySymptomsSerializer(data, many=True)
        return Response(serializer.data)

class CountBySymptomsAPIView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_id = self.request.user.id
        data = (
            Track_Symptom.objects
            .filter(user_id=user_id)
            .values('symptom_id__name')
            .annotate(symptom_count=Count('symptom_id'))
        )
        return Response(data)

class MoodByDateAPIView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_id = self.request.user.id
        data = (
            Track_Symptom.objects
            .filter(user_id=user_id)
            .values('date', 'mood')
            .annotate(mood_count=Count('mood', distinct=True))
        )
        return Response(data)
    
class RecommendationsAPIView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_id = self.request.user.id

        # Retrieve Track_Symptom data based on user_id
        track_symptoms = Track_Symptom.objects.filter(user_id=user_id)

        # Create a dictionary to hold the serialized Symptom_Treatment data
        symptom_treatment_data_dict = {}

        # Loop through each Track_Symptom instance and get the associated Symptom_Treatment data
        for track_symptom in track_symptoms:
            symptom_id = track_symptom.symptom_id_id

            # Check if the symptom ID is not already in the dictionary
            if symptom_id not in symptom_treatment_data_dict:
                # Retrieve Symptom instance
                symptom_data = Symptom.objects.get(id=symptom_id)

                # Retrieve associated Symptom_Treatment instances
                symptom_treatment_data = Symptom_Treatment.objects.filter(symptom_id=symptom_id)

                # Serialize Symptom and Symptom_Treatment data
                symptom_serializer = SymptomSerializer(symptom_data)
                symptom_treatment_serializer = Symptom_TreatmentSerializer(symptom_treatment_data, many=True)

                # Retrieve unique treatment IDs for each symptom
                unique_treatment_ids = symptom_treatment_data.values('treatment_id_id').distinct()

                # Retrieve treatment names and descriptions
                treatments_data = Treatment.objects.filter(id__in=unique_treatment_ids)
                treatments_serializer = TreatmentSerializer(treatments_data, many=True)

                # Add the serialized data to the dictionary
                symptom_treatment_data_dict[symptom_id] = {
                    'symptom': symptom_serializer.data,
                    'treatments': treatments_serializer.data,
                    'symptom_treatments': symptom_treatment_serializer.data,
                }

        # Combine the data into a response
        response_data = {
            'symptom_treatments': list(symptom_treatment_data_dict.values()),
        }

        return Response(response_data, status=status.HTTP_200_OK)

class ProfileDetails(mixins.CreateModelMixin, 
                     mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin, 
                     mixins.DestroyModelMixin, 
                     generics.GenericAPIView): 
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'id'

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)