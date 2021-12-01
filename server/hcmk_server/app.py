from flask import Flask
from flask_migrate import Migrate
from flask_restx import Api
# from flask_jwt_extended import JWTManager

from hcmk_server import config
from hcmk_server.db_connect import db
from hcmk_server.api import auth_api, recipe_api

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

    # Configure Database
    app.config["SQLALCHEMY_DATABASE_URI"] = config.SQLALCHEMY_DATABASE_URI
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    Migrate().init_app(app, db)
    
    print("migration added")

    # models import
    from .models import user, recipe, recipe_ingredient, recipe_process, recipe_like, post, food

    rest_api.init_app(app)

    from .api.auth_api import auth_ns
    from .api.recipe_api import recipe_ns
    from .api.main_api import main_ns

    rest_api.add_namespace(auth_ns, "/api/auth")
    rest_api.add_namespace(recipe_ns, "/api/recipe")
    rest_api.add_namespace(main_ns, "/api/main")


    return app


# application = create_app()

# if __name__ == "__main__":
#     HOST = "0.0.0.0"
#     PORT = 5001
#     application.run(host=HOST, port=PORT, debug=True)