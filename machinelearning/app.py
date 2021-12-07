import flask
from flask import Flask, request, jsonify
from foodclassification import FoodClassification
import numpy as np
from PIL import Image
from tensorflow.keras.models import load_model
from werkzeug.utils import secure_filename
import json


def get_model():
	# load the pre-trained Keras model (here we are using a model
	# pre-trained on ImageNet and provided by Keras, but you can
	# substitute in your own networks just as easily)
	global model
	model = load_model('./trained_models/InceptionResNetV2_24_float32.h5')



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
        image = Image.open(file_dir)
        image_array = np.array(image)

        # 2. np.frombuffer 사용
        # bytes_img = data['img']
        # image_array = np.from_buffer(shape=(), buf=bytes_img) #AI 개발자한테 맞춰주기 위해 np사용
        # 모델 불러오기
        # global model
        
        # 전처리
        processed_img = food.preprocessing(image_array)
        
        # 예측
        recipe_class = food.predict(processed_img)
        json_recipe_class = json.dumps(recipe_class)


        return json_recipe_class


# if __name__ == '__main__':

#     app.run(host='0.0.0.0', port=8000, debug=True)