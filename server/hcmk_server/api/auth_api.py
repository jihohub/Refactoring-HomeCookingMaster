from flask_restx import Resource, Namespace, fields, reqparse

auth_ns = Namespace(
    name="auth",
    description="회원정보를 관리하는 API.",
)