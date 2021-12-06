FROM python:3.8-buster

WORKDIR /server
COPY requirements.txt .

RUN apk add --no-cache build-base libffi-dev
RUN pip3 install -r requirements.txt

ENV FLASK_APP hcmk_server.app
# ENV FLASK_ENV production
ENV FLASK_ENV development

# ENTRYPOINT ["flask"]
# CMD ["run", "--host", "0.0.0.0"]

CMD ["python3", "inception_resnet_v2_predict.py"]
