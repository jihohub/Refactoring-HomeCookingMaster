from flask import request, jsonify
from flask_restx import Resource, Namespace, fields, reqparse
# from sqlalchemy.sql.elements import Null
from hcmk_server.services.s3 import boto3_image_upload, boto3_image_delete
from hcmk_server.services.recipe import (
    get_recipe,
    check_likes,
    add_post,
)
recipe_ns = Namespace(
    name="recipe",
    description="레시피 페이지를 관리하는 API.",
)

'''GetRecipe Models'''

get_recipe_recipe_info_fields = recipe_ns.model(
    "get_recipe_recipe_info",
    {
        "id": fields.Integer,
        "name": fields.String,
        "likes": fields.Integer,
        "views": fields.Integer,
        "img": fields.String,
        "servings": fields.String,
        "difficulty": fields.String,
        "cooking_time": fields.String,
        "food_id": fields.Integer,
    }
)

get_recipe_food_info_fields = recipe_ns.model(
    "get_recipe_food_info",
    {
        "id": fields.Integer,
        "name": fields.String,
        "category_l": fields.String,
        "category_m": fields.String,
        "category_s": fields.String,
    }
)

get_recipe_ingredient_info_fields = recipe_ns.model(
    "get_recipe_ingredient_info",
    {
        "id": fields.Integer,
        "name": fields.String,
        "amount": fields.String,
        "recipe_id": fields.Integer,
    }
)

get_recipe_process_info_fields = recipe_ns.model(
    "get_recipe_process_info",
    {
        "id": fields.Integer,
        "recipe": fields.String,
        "step": fields.Integer,
        "img": fields.String,
        "recipe_id": fields.Integer,
    }
)

get_recipe_post_info_fields = recipe_ns.model(
    "get_recipe_post_info",
    {
        "id": fields.Integer,
        "post": fields.String,
        "img": fields.String,
        "timestamp": fields.String,
        "user_id": fields.Integer,
        "recipe_id": fields.Integer,
    }
)

get_recipe_data_fields = recipe_ns.model(
    "get_recipe_data",
    {
        "recipe_info": fields.Nested(get_recipe_recipe_info_fields),
        "food_info": fields.Nested(get_recipe_food_info_fields),
        "ingredient_info": fields.List(fields.Nested(get_recipe_ingredient_info_fields)),
        "process_info": fields.List(fields.Nested(get_recipe_process_info_fields)),
        "post_info": fields.List(fields.Nested(get_recipe_post_info_fields)),
    }
)

get_recipe_fields = recipe_ns.model(
    "get_recipe",
    {
        "result": fields.String,
        "message": fields.String,
        "data": fields.Nested(get_recipe_data_fields)
    }
)

@recipe_ns.route('/<int:recipe_id>')
@recipe_ns.response(200, "success")
@recipe_ns.response(500, "Failed")
class GetRecipe(Resource):
    @recipe_ns.marshal_with(get_recipe_fields)
    def get(self, recipe_id):
        """검색어와 일치하는 음식의 레시피 조회수 증가 후 데이터를 반환하는 api"""
        result = get_recipe(recipe_id)
        
        return result

'''AddLike Models'''

add_like_fields = recipe_ns.model(
    "add_like",
    {
        "result": fields.String,
        "message": fields.String,
    }
)

add_like_expect_fields = recipe_ns.model(
    "add_like_expect",
    {
        "user_id": fields.Integer,
    }
)

@recipe_ns.route('/<int:recipe_id>/like')
@recipe_ns.response(200, "success")
@recipe_ns.response(500, "Failed")
class AddLike(Resource):
    @recipe_ns.expect(add_like_expect_fields)
    @recipe_ns.marshal_with(add_like_fields)
    def post(self, recipe_id):
        """해당 레시피의 좋아요를 관리하는 api"""
        user_id = request.json.get("user_id")
        result = check_likes(recipe_id, user_id)
        return result

'''AddPost Models'''

add_post_fields = recipe_ns.model(
    "add_post",
    {
        "result": fields.String,
        "message": fields.String,
    }
)

add_post_expect_fields = recipe_ns.model(
    "add_post_expect",
    {
        "user_id": fields.Integer,
        "post": fields.String,
        "img": fields.String,
    }
)

@recipe_ns.route('/<int:recipe_id>/post')
@recipe_ns.response(200, "success")
@recipe_ns.response(500, "Failed")
class AddPost(Resource):
    @recipe_ns.expect(add_post_expect_fields)
    @recipe_ns.marshal_with(add_post_fields)
    def post(self, recipe_id):
        """해당 댓글을 저장하고 댓글 리스트를 반환하는 api"""
        user_id = request.form.get("user_id")
        post = request.form.get("post")        
        img = request.files["img"]
        
        image_url = boto3_image_upload(img)
        if image_url[-1] == ".":
            boto3_image_delete(image_url)
            image_url = None
        result = add_post(user_id, recipe_id, post, image_url)
        return result
