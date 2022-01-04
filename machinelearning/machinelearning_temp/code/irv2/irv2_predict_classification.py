import numpy as np
import tensorflow as tf

from PIL import Image, ImageFile

from tensorflow.keras.applications.inception_resnet_v2 import InceptionResNetV2
from tensorflow.keras.layers import Activation, Dense, Input, BatchNormalization
from tensorflow.keras.models import Model
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
from tensorflow.keras import layers
import time

from food_classification import RecipeClassification
# from rembg.bg import remove # 용량 이슈로 보류

tf.random.set_seed(100) #for hyperparameter tuning

start1 = time.time()
# 모델 불러오기
# mymodel = RecipeClassification('/home/team5/machinelearning/trained_models/InceptionResNetV2_21_float16.h5')
# mymodel = RecipeClassification('/datadrive/trained_models/InceptionResNetV2_16_float32.h5')
mymodel = RecipeClassification('/datadrive/trained_models/InceptionResNetV2_24_float32.h5')

# 이미지 처리
# img = '/datadrive/dataset/validation/01014006/01_014_01014006_160422971468134_1.jpeg'
# img = '/datadrive/dataset/validation/14012002/14_142_14012002_160818379650752_1.jpg'
# img = '/home/team5/machinelearning/imgs/c2c470c3aa827c81561b9ef512fa6fa6.jpg'

# img = '/datadrive/project_test/project-template/server/ml_model/01_016_01016019_160474294028095_1.jpg'
img = '/home/team5/machinelearning/imgs/bzjg_rembg.jpg'

# 용량 이슈로 보류
# ImageFile.LOAD_TRUNCATED_IMAGES = True
# f = np.fromfile(input_path)
# result = remove(f)
# nonbg_img = Image.open(io.BytesIO(result)).convert("RGB")

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
start2 = time.time()
# pred = model.predict(result, workers=4)
pred = mymodel.predict(result)
end = time.time()

print('total time:', end-start1)
# print('pred:', pred)
# print('max pred:', np.argmax(pred))

print('pred', pred)



