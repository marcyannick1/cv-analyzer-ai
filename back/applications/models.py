from django.db import models
from django.conf import settings

class Application(models.Model):
    job = models.ForeignKey(
        "jobs.Job",
        on_delete=models.CASCADE,
        related_name="applications"
    )
    candidate = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'candidate'},
        related_name="applications"
    )
    cover_letter = models.FileField(upload_to="cover_letters/", blank=True, null=True)
    cv = models.FileField(upload_to="cvs/", blank=True, null=True)
    score = models.FloatField(default=0)

    status = models.CharField(
        max_length=20,
        choices=(
            ("pending", "En attente"),
            ("reviewed", "Revue"),
            ("accepted", "Acceptée"),
            ("rejected", "Rejetée"),
        ),
        default="pending"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "applications"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.candidate.email} → {self.job.title}"