from django.contrib import admin

# Register your models here.
from .models import PaperInfo, AbstractInfo, AuthorsInfo, ThemeInfo

admin.site.register(PaperInfo)
admin.site.register(AbstractInfo)
admin.site.register(AuthorsInfo)
admin.site.register(ThemeInfo)