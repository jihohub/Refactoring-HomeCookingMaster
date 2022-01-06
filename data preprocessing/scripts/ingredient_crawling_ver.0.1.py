import requests
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np
import urllib.request
import os
import csv 

fail_list = []

recipe_df = pd.read_csv(f'./recipe_result_211123.csv')


# for idx in range(recipe_df.shape[0]):
for idx in [263, 264, 416, 507, 625, 775, 819, 837, 849, 943, 1494, 1497, 1636, 1683, 1828]:
    recipe = recipe_df.iloc[idx]
    url_recipe_id = recipe['레시피 고유 번호']
    recipe_id = recipe['recipe_id']

    try:
        headers = {'User-Agent':'Chrome/66.0.3359.181'}
        url = 'https://www.10000recipe.com/recipe/' + str(url_recipe_id)
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            html = response.text
            soup = BeautifulSoup(html, 'html.parser')

            # table = soup.select_one('.ready_ingre3')
            # rows= table.select('li')
            table = soup.select_one('#contents_area > div.view_cont > div > dl > dd')


            # recipe_ingredient.csv 파일 불러오기
            recipe_ingredient = pd.read_csv(f'./recipe_ingredient.csv')


            print(f'recipe {recipe_id} - 재료 crawling')
            # for row in rows:
            #     temp_row = row.get_text()
            #     amount_row = row.select_one('span').get_text()
            #     ingredient = temp_row.replace(amount_row, '').strip()
            #     amount = amount_row.strip()
            #     recipe_ingredient_dic = {'recipe_id' : recipe_id, 'ingredient' : ingredient, 'amount' : amount}
            #     recipe_ingredient = recipe_ingredient.append(recipe_ingredient_dic, ignore_index=True)

            rows = table.get_text().split(',')
            print(rows)
            for row in rows:
                ingredient = row.strip().split(' ')[0]
                amount = row.strip().split(' ')[1]
                recipe_ingredient_dic = {'recipe_id' : recipe_id, 'ingredient' : ingredient, 'amount' : amount}
                print(recipe_ingredient_dic)
                recipe_ingredient = recipe_ingredient.append(recipe_ingredient_dic, ignore_index=True)
            
            # recipe_process 추가후 저장하기
            recipe_ingredient.to_csv(f'./recipe_ingredient.csv', index=False)

        else : 
            print(response.status_code)
    except Exception as e:
        fail_list.append(recipe_id)
        print(str(e))


print('fail_list: ', fail_list)


