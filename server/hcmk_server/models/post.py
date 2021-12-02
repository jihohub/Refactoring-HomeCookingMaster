from pytz import timezone
from datetime import datetime
from hcmk_server.db_connect import db

'''
댓글 DB
'''
class Post(db.Model):
    __tablename__ = "post"
    '''
    post = 댓글 내용
    img = 첨부 된 이미지 주소
    timestamp = 댓글 업로드 한 시간
    user_id = 댓글을 단 사용자의 id
    recipe_id = 댓글이 달린 레시피의 id
    '''
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    post = db.Column(db.Text, nullable=False)
    img = db.Column(db.String(1024))
    timestamp = db.Column(db.DateTime(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id', ondelete="CASCADE", onupdate="CASCADE"), nullable=False)

    def __init__(self, post, img, user_id, recipe_id):
        self.post = post
        self.img = img
        self.timestamp = datetime.now(timezone('Asia/Seoul'))
        self.user_id = user_id
        self.recipe_id = recipe_id

    def to_dict(self):
        return {
            "id": self.id,
            "post": self.post,
            "img": self.img,
            "timestamp": str(self.timestamp),
            "user_id": self.user_id,
            "recipe_id": self.recipe_id,
        }