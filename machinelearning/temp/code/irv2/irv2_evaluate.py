import tensorflow as tf

tf.random.set_seed(100) #for hyperparameter tuning

# 데이터 로드
data_dir = '/datadrive/dataset/'
train_dir = data_dir + 'train'
validation_dir = data_dir + 'validation'
batch_size = 32
img_height = 299
img_width = 299

val_dataset = tf.keras.preprocessing.image_dataset_from_directory(
    validation_dir,
    labels='inferred',
    label_mode='categorical',
    seed=100,
    image_size=(img_height, img_width),
    batch_size=batch_size)

# 정규화 레이어
norm_layer = tf.keras.layers.experimental.preprocessing.Rescaling(1/255.)

norm_val_dataset = val_dataset.map(lambda x, y: (norm_layer(x), y))

# 모델 불러오기
model = tf.keras.models.load_model('/home/team5/machinelearning/trained_models/InceptionResNetV2_07.h5')

#모델 평가
print("-- Evaluate --")
scores = model.evaluate(val_dataset)
print("%s: %.2f%%" %(model.metrics_names[1], scores[1]*100))