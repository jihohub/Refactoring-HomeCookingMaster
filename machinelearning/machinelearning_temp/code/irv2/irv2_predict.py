import numpy as np
import tensorflow as tf

from PIL import Image

from tensorflow.keras.applications.inception_resnet_v2 import InceptionResNetV2
from tensorflow.keras import layers
import time

tf.random.set_seed(100) #for hyperparameter tuning

start1 = time.time()
# 모델 불러오기
model = tf.keras.models.load_model('/home/team5/machinelearning/trained_models/InceptionResNetV2_15.h5')
print('-- model loaded --\n')

img = '/datadrive/dataset/validation/01014006/01_014_01014006_160422971468134_1.jpeg'
image = Image.open(img)
image_array = np.array(image)
IMG_SIZE= 299

resize_and_rescale = tf.keras.Sequential([
    layers.experimental.preprocessing.Resizing(IMG_SIZE, IMG_SIZE),
    layers.experimental.preprocessing.Rescaling(1./255)
])

result = resize_and_rescale(image_array)
result = np.expand_dims(result, axis=0)
print('-- Result --\n', result.shape)

#모델 예측
print("-- Predict --\n")
start2 = time.time()
pred = model.predict(result, workers=4)
end = time.time()
print('total time:', end-start1)
print('predict time:', end-start2)
# print('pred:', pred)
print('max pred:', np.argmax(pred))

print('pred shape', pred.shape)
print('pred', pred)