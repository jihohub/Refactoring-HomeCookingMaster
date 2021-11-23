from hcmk_server.db_connect import db
'''
레시피 재료 DB
'''
class RecipeIngredient(db.model):
    __tablename__ = "recipe_ingredent"
    '''
    name = 재료 이름
    amount = 재료 양
    recipe_id = 해당 레시피 id
    '''
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    name = db.Column(db.String(64), nullable=False)
    amount = db.Column(db.String(64))
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id', ondelete="CASCADE", onupdate="CASCADE"), nullable=False)

    def __init__(self, name, amount, recipe_id):
        self.name = name
        self.amount = amount
        self.recipe_id = recipe_id

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "amount": self.amount,
            "recipe_id": self.recipe_id,
        }