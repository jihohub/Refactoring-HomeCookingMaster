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
    "DB_PORT" : int(os.getenv("DATABASE_PORT"))
}

# Check all required env variables are set.
for key, val in env_variables.items():
    if env_variables[key] is None or env_variables[key] == "None":
        print("Not all required variables are set. Please double check.")
        sys.exit()
    else:
        print(f"{key} variable loaded.")

# db 접속
conn = pymysql.connect(
    host=env_variables["DB_HOST"],
    user=env_variables["DB_USER"],
    password=env_variables["DB_PASSWORD"],
    port=env_variables["DB_PORT"],
    db=env_variables["DB_NAME"],
    charset="utf8",
)
curs = conn.cursor()

'''
food db 넣기
'''

# 파일 불러오기 
file_path = '../csv_file/food_label_data.csv'
f = open(file_path, "r", encoding="UTF-8")
csv_data = csv.reader(f)
header = next(csv_data)

# csv to mysql
for row in csv_data:
    name = row[2]
    category_l = row[0]
    category_m = row[1]
    category_s = row[2]
    sql = """insert into food (
        name, category_l, category_m, category_s
        )
        values (%s, %s, %s, %s)"""
    curs.execute(
        sql,
        [
            name,
            category_l,
            category_m,
            category_s,
        ],
    )

# db 저장
conn.commit()
# 파일 닫기
f.close()

print("Added food data.")

'''
recipe db 넣기
'''
# 파일 불러오기 
file_path = '../csv_file/recipe_result_211124.csv'
f = open(file_path, "r", encoding="UTF-8")
csv_data = csv.reader(f)
header = next(csv_data)

# csv to mysql
for row in csv_data:
    name = row[5]
    views = 0
    likes = 0
    servings = row[9]
    difficulty = row[10]
    cooking_time = row[11]
    food_id = row[1]
    sql = """insert into recipe ( 
        name, views, likes, servings, difficulty, cooking_time, food_id
        )
        values (%s, %s, %s, %s, %s, %s, %s)"""
    curs.execute(
        sql,
        [
            name,
            views,
            likes,
            servings,
            difficulty,
            cooking_time,
            food_id
        ],
    )

# db 저장
conn.commit()
# 파일 닫기
f.close()

print("Added recipe data.")

'''
recipe_ingredent db 넣기
'''

# 파일 불러오기
file_path = '../csv_file/recipe_ingredient_211124.csv'
f = open(file_path, "r", encoding="UTF-8")
csv_data = csv.reader(f)
header = next(csv_data)

# csv to mysql
for row in csv_data:
    recipe_id = row[0]
    name = row[1]
    amount = row[2]
    sql = """insert into recipe_ingredent (
        name, amount, recipe_id
        )
        values (%s, %s, %s)"""
    curs.execute(
        sql,
        [
            name,
            amount,
            recipe_id,
        ],
    )

# db 저장
conn.commit()
# 파일 닫기
f.close()

print("Added recipe_ingredent data.")


'''
recipe_ingredent db 넣기
'''

# 파일 불러오기
file_path = '../csv_file/recipe_process_211124.csv'
f = open(file_path, "r", encoding="UTF-8")
csv_data = csv.reader(f)
header = next(csv_data)

# csv to mysql
for row in csv_data:
    recipe_id = row[0]
    step = row[1]
    recipe = row[2]
    sql = """insert into recipe_process (
        recipe_id, step, recipe
        )
        values (%s, %s, %s)"""
    curs.execute(
        sql,
        [
            recipe_id,
            step,
            recipe,
        ],
    )

# db 저장
conn.commit()
# 파일 닫기
f.close()

print("Added recipe_process data.")

# db 접속 해제
conn.close()