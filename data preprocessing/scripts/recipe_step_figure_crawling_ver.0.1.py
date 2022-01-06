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
for idx in [1533]:
    recipe = recipe_df.iloc[idx]
    url_recipe_id = recipe['레시피 고유 번호']
    recipe_id = recipe['recipe_id']

    # 저장할 폴더가 있는지 확인하고 없으면 만들기
    if not os.path.exists(f'./img/{recipe_id}'):
        os.makedirs(f'./img/{recipe_id}')

    try:
        headers = {'User-Agent':'Chrome/66.0.3359.181'}
        url = 'https://www.10000recipe.com/recipe/' + str(url_recipe_id)
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            html = response.text
            soup = BeautifulSoup(html, 'html.parser')

            #메인 레시피 이미지 받아오기
            recipe_img = soup.select_one('#main_thumbs')
            recipe_img_url = recipe_img['src']
            urllib.request.urlretrieve(recipe_img_url, f'./img/{recipe_id}/{recipe_id}_recipe_img.jpg')

            # step view를 받아옴
            steps = soup.select('.view_step_cont')

            # recipe_process.csv 파일 불러오기
            recipe_process = pd.read_csv(f'./recipe_process.csv')

            for idx, step in enumerate(steps):
                step_div = step.select_one('.media-body')
                print(f'recipe {recipe_id} - step {idx + 1} crawling')
                # dataframe에 넣기 위한 dic 만들기
                step_text = step_div.get_text()
                if step_div.select_one('a') != None:
                    dummy = step_div.select_one('a').get_text()
                    step_text = step_text.replace(dummy, '')
                step_text = step_text.replace('\n', ' ').strip()
                recipe_process_dic = {'recipe_id' : recipe_id, 'step' : idx + 1, 'recipe' : step_text}
                recipe_process = recipe_process.append(recipe_process_dic, ignore_index=True)
                # 설명 이미지 저장
                if step.select_one('img'):
                    img_url = step.select_one('img')['src']
                    urllib.request.urlretrieve(img_url, f'./img/{recipe_id}/{recipe_id}_step_{idx + 1}.jpg')

            # recipe_process 추가후 저장하기
            recipe_process.to_csv(f'./recipe_process.csv', index=False)

        else : 
            print(response.status_code)
    except Exception as e:
        fail_list.append(recipe_id)
        print(str(e))


print('fail_list: ', fail_list)


            

