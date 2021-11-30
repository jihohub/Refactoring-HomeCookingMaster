from flask import request, jsonify
from flask_restx import Resource, Namespace, fields, reqparse
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    jwt_required,
    get_jwt,
    decode_token,
)
from hcmk_server.services.auth import (
    db,
    insert_user,
    get_user_by_email,
    get_user_by_id,
    get_user_by_nickname,
    validate_token,
)

mypage_ns = Namespace(
    name="mypage",
    description="마이페이지 관련 API.",
)

liked_recipe_fields = mypage_ns.model(
    "liked_recipe",
    {
        "recipe_id": fields.Integer,
        "recipe_name": fields.String,
        "recipe_img" : fields.String,
    }
)

my_post_fields = mypage_ns.model(
    "my_post",
    {
        "recipe_id": fields.Integer,
        "post": fields.String,
        "recipe_img" : fields.String,
    }
)

mypage_fields = mypage_ns.model(
    "mypage",
    {
        "user_info":
        {
            "email": fields.String,
            "nickname": fields.String,
            "img": fields.String,
            "intro": fields.String,
            "experience": fields.String,
        },
        "liked_recipe": fields.List(fields.Nested(liked_recipe_fields)),
        "my_post": fields.List(fields.Nested(my_post_fields)),
    }
)

@mypage_ns.route('/')
@mypage_ns.response(200, "success")
@mypage_ns.response(500, "Failed")
class SearchbyString(Resource):

    @mypage_ns.doc("POST Sign up for user")
    @mypage_ns.marshal_with(mypage_fields)
    @jwt_required
    def get(self, recipe_id):
        """마이페이지에서 유저 정보, 스크랩한 레시피 리스트, 작성한 포스트의 레시피 리스트 보내주는 API"""
        
        if validate_token(get_jwt())  == False:
            return {'result' :"fail", 'message':"유효하지 않은 토큰입니다."}, 404

        user_id = get_jwt_identity()
        user = get_user_by_id(user_id=user_id)

        

        return jsonify(result = result)