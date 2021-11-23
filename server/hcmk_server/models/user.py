from hcmk_server.db_connect import db
'''
사용자 DB
'''
class User(db.Model):

    __tablename__ = "user"
    ''' 
    email = 아이디(이메일)       
    password = 비밀번호
    name = 사용자 이름
    nickname = 닉네임
    img = 프로필 사진 주소
    intro = 한 줄 소개
    exp = 경험치
    '''
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    email = db.Column(db.String(256), nullable=False, unique=True)
    password = db.Column(db.String(64), nullable=False)
    name = db.Column(db.String(32), nullable=False)
    nickname = db.Column(db.String(128))
    img = db.Column(db.String(1024))
    intro = db.Column(db.Text)
    exp = db.Column(db.Integer, nullable=False)

    def __init__(self, email, password, name, nickname, img, intro):
        self.email = email
        self.password = password
        self.name = name
        self.nickname = nickname
        self.img = img
        self.intro = intro
        self.exp = 0

# 사용 편의에 따라 추후 변경 가능
    def to_dict(self):
        return {
            "id": self.id, 
            "email": self.email, 
            "name": self.name,
            "nickname": self.nickname, 
            # "img": self.img, 
            # "intro": self.intro, 
            # "exp": self.exp, 
            }