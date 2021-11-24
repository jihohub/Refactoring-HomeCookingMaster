"""
넷플릭스 데이터셋을 netflix_contents 테이블에 밀어넣어주는 스크립트 입니다.
"""

import csv
import pymysql
import os
import sys
from dotenv import load_dotenv

a = os.path.abspath("script_jobs/csv_files/netflix_contents_with_types.csv")
print(a)

load_dotenv()

env_variables = {
    "DB_NAME": os.getenv("DATABASE_NAME"),
    "DB_HOST": os.getenv("DATABASE_HOST"),
    "DB_USER": os.getenv("DATABASE_USER"),
    "DB_PASSWORD": os.getenv("DATABASE_PASSWORD"),
}

# Check all required env variables are set.
for key, val in env_variables.items():
    if env_variables[key] is None or env_variables[key] == "None":
        print("Not all required variables are set. Please double check.")
        sys.exit()
    else:
        print(f"{key} variable loaded.")

# # db 접속
# conn = pymysql.connect(
#     host=env_variables["DB_HOST"],
#     user=env_variables["DB_USER"],
#     password=env_variables["DB_PASSWORD"],
#     db=env_variables["DB_NAME"],
#     charset="utf8",
# )
# curs = conn.cursor()

# # 파일 불러오기 
# file_path = '../csv_file/food_label_data.csv'
# f = open(file_path, "r", encoding="UTF-8")
# csv_data = csv.reader(f)
# header = next(csv_data)

# # csv to mysql
# for row in csv_data:
#     name = row[2]
#     category_l = row[0]
#     category_m = row[1]
#     category_s = row[2]
#     sql = """insert into food (
#         name, category_l, category_m, category_s
#         )
#         values (%s, %s, %s, %s)"""
#     curs.execute(
#         sql,
#         [
#             name,
#             category_l,
#             category_m,
#             category_s,
#         ],
#     )

# # db 저장
# conn.commit()
# # 파일 닫기
# f.close()

# # db 접속 해제
# conn.close()

# print("Added food data.")

# db 접속
conn = pymysql.connect(
    host=env_variables["DB_HOST"],
    user=env_variables["DB_USER"],
    password=env_variables["DB_PASSWORD"],
    db=env_variables["DB_NAME"],
    charset="utf8",
)
curs = conn.cursor()


sql = """insert into recipe (name, views, like, servings, difficulty, cooking_time, food_id )
        values (%s, %s, %s, %s, %s, %s, %s)"""
curs.execute(sql, ['콩밥', 0,0,'1인분', '어려움','2시간이내', 1])
# # recipe db 넣기
# # 파일 불러오기 
# file_path = '../csv_file/test.csv'
# f = open(file_path, "r", encoding="UTF-8")
# csv_data = csv.reader(f)
# header = next(csv_data)

# # csv to mysql
# for row in csv_data:
#     name = row[0]
#     views = row[1]
#     like = row[2]
#     servings = row[3]
#     difficulty = row[4]
#     cooking_time = row[5]
#     food_id = row[6]
#     sql = """insert into recipe ( 
#         name, views, like, servings, difficulty, cooking_time, food_id
#         )
#         values (%s, %s, %s, %s, %s, %s, %s)"""
#     curs.execute(
#         sql,
#         [
#             name,
#             views,
#             like,
#             servings,
#             difficulty,
#             cooking_time,
#             food_id
#         ],
#     )

# db 저장
conn.commit()
# 파일 닫기
# f.close()

# db 접속 해제
conn.close()

print("Added recipe data.")


# # db 접속
# conn = pymysql.connect(
#     host=env_variables["DB_HOST"],
#     user=env_variables["DB_USER"],
#     password=env_variables["DB_PASSWORD"],
#     db=env_variables["DB_NAME"],
#     charset="utf8",
# )
# curs = conn.cursor()

# # 파일 불러오기
# file_path = '../csv_file/recipe_ingredient_211123.csv'
# f = open(file_path, "r", encoding="UTF-8")
# csv_data = csv.reader(f)
# header = next(csv_data)

# # csv to mysql
# for row in csv_data:
#     recipe_id = row[0]
#     name = row[1]
#     amount = row[2]
#     sql = """insert into recipe_ingredent (
#         name, amount, recipe_id
#         )
#         values (%s, %s, %s)"""
#     curs.execute(
#         sql,
#         [
#             name,
#             amount,
#             recipe_id,
#         ],
#     )

# # db 저장
# conn.commit()
# # 파일 닫기
# f.close()
# # db 접속 해제
# conn.close()

# print("Added recipe_ingredent data.")
