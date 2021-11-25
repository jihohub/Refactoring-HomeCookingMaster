from flask import request, jsonify
from flask_restx import Resource, Namespace, fields, reqparse

from hcmk_server.models.food import Food, db
from hcmk_server.models.recipe import Recipe

main_ns = Namespace(
    name="main",
    description="메인페이지 관련 API.",
)

@main_ns.route('/search/str')
@main_ns.response(200, "success")
@main_ns.response(500, "Failed")
class SearchbyString(Resource):
    def get(self):
        """검색어와 일치하는 음식의 레시피를 반환합니다."""
        result = {}
        data =request.args["data"].strip()
        
        _like = "%"+data+"%"
        foods = Food.query.filter(Food.name.like(_like)).order_by(Food.name.asc())

        for food in foods:
            recipes = Recipe.query.filter(Recipe.food_id == food.id).all()
            tmp = []
            for recipe in recipes:
                tmp.append(recipe.to_dict())
            result[food.name] = tmp
        print(result)
        return jsonify(result = result)
