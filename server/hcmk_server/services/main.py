from hcmk_server.models.food import Food, db
from hcmk_server.models.recipe import Recipe

def get_food_list(data):
    result = {}
    _like = "%"+data+"%"
    try:
        foods = Food.query.filter(Food.name.like(_like)).order_by(Food.name.asc())
        if foods is None:
            return result, "Success", "검색 결과가 없습니다."
        for food in foods:
            recipes = Recipe.query.filter(Recipe.food_id == food.id).all()
            recipe_dicts = []
            for recipe in recipes:
                recipe_dicts.append(recipe.to_dict())
            result[food.name] = recipe_dicts
        return result, "Success", "검색 결과를 전달하였습니다."
    except Exception:
        db.session.rollback()
        raise

def get_ranking():
    data = []
    ranks = Recipe.query.order_by(Recipe.likes.desc(), Recipe.views.desc()).limit(12)
    for rank in ranks:
        data.append(rank.to_dict())
    return {
        "result" : "Success",
        "message" : "랭킹 레시피를 전달 하였습니다.",
        "data" : data
    }
