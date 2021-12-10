from hcmk_server.models.food import Food, db
from hcmk_server.models.recipe import Recipe
from io import BufferedReader
import requests
import json
from werkzeug.utils import secure_filename

def get_food_list(data):
    result = {}
    _like = "%"+data+"%"
    try:
        foods = Food.query.filter(Food.name.like(_like)).order_by(Food.name.asc())
        if foods is None:
            return result, "Success", "검색 결과가 없습니다."
        for food in foods:
            recipes = Recipe.query.filter(Recipe.food_id == food.id).all()
            recipe_dicts = []
            for recipe in recipes:
                recipe_dicts.append(recipe.to_dict())
            result[food.name] = recipe_dicts
        return result, "Success", "검색 결과를 전달하였습니다."
    except Exception:
        db.session.rollback()
        raise

def get_ranking():
    data = []
    ranks = Recipe.query.order_by(Recipe.likes.desc(), Recipe.views.desc()).limit(12)
    for rank in ranks:
        data.append(rank.to_dict())
    return {
        "result" : "Success",
        "message" : "랭킹 레시피를 전달 하였습니다.",
        "data" : data
    }


def get_equal_rate(image):
    #받은 파일 이름 복사
    print(image)
    image.name = image.filename
    # 버퍼로 변환
    image = BufferedReader(image)
    # 머신러닝 서버로 이미지 전송
    # response = requests.post('http://elice-kdt-2nd-team5.koreacentral.cloudapp.azure.com/receive', files={'img': image}).json()
    response = requests.post('http://machinelearning:8000/receive', files={'img': image}).json()

    # 결과값 넣을 딕셔너리, 음식 이름명 넣을 리스트
    result = {}
    foods = []
    equal_rate = []

    # 결과 data에 일치율 리스트 (equal_rate) 넣기
    equal_rate_list = sorted(response.items(), reverse=True, key=lambda item: item[1])
    for equal_rate_tuple in equal_rate_list:
        equal_rate.append({'name' : equal_rate_tuple[0], 'rate': equal_rate_tuple[1]})
    result['equal_rate'] = equal_rate
    
    # 일치율이 가장 높은 3가지 음식명 받기
    food_names = response.keys()
    
    try:
        # 음식명으로 db에서 데이터 찾기
        for food_name in food_names:
            foods.append(Food.query.filter(Food.name.like(food_name)).one())
        # 만약에 db에서 음식명이 없으면 에러
        if foods is None:
            return result, "Success", "검색 결과가 없습니다."
        # 음식마다 레시피 검색해서 넣기
        for food in foods:
            recipes = Recipe.query.filter(Recipe.food_id == food.id).all()
            recipe_dicts = []
            for recipe in recipes:
                recipe_dicts.append(recipe.to_dict())
            result[food.name] = recipe_dicts
        print('type of result: ', type(result))
        return result, "Success", "검색 결과를 전달하였습니다."

    except Exception:
        db.session.rollback()
        raise