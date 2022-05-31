from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restx import Api
from flask_jwt_extended import JWTManager



from hcmk_server import config
from hcmk_server.db_connect import db
from hcmk_server.api import user_api, recipe_api


rest_api = Api(
    version="1.0",
    title="Home Cook Master Kkokko's API Server",
    description="Home Cook Master Kkokko's API Server",
    terms_url="/",
    contact="elice",
)

def create_app():
    """
    flask 객체를 만들어 반환
    input:
    output: app
    """
    app = Flask(__name__)
    CORS(app, supports_credentials=True)

    # Configure Database
    app.config["SQLALCHEMY_DATABASE_URI"] = config.SQLALCHEMY_DATABASE_URI
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # JWT option setting
    app.config["JWT_SECRET_KEY"] = config.key
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = config.access
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = config.refresh

    jwt = JWTManager(app)

    db.init_app(app)
    Migrate().init_app(app, db)
    
    print("migration added")

    # models import
    from .models import user, recipe, recipe_ingredient, recipe_process, recipe_like, post, food

    rest_api.init_app(app)

    from .api.user_api import user_ns
    from .api.recipe_api import recipe_ns
    from .api.main_api import main_ns
    from .api.mypage_api import mypage_ns

    rest_api.add_namespace(user_ns, "/api/user")
    rest_api.add_namespace(recipe_ns, "/api/recipe")
    rest_api.add_namespace(main_ns, "/api/main")
    rest_api.add_namespace(mypage_ns, "/api/mypage")


    return app


application = create_app()

# if __name__ == "__main__":
#     HOST = "0.0.0.0"
#     PORT = 5000
#     application.run(host=HOST, port=PORT, debug=True)