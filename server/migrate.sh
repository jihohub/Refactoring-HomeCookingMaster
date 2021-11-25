export FLASK_APP=hcmk_server.app
export FLASK_ENV=development

flask db init
flask db migrate
flask db upgrade