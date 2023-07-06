from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('',views.getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('notes/',views.getNotes,name='notes_list'),
    path('notes-detail/<str:pk>/',views.getNotesDetails,name='notes_details'),
    path('notes-create/',views.notesCreate,name='notes_create'),
    path('notes-update/<str:pk>/',views.notesUpdate,name='notes_update'),
    path('notes-delete/<str:pk>/',views.notesDelete,name='notes_delete'),
    
]
