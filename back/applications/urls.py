from django.urls import path
from .views import ApplicationCreateView, ApplicationListView, ApplicationDeleteView

urlpatterns = [
    path("create/", ApplicationCreateView.as_view(), name="application-create"),
    path("", ApplicationListView.as_view(), name="application-list"),
    path("<int:pk>/delete/", ApplicationDeleteView.as_view(), name="application-delete"),
]