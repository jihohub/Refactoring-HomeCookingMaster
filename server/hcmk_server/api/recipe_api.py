from flask_restx import Resource, Namespace, fields, reqparse

recipe_ns = Namespace(
    name="recipe",
    description="레시피를 관리하는 API.",
)