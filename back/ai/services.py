import spacy
from transformers import pipeline
from sentence_transformers import SentenceTransformer, util
import PyPDF2
import re


def extract_text(pdf_file):
    """
    Extrait le texte d'un fichier PDF.
    """
    try:
        with open(pdf_file, "rb") as fichier_pdf:
            lecteur_pdf = PyPDF2.PdfReader(fichier_pdf)

            texte_complet = ""
            for page in lecteur_pdf.pages:
                texte_page = page.extract_text()
                if texte_page:
                    texte_complet += texte_page + "\n"

            return texte_complet
    except Exception as e:
        print(f"Erreur lors de l'extraction du PDF: {e}")
        return ""


try:
    nlp = spacy.load("fr_core_news_sm")
except OSError:
    print("Téléchargement du modèle spaCy français...")
    from spacy.cli import download

    download("fr_core_news_sm")
    nlp = spacy.load("fr_core_news_sm")

# NER
try:
    ner_model = pipeline(
        task="ner",
        model="distilbert/distilbert-base-uncased",
        grouped_entities=True,
        aggregation_strategy="simple"
    )
except Exception as e:
    print(f"Erreur lors du chargement du modèle NER: {e}")
    ner_model = None

# Sentiment
try:
    sentiment_model = pipeline(
        task="sentiment-analysis",
        model="nlptown/bert-base-multilingual-uncased-sentiment"
    )
except Exception as e:
    print(f"Erreur lors du chargement du modèle de sentiment: {e}")
    sentiment_model = None

# Similarité sémantique
try:
    embedding_model = SentenceTransformer(
        "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
    )
except Exception as e:
    print(f"Erreur lors du chargement du modèle d'embedding: {e}")
    embedding_model = None


def preprocess_text(text):
    """
    Nettoie et préprocesse le texte.
    """
    if not text:
        return ""

    # Supprimer les caractères non désirés et les espaces multiples
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^\w\s.,;:!?()\-]', ' ', text)

    return text.strip()


def extract_skills_spacy(doc):
    """
    Extrait les compétences potentielles avec des règles basées sur spaCy.
    """
    skills = set()

    # Chercher des noms suivis de mots-clés techniques
    for token in doc:
        if token.pos_ in ["NOUN", "PROPN"] and len(token.text) > 3:
            # Filtrer certains mots communs
            if token.text.lower() not in ["année", "expérience", "projet", "travail", "entreprise"]:
                skills.add(token.text.lower())

    # Chercher des modèles spécifiques (ex: "Python", "Django", etc.)
    technical_terms = ["python", "java", "javascript", "django", "react", "sql", "html", "css",
                       "machine learning", "ai", "développement", "programmation", "analyse", "gestion"]

    for term in technical_terms:
        if term in doc.text.lower():
            skills.add(term)

    return list(skills)[:15]  # Retourner les 15 premières compétences


def analyze_cv(cv_text: str, job_text: str):
    """
    Analyse un CV et le compare à une offre d'emploi.
    Retourne les infos extraites + un score final.
    """
    if not cv_text or not job_text:
        return {"erreur": "Texte du CV ou de l'offre d'emploi manquant"}

    # Prétraitement du texte
    cv_text_clean = preprocess_text(cv_text)
    job_text_clean = preprocess_text(job_text)

    # Prétraitement avec spaCy
    doc = nlp(cv_text_clean)

    # Extraction des entités (NER)
    entreprises = []
    formations = []

    if ner_model:
        try:
            entities = ner_model(cv_text_clean[:512])  # Limiter la taille pour éviter les timeouts
            for e in entities:
                if e['entity_group'] == "ORG":
                    entreprises.append(e['word'])
                elif e['entity_group'] in ["MISC", "PER"]:
                    formations.append(e['word'])
        except Exception as e:
            print(f"Erreur lors de l'extraction NER: {e}")

    # Extraction des compétences
    competences = extract_skills_spacy(doc)

    # Analyse de sentiment
    sentiment = "Non disponible"
    if sentiment_model:
        try:
            # Prendre un extrait représentatif (premières phrases)
            sentences = cv_text_clean.split('.')
            excerpt = '.'.join(sentences[:3])[:500]  # Premières phrases, max 500 caractères
            if excerpt:
                sentiment_result = sentiment_model(excerpt)
                sentiment = sentiment_result[0]['label']
        except Exception as e:
            print(f"Erreur lors de l'analyse de sentiment: {e}")

    # Similarité sémantique entre CV et offre
    similarite = 0
    if embedding_model:
        try:
            # Utiliser des extraits pour éviter les problèmes de mémoire
            cv_excerpt = cv_text_clean[:1000]  # Premier 1000 caractères
            job_excerpt = job_text_clean[:1000]  # Premier 1000 caractères

            cv_emb = embedding_model.encode(cv_excerpt, convert_to_tensor=True)
            job_emb = embedding_model.encode(job_excerpt, convert_to_tensor=True)
            similarite = util.cos_sim(cv_emb, job_emb).item()
        except Exception as e:
            print(f"Erreur lors du calcul de similarité: {e}")

    # Score final pondéré
    score_final = 0
    try:
        score_final = (
                              (similarite * 0.6) +  # similarité CV ↔ annonce
                              (len(competences) / 20 * 0.2) +  # diversité des compétences
                              (1 if sentiment in ["5 stars", "4 stars"] else 0.5) * 0.1
                      ) * 100

        score_final = max(0, min(100, round(score_final, 2)))
    except Exception as e:
        print(f"Erreur lors du calcul du score: {e}")

    return {
        "competences": competences,
        "entreprises": list(set(entreprises))[:5],  # Éviter les doublons
        "formations": list(set(formations))[:5],  # Éviter les doublons
        "sentiment": sentiment,
        "similarite": round(similarite, 2),
        "score_final": score_final
    }
