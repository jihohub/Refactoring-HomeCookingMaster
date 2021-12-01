from flask_restx import Resource, Namespace, fields, reqparse
from flask import request, jsonify
from flask_bcrypt import Bcrypt
from hcmk_server.services.auth import (
    db,
    insert_user,
    get_user_by_email,
    get_user_by_id,
    get_user_by_nickname,
    validate_token,
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

auth_ns = Namespace(
    name="auth",
    description="회원정보를 관리하는 API.",
)

'''
회원가입 API
'''

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

    @auth_ns.doc("POST Sign up for user")
    @auth_ns.marshal_with(signin_fields)
    def post(self):
        """user 테이블에 회원정보를 등록합니다."""  

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
        user = get_user_by_id(insert_user(email, password_hash, nickname, img, intro))

        result = {
            'nickname': user.nickname
        }

        return result, 200


'''
이메일 중복 확인 API
'''

val_email_fields = auth_ns.model(
    "validate_email",
    {
        "overlaps": fields.Boolean,
    }
)

@auth_ns.route("/signup/val_email")
@auth_ns.response(200, "success")
class ValidateEmail(Resource):

    @auth_ns.doc("POST Validate Email")
    @auth_ns.marshal_with(val_email_fields)
    def post(self):
        """email이 이미 등록이 되어있는지 확인하고 결과를 보내줍니다."""
        
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

'''
닉네임 중복 확인 API
'''

val_nickname_fields = auth_ns.model(
    "validate_nickname",
    {
        "overlaps": fields.Boolean,
    }
)

@auth_ns.route("/signup/val_nickname")
@auth_ns.response(200, "success")
class ValidateEmail(Resource):

    @auth_ns.doc("POST Validate Nickname")
    @auth_ns.marshal_with(val_nickname_fields)
    def post(self):
        """닉네임이 이미 등록이 되어있는지 확인하고 결과를 보내줍니다."""

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


'''
로그인 API
'''

login_fields = auth_ns.model(
    "login",
    {
        "result": fields.String,
        "message": fields.String,
        "access_token" : fields.String,
        "refresh_token" : fields.String,
    }
)

@auth_ns.route("/login")
@auth_ns.response(200, "success")
class Login(Resource):

    @auth_ns.doc("POST User login")
    @auth_ns.marshal_with(login_fields)
    def post(self):
        """닉네임이 이미 등록이 되어있는지 확인하고 결과를 보내줍니다."""

        user_data = request.json

        email = user_data.get("email")
        password = user_data.get("password")
        
        user = get_user_by_email(email)

        if user is None:
            return {"result": "failed", "message": "이메일 혹은 비밀번호가 일치하지 않습니다."}, 404
        if not bcrypt.check_password_hash(user.password, password):
            return {"result": "failed", "message": "이메일 혹은 비밀번호가 일치하지 않습니다."}, 404

        access_token = create_access_token(
            identity=user.id, additional_claims={"email": user.email, "nickname": user.nickname}
        )
        refresh_token = create_refresh_token(identity=user.id)

        try:
            user.access_token = access_token
            user.refresh_token = refresh_token
            db.session.commit()
        except Exception:
            db.session.rollback()
            raise

        return {"result": "success", "message": "로그인 되었습니다." , "access_token" : access_token, "refresh_token" : refresh_token}, 200


logout_fields = auth_ns.model(
    "logout",
    {
        "result": fields.String,
        "message": fields.String,
    }
)


@auth_ns.route("/logout")
@auth_ns.response(200, "success")
class Logout(Resource):

    @auth_ns.doc("POST User logout")
    @auth_ns.marshal_with(logout_fields)
    @jwt_required()
    def delete(self):
        """닉네임이 이미 등록이 되어있는지 확인하고 결과를 보내줍니다."""

        if validate_token(get_jwt())  == False:
            return {'result' :"fail", 'message':"유효하지 않은 토큰입니다."}, 404

        user_id = get_jwt_identity()
        user = get_user_by_id(user_id=user_id)

        if not user:
            return {'result' :"fail", 'message':"존재하지 않는 사용자입니다."}, 404

        try:
            user.access_token = None
            user.refresh_token = None
            db.session.commit()
            return {"result": "success", 'message':"로그아웃 되었습니다."}, 200
        except Exception:
            db.session.rollback()
            raise



@auth_ns.route("/refresh")
@auth_ns.response(200, "success")
class Refresh(Resource):

    @auth_ns.doc("POST Token Refresh")
    @auth_ns.marshal_with(login_fields)
    def post(self):
        """닉네임이 이미 등록이 되어있는지 확인하고 결과를 보내줍니다."""
        
        post_refresh_token = decode_token(request.json.get('refresh_token'))
        user_id = post_refresh_token.get('sub')

        if validate_token(post_refresh_token) == False:
            return {'result' :"fail", 'message':"유효하지 않은 토큰입니다."}, 404

        user = get_user_by_id(user_id=user_id)
        if not user:
            return {'result' :"fail", 'message':"존재하지 않는 사용자입니다."}, 404

        try:
            new_access_token = create_access_token(
                identity=user.id,
                additional_claims={"email": user.email, "name": user.nickname},
            )
            user.access_token = new_access_token
            db.session.commit()
            
            return {"result": "success", "message": "access_token이 재발급 되었습니다." , "access_token" : new_access_token }, 200
        except Exception:
            db.session.rollback()
            raise



