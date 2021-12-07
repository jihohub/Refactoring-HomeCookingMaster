# 베이스 이미지
# FROM nvidia/cuda:11.4.2-runtime-ubuntu20.04
FROM tensorflow/tensorflow:latest-gpu

#설치시 질문 안나오게 설정
ARG DEBIAN_FROMTEND=noninteractive

# apt 업데이트
RUN apt update

# 패키지 설치
RUN apt install -y build-essential curl git g++

# 파이썬 설치
RUN apt install -y python3 python3-pip

# 작업 폴더 설정
WORKDIR /opt/server

# 소스코드 복사
COPY requirements.txt .

# 파이썬 패키지 설정
RUN pip3 install -r requirements.txt

# 환경변수 설정
ENV FLASK_ENV production

# flask run 실행
ENTRYPOINT ["flask"]
CMD ["run", "--host", "0.0.0.0"]

# gunicorn 실행
# CMD ["gunicorn", "app:app", "-b", "0.0.0.0:8000"]