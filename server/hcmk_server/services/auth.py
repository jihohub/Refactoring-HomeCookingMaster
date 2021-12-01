from hcmk_server.models.user import db, User
from flask_bcrypt import Bcrypt
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


def get_user_by_email(email):
    result = User.query.filter_by(email=email).one_or_none()
    return result

def get_user_by_nickname(nickname):
    result = User.query.filter_by(nickname=nickname).one_or_none()
    return result

def get_user_by_id(user_id):
    result = User.query.filter_by(id=user_id).one_or_none()
    return result


def insert_user(email, password, nickname, img, intro):
    try:
        new_user = User(email=email, password=password, nickname=nickname)
        #만약 프로필 이미지와 한 줄 소개가 있다면 db에 넣기
        if img:
            new_user.img = img
        if intro:
            new_user.intro = intro  

        db.session.add(new_user)
        db.session.commit()
        return new_user.id
    except Exception:
        db.session.rollback()
        raise

def validate_token(token):
    user_id = token.get('sub')
    type = token.get('type')
    user = User.query.filter_by(id=user_id).one_or_none()
    if type == 'access':
        if user.access_token == None:
            return False
        if decode_token(user.access_token) != token:
            return False
    else :
        if user.refresh_token == None:
            return False
        if decode_token(user.refresh_token) != token:
            return False
    return True


def login(email, password):
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

    return {
        "result": "success", 
        "message": "로그인 되었습니다." ,
        "data": {
            "access_token" : access_token, 
            "refresh_token" : refresh_token
        }
        }, 200

def logout():

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

def refresh(refresh_token):
    post_refresh_token = decode_token(refresh_token)
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
        
        return {
            "result": "success", 
            "message": "access_token이 재발급 되었습니다." , 
            "data" : {
                "access_token" : new_access_token 
            }
        }, 200
    except Exception:
        db.session.rollback()
        raise