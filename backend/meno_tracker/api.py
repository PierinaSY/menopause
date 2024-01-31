from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework import mixins

from django.contrib.auth import get_user_model

# from django.contrib.auth.models import User
from .models import *
from .serializers import *

from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView

from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated


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
        print("User ID:", user_id)

        data = Track_Symptom.objects.filter(user_id=user_id).select_related('symptom_id').values('id', 'duration', 'date', 'notes', 'symptom_id__id', 'symptom_id__name')
        # data = Track_Symptom.objects.filter(user_id=user_id).values('id', 'duration', 'date', 'notes', 'symptom_id')

        print("Query Result:", data)

        # serializer = Track_SymptomSerializer(data, many=True)  
        # print("Serialized Data:", serializer.data)

        return Response(data)

