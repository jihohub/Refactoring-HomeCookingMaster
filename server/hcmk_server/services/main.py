from hcmk_server.models.food import Food, db
from hcmk_server.models.recipe import Recipe

def get_food_list(data):
    result = {}
    _like = "%"+data+"%"
    foods = Food.query.filter(Food.name.like(_like)).order_by(Food.name.asc())

    for food in foods:
        recipes = Recipe.query.filter(Recipe.food_id == food.id).all()
        tmp = []
        for recipe in recipes:
            tmp.append(recipe.to_dict())
        result[food.name] = tmp
    return result