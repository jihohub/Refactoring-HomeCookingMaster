from hcmk_server.models.user import db, User

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