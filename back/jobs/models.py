from django.db import models

class Job(models.Model):
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True, null=True)
    contractType = models.CharField(max_length=50, blank=True, null=True)
    publishDate = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    experience = models.CharField(max_length=50, blank=True, null=True)
    url = models.URLField(blank=True, null=True)

    salary = models.JSONField(null=True, blank=True)
    skills = models.JSONField(null=True, blank=True)
    companyInfo = models.JSONField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "jobs"
        ordering = ["-publishDate", "-created_at"]

    def __str__(self):
        return self.title
