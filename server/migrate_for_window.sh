export FLASK_APP=hcmk_server.app
export FLASK_ENV=development

flask db init
python db/scripts/create_db.py
flask db migrate
flask db upgrade
python db/scripts/initialize_hcmk_data.py