import numpy as np
# import matplotlib.pyplot as plt
import tensorflow as tf

from PIL import Image
import json

from tensorflow.keras.applications.inception_resnet_v2 import InceptionResNetV2
from tensorflow.keras.layers import Activation, Dense, Input, BatchNormalization
from tensorflow.keras.models import Model
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
from tensorflow.keras import layers
import time

tf.random.set_seed(100) #for hyperparameter tuning

start1 = time.time()
# 모델 불러오기
model = tf.keras.models.load_model('./ml_model/trained_model/InceptionResNetV2_16_float32.h5')
print('-- model loaded --')

img = './ml_model/01_016_01016019_160474294028095_1.jpg'
image = Image.open(img)
image_array = np.array(image)
IMG_SIZE= 299

resize_and_rescale = tf.keras.Sequential([
  layers.experimental.preprocessing.Resizing(IMG_SIZE, IMG_SIZE),
  layers.experimental.preprocessing.Rescaling(1./255)
])

result = resize_and_rescale(image_array)
result = np.expand_dims(result, axis=0)
print('-- Result --', result.shape)

#모델 예측
print("-- Predict --")

def predict(img: np.array):
  """
  @img: numpy.array
  @return: dictionary
  """
  with open('./ml_model/index_name.json', 'r', encoding='utf8') as f:
    food_table = json.load(f)
  
  tensor = model.predict(img)	# 레시피 개수만큼의 tensor 나옴
  sorted_tensor = np.argsort(-tensor)	# tensor 내림차순 정렬
  food_indexes = sorted_tensor[:3]	# 가장 높은 3개만.

  # dictionary에 담음
  # {음식명: 확률, 음식명: 확률, ...}
  predicted_foods = dict()
  current = 0
  for food_index in food_indexes:
    current += 1
    predicted_foods[food_table[food_index]] = tensor[food_index]

  # class_id = np.argmax(tensor)
  # post_processing(tensor)	# prediction 결과가 좋지 않을 때 후처리
  
  return predicted_foods

print('-- PREDICT --')
print(predict(result))

# start2 = time.time()
# pred = model.predict(result, workers=4)
# end = time.time()
# print('predict time:', end-start2)
# print('total time:', end-start1)
# # print('pred:', pred)
# print('max pred:', np.argmax(pred))

# print('pred shape', pred.shape)
# print('pred', pred)


# /datadrive/project_test/project-template/server/ml_model/index_name.json