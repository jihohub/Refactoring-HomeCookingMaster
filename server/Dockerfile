FROM python:3.8-alpine

WORKDIR /server
COPY requirements.txt .

RUN apk add --no-cache build-base libffi-dev
RUN pip3 install -r requirements.txt

ENV FLASK_APP hcmk_server.app
# ENV FLASK_ENV production
ENV FLASK_ENV development


# flask 실행
ENTRYPOINT ["flask"]
CMD ["run", "--host", "0.0.0.0"]



# gunicorn 실행
# CMD ["gunicorn", "hcmk_server.app:application", "-b", "0.0.0.0:5000"]