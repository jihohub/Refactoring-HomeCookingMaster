from tensorflow.keras import models, layers

import tensorflow as tf
import numpy as np
import json

#AI
class FoodClassification:
	def __init__(self, model_path):
		"""
		웹서비스에서는 모델이 전역변수로 load 돼야하므로
		models.load가 app.py로 가야함
		init에서는 food_table만 가지고 있는 걸로!
		"""
		self.model = models.load(model_path)
		# self.food_table = json.loads("food_labels.json")
		with open('./index_name.json', 'r', encoding='utf8') as f:
			self.food_table = json.load(f)
		# self.recipe_table = {"1":"pizza"}
		# class 개수가 적으면(1000개까지) 딕셔너리가 좋음
		# 하드코딩이 아니라 json 파일로 - json.loads("class.json")

	# 이미지 전처리
	def preprocessing(self, img: np.array):
		"""
		@img: numpy.array
		@return: numpy.array
		이미지 리사이징, 이미지 리스케일링, 차원 증가
		"""
		# 이미지 파일 그대로 받는다면 여기서 array로 변환
		# image = Image.open(img)
		# image_array = np.array(image)
		IMG_SIZE= 299

		resize_and_rescale = tf.keras.Sequential([
			layers.experimental.preprocessing.Resizing(IMG_SIZE, IMG_SIZE),
			layers.experimental.preprocessing.Rescaling(1./255)
		])

		result = resize_and_rescale(img)
		result = np.expand_dims(result, axis=0)

		processed_img = img

		return processed_img
	
	# 이미지 추론
	def predict(self, img: np.array):
		"""
		@img: numpy.array
		@return: dictionary
		"""
		tensor = self.model.predict(img)	# 레시피 개수만큼의 tensor 나옴
		sorted_tensor = np.argsort(-tensor)	# tensor 내림차순 정렬
		food_indexes = sorted_tensor[:3]	# 가장 높은 3개만.

		# dictionary에 담음
		# {음식명: 확률, 음식명: 확률, ...}
		predicted_foods = dict()
		current = 0
		for food_index in food_indexes:
			current += 1
			predicted_foods[self.food_table[food_index]] = tensor[food_index]

		# class_id = np.argmax(tensor)
		# post_processing(tensor)	# prediction 결과가 좋지 않을 때 후처리
		
		return predicted_foods
		# 백엔드에서 '이미지를 넣으면 음식이름이 나오는구나' 알 수 있도록

	# 이미지 후처리
	# def post_processing(tensor):
	# 	return output

# 백엔드
# def route_recipe_classification("/recipe-classification", data):
# 	bytes_img = data['img']
# 	np.from_buffer(shape=(), buf=bytes_img) #AI 개발자한테 맞춰주기 위해 np사용
# 	model = RecipeClassification("*.pb")
# 	recipe_class = model(img)
# 	return recipe_class