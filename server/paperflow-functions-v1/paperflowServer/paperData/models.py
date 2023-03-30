from django.db import models

# Create your models here.
class PaperInfo(models.Model):
    paper_id = models.CharField(max_length=50, primary_key=True)
    title = models.TextField()
    abstract = models.TextField(blank=True)
    pdf_urls = models.TextField()
    authors = models.TextField()
    citation_list = models.TextField()
    reference_list = models.TextField()
    field_list = models.TextField()
    publication_year = models.CharField(max_length=4)
    venue = models.TextField(blank=True)
    journal_name = models.TextField(blank=True)
    journal_volume = models.TextField(blank=True)
    journal_pages = models.TextField(max_length=20, blank=True)
    doi = models.TextField(blank=True)
    mag_id = models.CharField(max_length=10, blank=True)
