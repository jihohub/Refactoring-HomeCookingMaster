from hcmk_server.models.food import Food, db
from hcmk_server.models.recipe import Recipe
from hcmk_server.models.recipe_like import RecipeLike
from hcmk_server.models.post import Post
from hcmk_server.models.user import User
from hcmk_server.models.recipe_ingredient import RecipeIngredient
from hcmk_server.models.recipe_process import RecipeProcess

def get_recipe(recipe_id):
    data = {}
    try:
        '''1. 레시피 데이터 가져오기'''
        recipe = Recipe.query.filter(Recipe.id == recipe_id).first()
        if recipe is None:
            return None
        recipe.views += 1
        db.session.add(recipe)
        db.session.commit()
        
        r_dict = recipe.to_dict()
        data['recipe_info'] = r_dict

        '''2. 음식 데이터 가져오기'''
        food = Food.query.filter(Food.id == recipe.food_id).first()
        f_dict = food.to_dict()
        data['food_info'] = f_dict
    
        '''3. 레시피 재료 데이터 가져오기'''
        ingredients = RecipeIngredient.query.filter(RecipeIngredient.recipe_id == recipe_id).all()
        tmp = []
        for ingredient in ingredients:
            i_dict = ingredient.to_dict()
            tmp.append(i_dict)
        data['ingredient_info'] = tmp

        '''4. 레시피 순서 데이터 가져오기'''
        processes = RecipeProcess.query.filter(RecipeProcess.recipe_id == recipe_id).order_by(RecipeProcess.step.asc()) 
        # tmp = {}
        tmp = []
        for process in processes:
            pro_dict = process.to_dict()
            # tmp[pro_dict.step] = pro_dict
            tmp.append(pro_dict)
        data['process_info'] = tmp
    
        try:
            '''5. 댓글 데이터 가져오기'''
            posts = Post.query.filter(Post.recipe_id == recipe_id).all()
            if posts is None:
                data['post_info'] = {}
            else :
                tmp = []
                for post in posts:
                    p_dict = post.to_dict()
                    user = User.query.filter(User.id == p_dict.user_id).first()
                    p_dict["nickname"] = user.nickname
                    tmp.append(p_dict)
                data['post_info'] = tmp

        except Exception:
            db.session.rollback()
            raise
        
        return {
            "result" : "Success",
            "message" : "레시피 정보를 전송하였습니다.",
            "data": data
        }, 200
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
        return {
            "result" : "Success",
            "message" : "레시피를 스크랩하였습니다."
        }
    new_value = RecipeLike(
        recipe_id=recipe_id,
        user_id=user_id,
    )
    db.session.add(new_value)
    db.session.commit()
    add_like(recipe_id)
    return {
            "result" : "Success",
            "message" : "레시피 스크랩을 취소하였습니다."
        }

def add_post(user_id, recipe_id, post, image_url):
    new_value = Post(
        post = post,
        img = image_url,
        user_id = user_id,
        recipe_id = recipe_id,
    )
    db.session.add(new_value)
    db.session.commit()

    return {
            "result" : "Success",
            "message" : "댓글을 추가하였습니다."
        }

    # result = []
    # posts = Post.query.all()
    # for post in posts:
    #     p_dict = post.to_dict()
    #     result.append(p_dict)
    # return result
