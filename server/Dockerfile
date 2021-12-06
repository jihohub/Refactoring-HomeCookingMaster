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

#작업 폴더 설정
WORKDIR /opt/server

# 소스코드 복사
COPY requirements.txt .

# 파이썬 패키지 설정
RUN pip3 uninstall -y numpy
RUN pip3 install -r requirements.txt
RUN pip3 install matplotlib
RUN pip3 install rembg
RUN pip3 freeze > requirements.txt


ENV FLASK_APP hcmk_server.app
# ENV FLASK_ENV production
ENV FLASK_ENV development

# 실행 파일 설정
# CMD ["python3", "inception_resnet_v2_predict.py"]
# CMD ["python3", "test_rembg.py"]
ENTRYPOINT ["flask"]
CMD ["run", "--host", "0.0.0.0"]