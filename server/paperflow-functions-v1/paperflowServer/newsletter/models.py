from django.db import models


class NewsletterEmail(models.Model):
    email = models.EmailField(max_length=128)
