from hcmk_server.db_connect import db
'''
좋아요 한 레시피 DB
'''
class RecipeLike(db.model):
    __tablename__ = "recipe_like"
    '''
    recipe_id = 좋아요 한 레시피 id
    user_id = 좋아요 한 사용자 id
    '''
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id', ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete="CASCADE", onupdate="CASCADE"), nullable=False)

    def __init__(self, recipe_id, user_id):
        self.recipe_id = recipe_id
        self.user_id = user_id

    def to_dict(self):
        return {
            "id": self.id,
            "recipe_id": self.recipe_id,
            "user_id": self.user_id,
        }