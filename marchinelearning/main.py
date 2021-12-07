import flask
from flask import Flask, request, jsonify
from .foodclassification import FoodClassification
import numpy as np
from PIL import Image
from tensorflow.keras.models import load_model


global model

app = Flask(__name__)

@app.route("/")
def home():
    return '<h1>Machine Learning Server!</h1>'

@app.route('/receive', methods=['GET', 'POST'])
def receive():
    if request.method == 'POST':

        img = request.files["img"]

        food = FoodClassification('test')
        # 어떤 형태로 프론트에서 받을건지 정해야 함
        # 1. PIL 사용
        image = Image.open(img)
        image_array = np.array(image)

        # 2. np.frombuffer 사용
        # bytes_img = data['img']
        # image_array = np.from_buffer(shape=(), buf=bytes_img) #AI 개발자한테 맞춰주기 위해 np사용
        # 모델 불러오기
        # global model
        
        # 전처리
        processed_img = food.preprocessing(image_array)
        # 예측
        recipe_class = model.predict(processed_img)
        
        return recipe_class


if __name__ == '__main__':

    model = load_model('./trained_models/InceptionResNetV2_07.h5')

    app.run(host='0.0.0.0', port=8000, debug=True)