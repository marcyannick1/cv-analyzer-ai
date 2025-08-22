from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Application
from .utils import send_email


@receiver(post_save, sender=Application)
def notify_application(sender, instance, created, **kwargs):
    job = instance.job
    candidate = instance.candidate
    recruiter = job.recruiter

    if created:
        # Mail au candidat
        send_email(
            subject=f"Candidature reçue pour {job.title}",
            message=f"Bonjour {candidate.email},\n\nVotre candidature pour le poste {job.title} a bien été reçue.",
            recipient_list=[candidate.email]
        )

        # Mail au recruteur
        send_email(
            subject=f"Nouvelle candidature pour {job.title}",
            message=f"Bonjour {recruiter.email},\n\n{candidate.email} vient de postuler au poste {job.title}.",
            recipient_list=[recruiter.email]
        )

    # 🔹 Changement de statut
    else:
        pass
        # On peut vérifier si le champ status a changé
        # Pour cela il vaut mieux utiliser django-model-utils FieldTracker
        # send_email(
        #     subject=f"Statut de votre candidature pour {job.title}",
        #     message=f"Bonjour {candidate.email},\n\nLe statut de votre candidature a été mis à jour : {instance.status}.",
        #     recipient_list=[candidate.email]
        # )