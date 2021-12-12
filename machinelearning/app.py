import flask
from flask import Flask, request, jsonify
from foodclassification import FoodClassification
import numpy as np
from PIL import Image
from tensorflow.keras.models import load_model
from werkzeug.utils import secure_filename
import json

from apscheduler.schedulers.background import BackgroundScheduler
import os


# 모델 가져오기
def get_model():
	# load the pre-trained Keras model (here we are using a model
	# pre-trained on ImageNet and provided by Keras, but you can
	# substitute in your own networks just as easily)
	global model
	model = load_model('./trained_models/InceptionResNetV2_24_float32.h5')

# 업로드된 이미지 삭제
def del_uploaded_imgs():
    filePath = '/opt/server/static/uploads'
    
    if os.path.exists(filePath):
        for file in os.scandir(filePath):
            os.remove(file.path)
        return 'Delete Uploaded Images'

#apscheduler 선언 
sched = BackgroundScheduler(daemon=True) 
#apscheduler실행설정, Cron방식으로, 수요일 오전 3시에 실행
sched.add_job(del_uploaded_imgs,'cron', day_of_week='wed', hour='3') 

# 테스트용 1분마다 실행
# sched.add_job(del_uploaded_imgs,'cron', day_of_week='sun', hour='8', minute='29') 
# sched.add_job(del_uploaded_imgs,'interval', minutes=1) 

#apscheduler실행 
sched.start()


app = Flask(__name__)
model = None

get_model()

@app.route("/")
def home():
    return '<h1>Machine Learning Server!</h1>'

@app.route('/receive', methods=['GET', 'POST'])
def receive():
    if request.method == 'POST':
        
        f = request.files["img"]

        s_filename = secure_filename(f.filename) # 파일명 저장
        file_dir = '/opt/server/static/uploads/' + s_filename # 파일을 저장하기 위한 경로 지정

        f.save(file_dir) # 파일 저장

        # upload = {'img': open(file_dir, 'rb') } # 업로드하기위한 파일

        food = FoodClassification(model)


        # 어떤 형태로 프론트에서 받을건지 정해야 함
        # 1. PIL 사용
        img = Image.open(file_dir)
        
        # png 파일은 jpg로 변환하여 다시 불러오기
        if file_dir[-3:] in ['png', 'PNG']:
            im = img.convert("RGB")
            file_dir = file_dir[:-3] + 'png'
            # file_dir = file_dir.replace('png', 'jpg')
            im.save(file_dir)
            img = Image.open(file_dir)

        img_array = np.array(img)

        # 2. np.frombuffer 사용
        # bytes_img = data['img']
        # img_array = np.from_buffer(shape=(), buf=bytes_img) #AI 개발자한테 맞춰주기 위해 np사용
        # 모델 불러오기
        # global model
        
        # 전처리
        processed_img = food.preprocessing(img_array)
        
        # 예측
        recipe_class = food.predict(processed_img)
        json_recipe_class = json.dumps(recipe_class)


        return json_recipe_class


# @app.route('/test', methods=['GET', 'POST'])
# def test():
#     if request.method == 'POST':

#         f = request.files["img"]
        
#         return jsonify({
#             "소고기국밥" : 0.9912312,
#             "불고기덮밥" : 0.802212,
#             "송이덮밥" : 0.0000212,
#         })

# if __name__ == '__main__':

#     app.run(host='0.0.0.0', port=8000, debug=True)