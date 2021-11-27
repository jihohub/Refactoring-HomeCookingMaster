# from db_connect import db
from hcmk_server.db_connect import db
'''
음식 정보 DB
'''
class Food(db.Model):
    __tablename__ = "food"
    '''
    name = 음식 이름
    category_l = 대분류
    category_m = 중분류
    category_s = 소분류
    '''

    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    name = db.Column(db.String(32), nullable=False)
    category_l = db.Column(db.String(32))
    category_m = db.Column(db.String(32))
    category_s = db.Column(db.String(32))

    def __init__(self, name, category_l, category_m, category_s):
        self.name = name
        self.category_l = category_l
        self.category_m = category_m
        self.category_s = category_s

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "category_l": self.category_l,
            "category_m": self.category_m,
            "category_s": self.category_s,
        }