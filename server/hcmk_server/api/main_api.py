from flask import request, jsonify
from flask_restx import Resource, Namespace, fields, reqparse
from hcmk_server.services.main import get_food_list, get_ranking

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
        data =request.args["data"].replace(" ", "")
        result = get_food_list(data)
        
        return jsonify(result = result)

@main_ns.route('/ranking')
@main_ns.response(200, "success")
@main_ns.response(500, "Failed")
class TodayRanking(Resource):
    def get(self):
        """현재 가장 인기있는 음식의 레시피를 반환합니다."""
        result = get_ranking()
        return jsonify(result = result)

