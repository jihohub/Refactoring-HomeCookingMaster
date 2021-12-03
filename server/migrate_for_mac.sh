<<<<<<< HEAD
export FLASK_APP=hcmk_server.app
export FLASK_ENV=development

flask db init
<<<<<<< HEAD:server/migrate_for_mac.sh
python3 db/scripts/create_db.py
=======
python db/scripts/create_db.py
>>>>>>> feb66c3c619689149fadc4ac97d3a890f677b067:server/migrate_for_window.sh
flask db migrate
flask db upgrade
python db/scripts/initialize_hcmk_data.py
=======
# export FLASK_APP=hcmk_server.app
# export FLASK_ENV=development

flask db init
python3 db/scripts/create_db.py
flask db migrate
flask db upgrade
python3 db/scripts/initialize_hcmk_data.py
>>>>>>> feb66c3c619689149fadc4ac97d3a890f677b067
