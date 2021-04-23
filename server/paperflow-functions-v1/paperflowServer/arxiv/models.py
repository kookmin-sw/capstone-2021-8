from django.db import models

# Create your models here.
class PaperInfo(models.Model):
    paper_id = models.IntegerField(primary_key=True)
    title = models.TextField()
    arxiv_num = models.CharField(max_length=20)
    pdf_url = models.CharField(max_length=50)
    publication_year = models.CharField(max_length=4)
    publication_month = models.CharField(max_length=2)

class AbstractInfo(models.Model):
    paper = models.ForeignKey('PaperInfo', on_delete=models.CASCADE, related_name='abstract')
    abstract = models.TextField()

class AuthorsInfo(models.Model):
    paper = models.ForeignKey('PaperInfo', on_delete=models.CASCADE, related_name='author')
    author = models.CharField(max_length=100)

class ThemeInfo(models.Model):
    paper = models.ForeignKey('PaperInfo', on_delete=models.CASCADE, related_name='theme')
    theme = models.CharField(max_length=100)
