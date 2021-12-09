from hcmk_server.models.post import Post, db
from hcmk_server.models.user import User
from hcmk_server.models.recipe import Recipe
from hcmk_server.models.recipe_like import RecipeLike
from flask_jwt_extended import get_jwt_identity, get_jwt
from hcmk_server.services.auth import get_user_by_id, validate_token
from hcmk_server.services.s3 import (
    boto3_image_upload,
    boto3_image_delete,
)

def get_mypage ():
    if validate_token(get_jwt())  == False:
        return {'result' :"fail", 'message':"유효하지 않은 토큰입니다."}, 401
    
    '''1. 토큰의 유저 아이디로 DB 유저 찾기'''
    user_id = get_jwt_identity()
    user = get_user_by_id(user_id=user_id)

    '''2. 유저 아이디로 스크랩한 레시피 찾기'''
    liked_recipes = RecipeLike.query.filter(RecipeLike.user_id == user.id).all()
    result_liked_recipe = []
    # 스크랩한 레시피가 있다면
    if liked_recipes:
        for liked_recipe in liked_recipes:
            recipe = Recipe.query.filter(Recipe.id == liked_recipe.recipe_id).first()
            result_liked_recipe.append(recipe.to_dict_for_mypage())
    
    '''3. 유저 아이디로 댓글 작성한 레시피 찾기'''
    my_post_recipes = Post.query.filter(Post.user_id == user.id).all()
    result_my_post_recipe = []
    # 댓글을 작성한 레시피가 있다면
    if my_post_recipes:
        for my_post_recipe in my_post_recipes:
            recipe = Recipe.query.filter(Recipe.id == my_post_recipe.recipe_id).first()
            result_my_post_recipe.append(recipe.to_dict_for_mypage())

    return {
        "result" : "Success",
        "message" : "마이페이지 정보를 전송하였습니다.",
        "data": 
        {
            "user_info" :
            {
                "email": user.email,
                "nickname": user.nickname,
                "img": user.img,
                "intro": user.intro,
                "exp": user.exp,
            },
            "liked_recipe" : result_liked_recipe,
            "my_post" : result_my_post_recipe
        }
    }, 200


def edit_img(user_id, img):
    user = User.query.filter(User.id == user_id).first()
    
    try:
        if img.filename == "":
            return {
            "result" : "failed",
            "message" : "프로필 사진을 수정되지 않았습니다.",
            "data": 
            {
                "img": user.img
            }
        }, 200
        image_url = boto3_image_upload(img)
    except UnboundLocalError:
        return {
        "result" : "failed",
        "message" : "프로필 사진을 수정되지 않았습니다.",
        "data": 
        {
            "img": user.img
        }
    }, 200

    user.img = image_url
    db.session.add(user)
    db.session.commit()
    return {
        "result" : "Success",
        "message" : "프로필 사진을 수정하였습니다.",
        "data": 
        {
            "img": image_url
        }
    }, 200