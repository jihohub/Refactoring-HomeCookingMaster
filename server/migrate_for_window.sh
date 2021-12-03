export FLASK_APP=hcmk_server.app
export FLASK_ENV=development

python db/scripts/create_db.py
flask db upgrade
python db/scripts/initialize_hcmk_data.py