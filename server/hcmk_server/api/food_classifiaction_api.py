from flask_restx import Resource, Namespace, fields
from foodclassification import FoodClassification

fc_ns = Namespace(
    name="fc",
    description="음식 분류 API",
)

@fc_ns.route('')
@fc_ns.response(200, "Success")
@fc_ns.response(404, "Fail")
class FoodClassificationApi(Resource):
    @fc_ns.doc("POST Food Classification Result")
    def post(self, img):

        food = FoodClassification('test')
        # 어떤 형태로 프론트에서 받을건지 정해야 함
        # 1. PIL 사용
        # image = Image.open(img)
        # image_array = np.array(image)

        # 2. np.frombuffer 사용
        # bytes_img = data['img']
        # image_array = np.from_buffer(shape=(), buf=bytes_img) #AI 개발자한테 맞춰주기 위해 np사용
        
        # 전처리
        processed_img = food.preprocessing(image_array)
        # 예측
        recipe_class = model.predict(processed_img)
        
        return recipe_class