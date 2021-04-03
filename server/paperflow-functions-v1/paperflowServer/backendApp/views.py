import csv
from .models import PaperInfo, AbstractInfo, AuthorsInfo, ThemeInfo, ReferenceInfo, ReferenceNotInfo, RealErrorInfo
import os
import pandas as pd
from django.shortcuts import HttpResponse


def index(request):
    return HttpResponse("Hello, world!")


'''
# with open("C:\\Users\\tykim\\OneDrive\\바탕 화면\\KTY\\국민대학교\\국민대 과제 및 공부 자료\\2021-1학기\\캡스톤프로젝트\\Code\\capstone-2021-8\\server\\paperflow-functions-v1\\paperflowServer\\backendApp\\ResearchGate\\Paper Info.csv", 'r', encoding='utf-8') as f1:
dr1 = pd.read_csv("C:\\Users\\tykim\\OneDrive\\바탕 화면\\KTY\\국민대학교\\국민대 과제 및 공부 자료\\2021-1학기\\캡스톤프로젝트\\Code\\capstone-2021-8\\server\\paperflow-functions-v1\\paperflowServer\\Paper Info.csv", encoding='utf-8')
s1 = pd.DataFrame(dr1)
ss1 = []
for i in range(len(s1)):
    st1 = (s1['PaperID'][i], s1['PaperTitle'][i], s1['PublicationDate'][i], s1['PaperLocated'][i], s1['DOI']
           [i], s1['#Citation'][i], s1['#Reference'][i], s1['#Existed Reference'][i], s1['#Not in RG List'][i])
    ss1.append(st1)

for i in range(len(s1)):
    PaperInfo.objects.create(
        paperID=ss1[i][0], paperTitle=ss1[i][1], publicationDate=ss1[i][2], paperLocation=ss1[i][3], paperDOI=ss1[i][
            4], numCitation=ss1[i][5], numReference=ss1[i][6], numExistedReference=ss1[i][7], numNotinRGReference=ss1[i][8]
    )

with open("./ResearchGate/Abstract Info.csv", 'r') as f2:
    dr2 = csv.DictReader(f2)
    s2 = pd.DataFrame(dr2)
ss2 = []

for i in range(len(s2)):
    st2 = (s2['PaperID'][i], s2['Abstract'][i])
    ss2.append(st2)

for i in range(len(s2)):
    AbstractInfo.objects.create(
        paperID=ss2[i][0], abstract=ss2[i][1]
    )

with open("./ResearchGate/Authors Info.csv", 'r') as f3:
    dr3 = csv.DictReader(f3)
    s3 = pd.DataFrame(dr3)
ss3 = []

for i in range(len(s3)):
    st3 = (s3['PaperID'][i], s3['Authors'][i])
    ss3.append(st3)

for i in range(len(s3)):
    AuthorsInfo.objects.create(
        paperID=ss3[i][0], author=ss3[i][1]
    )

with open("./ResearchGate/Reference Info.csv", 'r') as f4:
    dr4 = csv.DictReader(f4)
    s4 = pd.DataFrame(dr4)
ss4 = []

for i in range(len(s4)):
    st4 = (s4['PaperID'][i], s4['Reference In RG'][i])
    ss4.append(st4)

for i in range(len(s4)):
    ThemeInfo.objects.create(
        paperID=ss4[i][0], referenceIdx=ss4[i][1]
    )

with open("./ResearchGate/Theme Info.csv", 'r') as f5:
    dr5 = csv.DictReader(f5)
    s5 = pd.DataFrame(dr5)
ss5 = []

for i in range(len(s5)):
    st5 = (s5['PaperID'][i], s5['Theme'][i])
    ss5.append(st5)

for i in range(len(s5)):
    ThemeInfo.objects.create(
        paperID=ss5[i][0], theme=ss5[i][1]
    )

with open("./ResearchGate/Reference Not in RG Info.csv", 'r') as f6:
    dr6 = csv.DictReader(f6)
    s6 = pd.DataFrame(dr6)
ss6 = []

for i in range(len(s6)):
    st6 = (s6['PaperID'][i], s6['Reference not in RG'][i])
    ss6.append(st6)

for i in range(len(s6)):
    ReferenceNotInfo.objects.create(
        paperID=ss6[i][0], notReference=ss6[i][1]
    )

with open("./ResearchGate/Real Error.csv", 'r') as f7:
    dr7 = csv.DictReader(f7)
    s7 = pd.DataFrame(dr7)
ss7 = []

for i in range(len(s7)):
    st7 = (s7['PaperID'][i], s7['#Real Error'][i])
    ss7.append(st7)

for i in range(len(s7)):
    RealErrorInfo.objects.create(
        paperID=ss7[i][0], errCnt=ss7[i][1]
    )
'''
