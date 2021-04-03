import csv
import pandas as pd
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'paperflowServer.settings')
django.setup()

from backendApp.models import PaperInfo, AbstractInfo, AuthorsInfo, ThemeInfo, ReferenceInfo, ReferenceNotInfo, RealErrorInfo
df1 = pd.read_csv('./Paper Info.csv', encoding='utf-8')
ss1 = []
for i in range(len(df1)):
    st1 = (df1['PaperID'][i], df1['PaperTitle'][i], df1['PublicationDate'][i], df1['PaperLocated'][i], df1['DOI']
           [i], df1['#Citation'][i], df1['#Reference'][i], df1['#Existed Reference'][i], df1['#Not in RG List'][i])
    ss1.append(st1)

for i in range(len(df1)):
    PaperInfo.objects.create(
        paperID=ss1[i][0], paperTitle=ss1[i][1], publicationDate=ss1[i][2], paperLocation=ss1[i][3], paperDOI=ss1[i][
            4], numCitation=ss1[i][5], numReference=ss1[i][6], numExistedReference=ss1[i][7], numNotinRGReference=ss1[i][8]
    )

df2 = pd.read_csv('./Abstract Info.csv', encoding='utf-8')
ss2 = []

for i in range(len(df2)):
    st2 = (df2['PaperID'][i], df2['Abstract'][i])
    ss2.append(st2)

for i in range(len(df2)):
    AbstractInfo.objects.create(
        paperID=ss2[i][0], abstract=ss2[i][1]
    )

df3 = pd.read_csv('./Authors Info.csv', encoding='utf-8')
ss3 = []

for i in range(len(df3)):
    st3 = (df3['ID'][i], df3['PaperID'][i], df3['Authors'][i])
    ss3.append(st3)

for i in range(len(df3)):
    AuthorsInfo.objects.create(
        id=ss3[i][0], paperID=ss3[i][1], author=ss3[i][2]
    )

df4 = pd.read_csv('./Reference Info.csv', encoding='utf-8')
ss4 = []

for i in range(len(df4)):
    st4 = (df4['ID'][i], df4['PaperID'][i], df4['Reference In RG'][i])
    ss4.append(st4)

for i in range(len(df4)):
    ReferenceInfo.objects.create(
        id=ss4[i][0], paperID=ss4[i][1], referenceIdx=ss4[i][2]
    )

df5 = pd.read_csv('./Theme Info.csv', encoding='utf-8')
ss5 = []

for i in range(len(df5)):
    st5 = (df5['ID'][i], df5['PaperID'][i], df5['Theme'][i])
    ss5.append(st5)

for i in range(len(df5)):
    ThemeInfo.objects.create(
        id=ss5[i][0], paperID=ss5[i][1], theme=ss5[i][2]
    )

df6 = pd.read_csv('./Reference Not in RG Info.csv', encoding='utf-8')
ss6 = []

for i in range(len(df6)):
    st6 = (df6['ID'][i], df6['PaperID'][i], df6['Reference not in RG'][i])
    ss6.append(st6)

for i in range(len(df6)):
    ReferenceNotInfo.objects.create(
        id=ss6[i][0], paperID=ss6[i][1], notReference=ss6[i][2]
    )

df7 = pd.read_csv('./Real Error.csv', encoding='utf-8')
ss7 = []

for i in range(len(df7)):
    st7 = (df7['ID'][i], df7['PaperID'][i], df7['#Real Error'][i])
    ss7.append(st7)

for i in range(len(df7)):
    RealErrorInfo.objects.create(
        id=ss7[i][0], paperID=ss7[i][1], errCnt=ss7[i][2]
    )
