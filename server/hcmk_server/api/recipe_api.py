from flask import request, jsonify
from flask_restx import Resource, Namespace, fields, reqparse
from sqlalchemy.sql.elements import Null
from hcmk_server.services.recipe import (
    get_recipe,
    add_like,
    add_liked_recipe,
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
        """검색어와 일치하는 음식의 레시피 조회수 증가 후 데이터를 반환합니다."""
        result = get_recipe(recipe_id)
        
        return jsonify(result = result)

@recipe_ns.route('/<int:recipe_id>/like')
@recipe_ns.response(200, "success")
@recipe_ns.response(500, "Failed")
class AddLike(Resource):
    def get(self, recipe_id):
        """해당 레시피의 좋아요 수 1 증가시키고 recipe_like에 user와 recipe 정보를 저장합니다."""
        user_id =request.args["user_id"]
        add_like(recipe_id)
        add_liked_recipe(recipe_id, user_id)

@recipe_ns.route('/<int:recipe_id>/post')
@recipe_ns.response(200, "success")
@recipe_ns.response(500, "Failed")
class AddPost(Resource):
    def get(self, recipe_id):
        """해당 댓글을 저장하고 댓글 리스트를 반환합니다."""
        user_id =request.args["user_id"]
        post =request.args["post"]
        if request.args["img"]:
            img =request.args["img"]
        else:
            img = None
        
        result = add_post(user_id, recipe_id, post, img)
        return result
