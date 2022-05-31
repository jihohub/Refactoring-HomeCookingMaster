from flask_restx import Resource, Namespace, fields, reqparse
from flask import request, jsonify
from flask_bcrypt import Bcrypt
from hcmk_server.services.s3 import (
    boto3_image_upload,
    default_profile_img
)
from hcmk_server.services.user import (
    db,
    insert_user,
    get_user_by_email,
    get_user_by_id,
    get_user_by_nickname,
    validate_token,
    login,
    logout,
    refresh,
    signup,
    val_email,
    val_nickname
)

from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    jwt_required,
    get_jwt,
    decode_token,
)
from flask_jwt_extended.utils import decode_token

bcrypt = Bcrypt()

user_ns = Namespace(
    name="user",
    description="회원정보를 관리하는 API.",
)

'''
회원가입 API
'''

signin_data_fields = user_ns.model(
    "signin_data",
    {   
        "user_id" : fields.Integer,
        "nickname" : fields.String,
    }
)

signin_fields = user_ns.model(
    "signin",
    {   
        "result" : fields.String,
        "message" : fields.String,
        "data": fields.Nested(signin_data_fields)
    }
)

signin_expect_fields = user_ns.model(
    "signin_expect",
    {   
        "email" : fields.String,
        "password" : fields.String,
        "nickname" : fields.String,
    }
)

@user_ns.route("/signup")
@user_ns.response(200, "success")
@user_ns.response(500, "Failed registration")
class Signup(Resource):
    @user_ns.expect(signin_expect_fields)
    @user_ns.marshal_with(signin_fields)
    def post(self):
        """user 테이블에 회원정보를 등록합니다."""  
        user_data = request.form
        email = user_data.get("email")
        password = user_data.get("password") 
        nickname = user_data.get("nickname") 
        
        try:
            img = request.files["img"]
            try:
                if img.filename == "":
                    image_url = default_profile_img()
                else:
                    image_url = boto3_image_upload(img)
            except UnboundLocalError:
                image_url = default_profile_img()
        except Exception:
            image_url = default_profile_img()

        result = signup(email, password, nickname, image_url)
        return result


'''
이메일 중복 확인 API
'''

val_email_fields = user_ns.model(
    "validate_email",
    {
        "is_valid": fields.Boolean,
        "message": fields.String,
    }
)

val_email_expect_fields = user_ns.model(
    "validate_email_expect",
    {
        "email": fields.String,
    }
)

@user_ns.route("/signup/val_email")
@user_ns.response(200, "success")
class ValidateEmail(Resource):
    @user_ns.expect(val_email_expect_fields)
    @user_ns.marshal_with(val_email_fields)
    def post(self):
        """email이 이미 등록이 되어있는지 확인하고 결과를 보내줍니다."""
        user_data = request.json
        email = user_data.get("email")
        result = val_email(email)
        return result

'''
닉네임 중복 확인 API
'''

val_nickname_fields = user_ns.model(
    "validate_nickname",
    {
        "is_valid": fields.Boolean,
        "message": fields.String,
    }
)

val_nickname_expect_fields = user_ns.model(
    "validate_nickname_expect",
    {
        "nickname": fields.String,
    }
)

@user_ns.route("/signup/val_nickname")
@user_ns.response(200, "success")
class ValidateEmail(Resource):
    @user_ns.expect(val_nickname_expect_fields)
    @user_ns.marshal_with(val_nickname_fields)
    def post(self):
        """닉네임이 이미 등록이 되어있는지 확인하고 결과를 보내줍니다."""
        user_data = request.json
        nickname = user_data.get("nickname")
        result = val_nickname(nickname)
        return result


'''
로그인 API
'''

login_data_fields = user_ns.model(
    "data",
    {
        "access_token" : fields.String,
        "refresh_token" : fields.String,
        "user_id" : fields.Integer,
        "nickname" : fields.String,
        "img" : fields.String,
    }
)

login_fields = user_ns.model(
    "login",
    {
        "result": fields.String,
        "message": fields.String,
        "data": fields.Nested(login_data_fields),
    }
)

login_expect_fields = user_ns.model(
    "login_expect",
    {
        "email": fields.String,
        "password": fields.String,
    }
)

@user_ns.route("/login")
@user_ns.response(200, "success")
class Login(Resource):
    @user_ns.expect(login_expect_fields)
    @user_ns.marshal_with(login_fields)
    def post(self):
        """이메일과 비밀번호를 확인하고 JWT를 발급합니다."""
        user_data = request.json
        email = user_data.get("email")
        password = user_data.get("password")
        result = login(email, password)
        return result


logout_fields = user_ns.model(
    "logout",
    {
        "result": fields.String,
        "message": fields.String,
    }
)

@user_ns.route("/logout")
@user_ns.response(200, "success")
class Logout(Resource):
    @user_ns.marshal_with(logout_fields)
    @jwt_required()
    def delete(self):
        """토큰을 확인하고 로그아웃 시킵니다."""
        result = logout()
        return result



refresh_data_fields = user_ns.model(
    "data",
    {
        "access_token" : fields.String,
    }
)

refresh_fields = user_ns.model(
    "refresh",
    {
        "result": fields.String,
        "message": fields.String,
        "data": fields.Nested(refresh_data_fields),
    }
)

refresh_expect_fields = user_ns.model(
    "refresh_expect",
    {
        "email": fields.String,
        "password": fields.String,
    }
)

refresh_expect_fields = user_ns.model(
    "refresh_expect",
    {
        "refresh_token": fields.String,
    }
)

@user_ns.route("/refresh")
@user_ns.response(200, "success")
@user_ns.response(404, "fail")
class Refresh(Resource):
    @user_ns.expect(refresh_expect_fields)
    @user_ns.marshal_with(refresh_fields)
    def post(self):
        """Refresh 토큰을 받고 새로운 Access 토큰을 발급해줍니다."""
        refresh_token = request.json.get('refresh_token')
        result = refresh(refresh_token)
        return result
        