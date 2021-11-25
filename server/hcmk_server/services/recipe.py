from hcmk_server.models.food import Food, db
from hcmk_server.models.recipe import Recipe
from hcmk_server.models.recipe_like import RecipeLike
from hcmk_server.models.post import Post

def get_recipe(recipe_id):
    result = {}
    try:
        recipe = Recipe.query.filter(Recipe.food_id == recipe_id).first()
        if recipe is None:
            return None
        # 해당 레시피 조회수 1 증가
        recipe.views += 1
        db.session.add(recipe)
        db.session.commit()
        
        r_dict = recipe.to_dict()
        result['recipe_info'] = r_dict

        food = Food.query.filter(Food.id == recipe.food_id).first()
        f_dict = food.to_dict()
        result['food_info'] = f_dict

        return result
    except Exception:
        db.session.rollback()
        raise

def add_like(recipe_id):
    try:
        recipe = Recipe.query.filter(Recipe.food_id == recipe_id).first()
        if recipe is None:
            return None
        recipe.likes += 1
        db.session.add(recipe)
        db.session.commit()

    except Exception:
        db.session.rollback()
        raise

def add_liked_recipe(recipe_id, user_id):
    new_value = RecipeLike(
        recipe_id=recipe_id,
        user_id=user_id,
    )
    db.session.add(new_value)
    db.session.commit()
        
def add_post(user_id, recipe_id, post, img):
    new_value = Post(
        post = post,
        img = img,
        user_id = user_id,
        recipe_id = recipe_id,
    )
    db.session.add(new_value)
    db.session.commit()

    result = []
    posts = Post.query.all()
    for post in posts:
        p_dict = post.to_dict()
        result.append(p_dict)
    return result