from hcmk_server.db_connect import db
'''
음식 정보 DB
'''
class Food(db.model):
    __tablename__ = "food"
    '''
    name = 음식 이름
    img = 음식 사진 주소
    category_l = 대분류
    category_m = 중분류
    category_s = 소분류
    size = 1회 제공량
    kcal = 1회 제공량 당 칼로리
    views = 조회 수
    '''

    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    name = db.Column(db.String(32), nullable=False)
    img = db.Column(db.String(1024), nullable=True)
    category_l = db.Column(db.String(32), nullable=True)
    category_m = db.Column(db.String(32), nullable=True)
    category_s = db.Column(db.String(32), nullable=True)
    size = db.Column(db.Integer)
    kcal = db.Column(db.Integer)
    views = db.Column(db.Integer, nullable=True)

    def __init__(self, name, img, category_l, category_m, category_s, size, kcal):
        self.name = name
        self.img = img
        self.category_l = category_l
        self.category_m = category_m
        self.category_s = category_s
        self.size = size
        self.kcal = kcal
        self.views = 0

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "img": self.img,
            "category_l": self.category_l,
            "category_m": self.category_m,
            "category_s": self.category_s,
            "size": self.size,
            "kcal": self.kcal,
            "views": self.views,
        }