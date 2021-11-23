from hcmk_server.db_connect import db
'''
레시피 순서 DB
'''
class RecipeProcess(db.model):
    __tablename__ = "recipe_process"
    '''
    recipe = 순서 별 레시피
    step = 순서
    img = 레시피 이미지
    recipe_id = 해당 레시피 id
    '''
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    recipe = db.Column(db.Text, nullable=False)
    step = db.Column(db.Integer, nullable=False)
    img = db.Column(db.String(1024))
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id', ondelete="CASCADE", onupdate="CASCADE"), nullable=False)

    def __init__(self, recipe, step, img, recipe_id):
        self.recipe = recipe
        self.step = step
        self.img = img
        self.recipe_id = recipe_id

    def to_dict(self):
        return {
            "id": self.id,
            "recipe": self.recipe,
            "step": self.step,
            "img": self.img,
            "recipe_id": self.recipe_id,
        }