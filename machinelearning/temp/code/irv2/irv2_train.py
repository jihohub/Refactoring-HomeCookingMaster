import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf

from PIL import Image

from tensorflow.keras.applications.inception_resnet_v2 import InceptionResNetV2
from tensorflow.keras.layers import Activation, Dense, Input, BatchNormalization
from tensorflow.keras.models import Model
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint

from tensorflow.keras import mixed_precision
policy = mixed_precision.Policy('mixed_float16')
mixed_precision.set_global_policy(policy)

tf.random.set_seed(100) #for hyperparameter tuning

# 데이터 로드
data_dir = '/datadrive/dataset/'
train_dir = data_dir + 'train'
validation_dir = data_dir + 'validation'
batch_size = 64
img_height = 299
img_width = 299

train_dataset = tf.keras.preprocessing.image_dataset_from_directory(
    train_dir,
    labels='inferred',
    label_mode='categorical',
    seed=100,
    image_size=(img_height, img_width),
    batch_size=batch_size)

val_dataset = tf.keras.preprocessing.image_dataset_from_directory(
    validation_dir,
    labels='inferred',
    label_mode='categorical',
    seed=100,
    image_size=(img_height, img_width),
    batch_size=batch_size)

# 정규화 레이어
norm_layer = tf.keras.layers.experimental.preprocessing.Rescaling(1/255.)

norm_train_dataset = train_dataset.map(lambda x, y: (norm_layer(x), y))
norm_val_dataset = val_dataset.map(lambda x, y: (norm_layer(x), y))
# norm_test_dataset = test_dataset.map(lambda x: norm_layer(x))

# 모델 정의
input_size = (299, 299, 3)

def get_model():
    input = Input(shape=(299, 299, 3))
    model = InceptionResNetV2(
        input_tensor=input, include_top=False, weights=None, pooling='max')
    
    x = model.output
    x = Dense(1024)(x)
    x = BatchNormalization()(x)
    x = Activation('relu')(x)
    x = Dense(512)(x)
    x = BatchNormalization()(x)
    x = Activation('relu')(x)
    x = Dense(400, activation='softmax', dtype='float32', name='softmax')(x)

    model = Model(model.input, x)

    return model

# 모델 컴파일
model = get_model()
# model = tf.keras.applications.inception_resnet_v2.InceptionResNetV2(
#             include_top=True, weights=None, input_tensor=None, input_shape=input_size
#             , classes=400, classifier_activation='softmax'
#         )

# 하이퍼 파라미터 설정 (default 값으로 돼있고, 수정 시 표기 필요)
optmz = tf.keras.optimizers.Adam(
    learning_rate=0.001, beta_1=0.9, beta_2=0.999, epsilon=1e-07, amsgrad=False,
    name='Adam'
)
optmz = mixed_precision.LossScaleOptimizer(optmz, dynamic=True)
loss = tf.keras.losses.CategoricalCrossentropy(
    from_logits=False, label_smoothing=0.0, axis=-1,
    name='categorical_crossentropy'
)

model.compile(optimizer=optmz, loss='categorical_crossentropy', metrics=['accuracy'])
# model.summary()

# 모델 학습 설정
es = EarlyStopping(monitor='val_loss', mode='min', verbose=1, patience=15)
checkpoint = ModelCheckpoint(
    '/home/team5/machinelearning/trained_models/InceptionResNetV2_{epoch:02d}.h5', 
    monitor='val_accuracy', save_best_only=True)

# 모델 학습
history = model.fit(
    norm_train_dataset, 
    validation_data=norm_val_dataset, 
    shuffle=True, 
    epochs=100, 
    callbacks=[es, checkpoint])

hist_df = pd.DataFrame(history.history) 

# save to csv: 
hist_csv_file = 'history.csv'
with open(hist_csv_file, mode='w') as f:
    hist_df.to_csv(f)

model.save('/home/team5/machinelearning/trained_models/inception_resnet_v2_final.h5')


#모델 평가
print("-- Evaluate --")
scores = model.evaluate(val_dataset, steps=5)
print("%s: %.2f%%" %(model.metrics_names[1], scores[1]*100))