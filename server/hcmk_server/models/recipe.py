# from db_connect import db
from hcmk_server.db_connect import db
'''
레시피 정보 DB
'''
class Recipe(db.Model):
    __tablename__ = "recipe"
    '''
    name = 레시피 제목(이름)
    img = 음식 사진 주소
    views = 조회 수
    like = 좋아요 수
    servings = 음식 인분
    difficulty = 난이도
    cooking_time = 요리 예상 시간
    food_id = 해당 레시피의 음식 id
    '''
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    name = db.Column(db.String(128), nullable=False)
    img = db.Column(db.String(1024))
    views = db.Column(db.Integer, nullable=False)
    likes = db.Column(db.Integer, nullable=False)
    servings = db.Column(db.String(32), nullable=False)
    difficulty = db.Column(db.String(32), nullable=False)
    cooking_time = db.Column(db.String(32), nullable=False)
    food_id = db.Column(db.Integer, db.ForeignKey('food.id', ondelete="CASCADE", onupdate="CASCADE"), nullable=False)

    def __init__(self, name, img, servings, difficulty, cooking_time, food_id):
        self.name = name
        self.img = img
        self.servings = servings
        self.difficulty = difficulty
        self.cooking_time = cooking_time
        self.food_id = food_id
        # self.views = 0
        # self.like = 0

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            # "like": self.like,
            "servings": self.servings,
            "difficulty": self.difficulty,
            "cooking_time": self.cooking_time,
            "food_id": self.food_id,
        }