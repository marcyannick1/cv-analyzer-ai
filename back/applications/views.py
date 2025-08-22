from rest_framework import generics, permissions

from ai.services import extract_text, analyze_cv
from .models import Application
from .serializers import ApplicationSerializer
import tempfile


# ✅ Un candidat peut créer sa candidature
class ApplicationCreateView(generics.CreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]


    def perform_create(self, serializer):
        cv_file = self.request.FILES.get("cv")
        cv_text = ""
        if cv_file:
            # Sauvegarder dans un fichier temporaire pour l’analyse
            with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
                for chunk in cv_file.chunks():
                    tmp.write(chunk)
                tmp_path = tmp.name
            cv_text = extract_text(tmp_path)

        # Récupérer description du job
        job = serializer.validated_data.get("job")
        job_text = getattr(job, "description", "") if job else ""

        # Analyse CV ↔ offre
        result = analyze_cv(cv_text, job_text)

        score_final = result.get("score_final", 0)

        serializer.save(candidate=self.request.user, score=score_final)

# ✅ Lister les candidatures (recruteur/admin)
class ApplicationListView(generics.ListAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        user = self.request.user
        if user.role == "candidate":
            return Application.objects.filter(candidate=user)  # un candidat voit seulement les siennes
        return Application.objects.all()  # recruteur/admin voient toutes

# ✅ Supprimer une candidature
class ApplicationDeleteView(generics.DestroyAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == "candidate":
            return Application.objects.filter(candidate=user)
        return Application.objects.all()