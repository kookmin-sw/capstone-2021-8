from django.urls import path
from .views import NewsletterEmailView


urlpatterns = [
    path('email/', NewsletterEmailView.as_view())
]