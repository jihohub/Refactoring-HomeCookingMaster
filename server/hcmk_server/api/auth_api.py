from flask_restx import Resource, Namespace, fields, reqparse
from flask import request, jsonify
from flask_bcrypt import Bcrypt
from hcmk_server.services.auth import (
    db,
    insert_user,
    get_user_by_email,
    get_user_by_id,
    get_user_by_nickname,
)

bcrypt = Bcrypt()

auth_ns = Namespace(
    name="auth",
    description="회원정보를 관리하는 API.",
)

signin_fields = auth_ns.model(
    "user",
    {
        "nickname": fields.String,
    }
)

@auth_ns.route("/signup")
@auth_ns.response(200, "success")
@auth_ns.response(500, "Failed registration")
class Signup(Resource):
    """user 테이블에 회원정보를 등록합니다."""

    @auth_ns.doc("POST Sign up for user")
    @auth_ns.marshal_with(signin_fields)
    def post(self):

        user_data = request.json

        email = user_data.get("email")
        password = user_data.get("password") 
        nickname = user_data.get("nickname") 

        '''
        TODO 이미지 s3에 올리고 주소 받아오는게 필요할듯?
        '''
        img = user_data.get("img")
        intro = user_data.get("intro")

        # 패스워드 hash 변환
        password_hash = bcrypt.generate_password_hash(password).decode("utf-8")
        # 필수 정보 db에 입력 및 현재 유저 정보 읽기
        current_user = get_user_by_id(insert_user(email, password_hash, nickname, img, intro))

        result = {
            'nickname': current_user.nickname
        }

        return result


val_email_fields = auth_ns.model(
    "validate_email",
    {
        "overlaps": fields.Boolean,
    }
)

@auth_ns.route("/signup/val_email")
@auth_ns.response(200, "success")
class ValidateEmail(Resource):
    """email이 이미 등록이 되어있는지 확인하고 결과를 보내줍니다."""

    @auth_ns.doc("POST Validate Email")
    @auth_ns.marshal_with(val_email_fields)
    def post(self):
        
        try:
            user_data = request.json

            email = user_data.get("email")
            user = get_user_by_email(email)
            
            if user:
                result = { 'overlaps': True }
            else :
                result = { 'overlaps': False }
        except:
            result = { 'overlaps': True }

        return result

val_nickname_fields = auth_ns.model(
    "validate_nickname",
    {
        "overlaps": fields.Boolean,
    }
)

@auth_ns.route("/signup/val_nickname")
@auth_ns.response(200, "success")
class ValidateEmail(Resource):
    """닉네임이 이미 등록이 되어있는지 확인하고 결과를 보내줍니다."""

    @auth_ns.doc("POST Validate Nickname")
    @auth_ns.marshal_with(val_nickname_fields)
    def post(self):

        try:
            user_data = request.json

            nickname = user_data.get("nickname")
            user = get_user_by_nickname(nickname)
            
            if user:
                result = { 'overlaps': True }
            else :
                result = { 'overlaps': False }
        except:
            result = { 'overlaps': True }

        return result