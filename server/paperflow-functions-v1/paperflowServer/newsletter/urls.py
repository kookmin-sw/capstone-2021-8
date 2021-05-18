from django.urls import path
from .views import NewsletterEmailView, SendingNewsletterView


urlpatterns = [
    path('email/', NewsletterEmailView.as_view()),
    path('newsletter/', SendingNewsletterView.as_view()),
]