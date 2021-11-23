from hcmk_server.db_connect import db
'''
레시피 정보 DB
'''
class Recipe(db.model):
    __tablename__ = "recipe"
    '''
    name = 레시피 제목(이름)
    like = 좋아요 수
    servings = 음식 인분
    difficulty = 난이도
    cooking_time = 요리 예상 시간
    food_id = 해당 레시피의 음식 id
    '''
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    name = db.Column(db.String(128), nullable=False)
    like = db.Column(db.Integer, nullable=True)
    servings = db.Column(db.String(32), nullable=True)
    difficulty = db.Column(db.String(32), nullable=True)
    cooking_time = db.Column(db.String(32), nullable=True)
    food_id = db.Column(db.Integer, db.ForeignKey('food.id', ondelete="CASCADE", onupdate="CASCADE"), nullable=False)

    def __init__(self, name, like, servings, difficulty, cooking_time, food_id):
        self.name = name
        self.like = like
        self.servings = servings
        self.difficulty = difficulty
        self.cooking_time = cooking_time
        self.food_id = food_id

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "like": self.like,
            "servings": self.servings,
            "difficulty": self.difficulty,
            "cooking_time": self.cooking_time,
            "food_id": self.food_id,
        }