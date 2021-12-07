from flask import request, jsonify
from flask_restx import Resource, Namespace, fields, reqparse
from hcmk_server.services.main import get_food_list, get_ranking
import requests
import os
from werkzeug.utils import secure_filename

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
        data =request.args["data"].replace(" ", "") #검색어의 띄어쓰기를 제거
        result_data, result, message = get_food_list(data)
        
        return jsonify(result=result, message=message, data=result_data)


today_ranking_data_fields = main_ns.model(
    "today_ranking_data",
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

today_ranking_fields = main_ns.model(
    "today_ranking",
    {
        "result": fields.String,
        "message": fields.String,
        "data": fields.List(fields.Nested(today_ranking_data_fields))
    }
)

@main_ns.route('/ranking')
@main_ns.response(200, "success")
@main_ns.response(500, "Failed")
class TodayRanking(Resource):
    @main_ns.marshal_with(today_ranking_fields)
    def get(self):
        """현재 가장 인기있는 음식의 레시피를 반환합니다."""
        result = get_ranking()
        return result


@main_ns.route('/test')
@main_ns.response(200, "success")
@main_ns.response(500, "Failed")
class test(Resource):
    def post(self):
        """현재 가장 인기있는 음식의 레시피를 반환합니다."""

        f = request.files["img"]

        s_filename = secure_filename(f.filename) # 파일명 저장
        file_dir = '/server/static/uploads/' + s_filename # 파일을 저장하기 위한 경로 지정
 
        f.save(file_dir) # 파일 저장
 
        upload = {'img': open(file_dir, 'rb') } # 업로드하기위한 파일
        res = requests.post('http://machinelearning:5000/receive', files=upload).json()


        # return jsonify(res)
        return res
