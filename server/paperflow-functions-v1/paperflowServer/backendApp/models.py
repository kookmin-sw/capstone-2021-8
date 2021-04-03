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


class AbstractInfo(models.Model):
    paperID = models.CharField(max_length=9)
    abstract = models.TextField()


class AuthorsInfo(models.Model):
    id = models.IntegerField(primary_key=True)
    paperID = models.CharField(max_length=9)
    author = models.TextField()


class ThemeInfo(models.Model):
    id = models.IntegerField(primary_key=True)
    paperID = models.CharField(max_length=9)
    theme = models.TextField(null=True)


class ReferenceInfo(models.Model):
    id = models.IntegerField(primary_key=True)
    paperID = models.CharField(max_length=9)
    referenceIdx = models.TextField()


class ReferenceNotInfo(models.Model):
    id = models.IntegerField(primary_key=True)
    paperID = models.CharField(max_length=9)
    notReference = models.TextField()


class RealErrorInfo(models.Model):
    id = models.IntegerField(primary_key=True)
    paperID = models.CharField(max_length=9)
    errCnt = models.IntegerField()
