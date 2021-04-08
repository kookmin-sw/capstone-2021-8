from django.db import models

# Create your models here.

class PaperInfo(models.Model):
    paperID = models.CharField(max_length=9, primary_key=True)
    paperTitle = models.TextField()
    publicationDate = models.CharField(max_length=7)
    paperLocation = models.TextField()
    paperDOI = models.TextField()
    numCitation = models.IntegerField()
    numReference = models.IntegerField()
    numExistedReference = models.IntegerField()
    numNotinRGReference = models.IntegerField()

    def __str__(self):
        return str(self.paperID)

class AbstractInfo(models.Model):
    paperID = models.CharField(max_length=9)
    abstract = models.TextField()


class AuthorsInfo(models.Model):
    id = models.IntegerField(primary_key=True)
    paperID= models.ForeignKey('PaperInfo', db_column='paperID' ,on_delete=models.CASCADE, default=1)
    author = models.TextField()


class ThemeInfo(models.Model):
    id = models.IntegerField(primary_key=True)
    paperID = models.ForeignKey('PaperInfo', on_delete=models.CASCADE, default=1)
    theme = models.TextField(null=True)


class ReferenceInfo(models.Model):
    id = models.IntegerField(primary_key=True)
    paperID = models.ForeignKey('PaperInfo', on_delete=models.CASCADE, default=1)
    referenceIdx = models.TextField()


class ReferenceNotInfo(models.Model):
    id = models.IntegerField(primary_key=True)
    paperID = models.ForeignKey('PaperInfo', on_delete=models.CASCADE, default=1)
    notReference = models.TextField()


class RealErrorInfo(models.Model):
    id = models.IntegerField(primary_key=True)
    paperID = models.ForeignKey('PaperInfo', on_delete=models.CASCADE, default=1)
    errCnt = models.IntegerField()
