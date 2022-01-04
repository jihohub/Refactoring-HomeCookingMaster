import json

# food_table = json.loads("./index_name.json")
with open('./index_name.json', 'r', encoding='utf8') as f:
    sample = json.load(f)

print(sample['334'])
