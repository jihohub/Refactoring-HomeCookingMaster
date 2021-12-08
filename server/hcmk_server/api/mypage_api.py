from flask import request
from flask_restx import Resource, Namespace, fields
from flask_jwt_extended import jwt_required
from hcmk_server.services.mypage import (
    get_mypage,
    edit_img
)

mypage_ns = Namespace(
    name="mypage",
    description="마이페이지 관련 API.",
)

recipe_fields = mypage_ns.model(
    "my_page_liked_recipe",
    {
        "recipe_id": fields.Integer,
        "recipe_name": fields.String,
        "recipe_img" : fields.String,
    }
)

user_info_fields = mypage_ns.model(
    "my_page_user_info",
    {
        "email": fields.String,
        "nickname": fields.String,
        "img": fields.String,
        "intro": fields.String,
        "exp": fields.String,
    }
)

mypage_data_fields = mypage_ns.model(
    "mypage_data",
    {
        "user_info": fields.Nested(user_info_fields),
        "liked_recipe": fields.List(fields.Nested(recipe_fields)),
        "my_post": fields.List(fields.Nested(recipe_fields)),
    }
)

mypage_fields = mypage_ns.model(
    "mypage",
    {
        "result": fields.String,
        "message": fields.String,
        "data": fields.Nested(mypage_data_fields)
    }
)
@mypage_ns.route('')
@mypage_ns.response(200, "Success")
@mypage_ns.response(401, "Fail")
class Mypage(Resource):

    @mypage_ns.marshal_with(mypage_fields)
    @jwt_required()
    def get(self):
        """마이페이지에서 유저 정보, 스크랩한 레시피 리스트, 작성한 포스트의 레시피 리스트 보내주는 API"""
        result = get_mypage()
        return result

'''EditImg Models'''
edit_img_data_fields = mypage_ns.model(
    "edit_img_data",
    {
        "img": fields.String,
    }
)

edit_img_fields = mypage_ns.model(
    "edit_img",
    {
        "result": fields.String,
        "message": fields.String,
        "data": fields.Nested(edit_img_data_fields)
    }
)

edit_img_expect_fields = mypage_ns.model(
    "edit_img_expect",
    {
        "post_id": fields.Integer,
    }
)

@mypage_ns.route('/editimg')
@mypage_ns.response(200, "success")
@mypage_ns.response(500, "Failed")
class EditImg(Resource):
    @mypage_ns.expect(edit_img_expect_fields)
    @mypage_ns.marshal_with(edit_img_fields)
    def post(self):
        """해당 레시피의 좋아요를 관리하는 api"""
        user_id = request.form.get("user_id")
        img = request.files["img"]
        result = edit_img(user_id, img)
        return result