from flask import request, jsonify
from flask_restx import Resource, Namespace, fields, reqparse
from sqlalchemy.sql.elements import Null
from hcmk_server.services.recipe import (
    get_recipe,
    check_likes,
    add_post,
)

recipe_ns = Namespace(
    name="recipe",
    description="레시피 페이지를 관리하는 API.",
)

@recipe_ns.route('/<int:recipe_id>')
@recipe_ns.response(200, "success")
@recipe_ns.response(500, "Failed")
class SearchbyString(Resource):
    def get(self, recipe_id):
        """검색어와 일치하는 음식의 레시피 조회수 증가 후 데이터를 반환하는 api"""
        result = get_recipe(recipe_id)
        
        return jsonify(result = result)

@recipe_ns.route('/<int:recipe_id>/like')
@recipe_ns.response(200, "success")
@recipe_ns.response(500, "Failed")
class AddLike(Resource):
    def post(self, recipe_id):
        """해당 레시피의 좋아요를 관리하는 api"""
        user_id = request.json.get("user_id")
        result = check_likes(recipe_id, user_id)
        return jsonify(result = result)

@recipe_ns.route('/<int:recipe_id>/post')
@recipe_ns.response(200, "success")
@recipe_ns.response(500, "Failed")
class AddPost(Resource):
    def post(self, recipe_id):
        """해당 댓글을 저장하고 댓글 리스트를 반환하는 api"""
        user_id = request.json.get("user_id")
        post = request.json.get("post")
        img = request.json.get("img")
        
        result = add_post(user_id, recipe_id, post, img)
        return jsonify(result = result)
