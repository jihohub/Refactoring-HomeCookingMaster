from hcmk_server.models.food import Food, db
from hcmk_server.models.recipe import Recipe
from hcmk_server.models.recipe_like import RecipeLike
from hcmk_server.models.post import Post

def get_recipe(recipe_id):
    '''
    
    '''
    result = {}
    try:
        recipe = Recipe.query.filter(Recipe.id == recipe_id).first()
        if recipe is None:
            return None
        recipe.views += 1
        db.session.add(recipe)
        db.session.commit()
        
        r_dict = recipe.to_dict()
        result['recipe_info'] = r_dict

        food = Food.query.filter(Food.id == recipe.food_id).first()
        f_dict = food.to_dict()
        result['food_info'] = f_dict

        try:
            posts = Post.query.filter(Post.recipe_id == recipe_id).first()
            if posts is None:
                result['post_info'] = {}
                return result
            
            p_dict = food.to_dict()
            result['post_info'] = p_dict

        except Exception:
            db.session.rollback()
            raise

        return result
    except Exception:
        db.session.rollback()
        raise

def add_like(recipe_id):
    try:
        recipe = Recipe.query.filter(Recipe.id == recipe_id).first()
        if recipe is None:
            return None
        recipe.likes += 1
        db.session.add(recipe)
        db.session.commit()
        return "success"

    except Exception:
        db.session.rollback()
        raise

def check_likes(recipe_id, user_id):
    data = RecipeLike.query.filter((RecipeLike.recipe_id == recipe_id) & (RecipeLike.user_id == user_id)).first()
    if data is not None:
        db.session.delete(data)
        db.session.commit()
        return "delete like"
    new_value = RecipeLike(
        recipe_id=recipe_id,
        user_id=user_id,
    )
    db.session.add(new_value)
    db.session.commit()
    add_like(recipe_id)
    return "add like"

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
