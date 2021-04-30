from django.contrib import admin
from .models import NewsletterEmail

class NewsletterEmailAdmin(admin.ModelAdmin):
    fields = ['email']

admin.site.register(NewsletterEmail, NewsletterEmailAdmin)
