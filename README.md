# PaperFlow

**팀페이지 주소**: https://kookmin-sw.github.io/capstone-2021-8

- [PaperFlow](#PaperFlow)
  - [1. 프로젝트 소개](#1-프로젝트-소개)
    - [1.1. 핵심 서비스](#11-핵심-서비스)
  - [2. Abstract](#2-Abstract)
  - [3. 소개 영상](#3-소개-영상)
  - [4. 팀 소개](#4-팀-소개)
  - [5. 사용법](#5-사용법)
    - [5.1. client/paperflow-web-v1](#51-client/paperflow-web-v1)
    - [5.2. server/paperflow-functions-v1](#52-server/paperflow-functions-v1)
  - [6. 기타](#6-기타)

## 1. 프로젝트 소개

![intro image](images/intro.png)
PaperFlow는 각 논문의 참조 (references)를 자동 추출 및 가중치 분석 (각 참조된 논문이 현재 논문에서 얼만큼 중요도를 가지는지)을 통해 사용자가 어떤 논문이 현재 어떤 식으로 연구되고 있는지 **“연구 동향을 쉽고 빠르게 파악할 수 있도록 도와주는 웹 서비스”** 입니다.

### 1.1. 핵심 서비스

- 논문 기본 정보 열람
- 논문 흐름 서비스
- 연구 키워드 시각화
- 연구 통계
- 뉴스레터

### 1.2. 발표 자료

### 1.3. 포스터

## 2. Abstract

The PaperFlow is a service that helps researchers to catch up current research flow by automatically extracting references from papers and estimating the similarity between those papers.

## 3. 소개 영상

### 3.1. 시연 영상

## 4. 팀 소개

- 윤상건

  - Role: 팀장, Front-end, Back-end, 데이터 분석
  - Student ID: 20191632
  - E-Mail: ggj06281@kookmin.ac.kr
  - Github: [@c0510gy](https://github.com/c0510gy)

- 이민종

  - Role: Front-end, 데이터 시각화, 데이터 분석
  - Student ID: 20181656
  - E-Mail: lsjppp8069@kookmin.ac.kr
  - Github: [@hughugh](https://github.com/hughugh)

- 김태영

  - Role: Back-end, 데이터 크롤링, 데이터 분석
  - Student ID: 20160729
  - E-Mail: tykim75@kookmin.ac.kr
  - Github: [@tykim75](https://github.com/tykim75)

## 5. 사용법

### 5.1. client/paperflow-web-v1

```
cd ./client/paperflow-web-v1
npm install
npm run dev
```

### 5.2. server/paperflow-functions-v1

```
cd ./server/paperflow-functions-v1
python3 -m venv ./venv
source ./venv/bin/activate
pip3 install -r requirements.txt
python3 ./paperflowServer/manage.py migrate
python3 ./paperflowServer/manage.py runserver
```

## 6. 기타
