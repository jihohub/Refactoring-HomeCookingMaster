from flask_restx import Resource, Namespace, fields
from flask_jwt_extended import jwt_required
from hcmk_server.services.mypage import get_mypage

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