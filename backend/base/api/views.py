
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import NoteSerializer
from base.models import Note

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/token/',
        'api/token/refresh/',
        'api/notes/',
        'api/notes-detail/<str:pk>/',
        'api/notes-create/',
        'api/notes-update/<str:pk>/',
        'api/notes-delete/<str:pk>/'
        
    ]
    
    return Response(routes)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    notes = Note.objects.filter(user=user)
    serializer = NoteSerializer(notes, many = True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotesDetails(request,pk):
    user = request.user
    notes = Note.objects.get(user=user,id=pk)
    serializer = NoteSerializer(notes, many = False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def notesCreate(request):
    user = request.user
    data = request.data
    notes = Note.objects.create(
        body=data['body']
    )
    notes.user=user
    notes.save()
    serializer = NoteSerializer(notes, many = False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def notesUpdate(request,pk):
    user = request.user
    notes = Note.objects.get(user=user,id=pk)
    serializer = NoteSerializer(instance=notes, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)  

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def notesDelete(request,pk):
    user = request.user
    notes = Note.objects.get(user=user,id=pk)
    notes.delete()
    return Response("Item deleted")  