export FLASK_APP=hcmk_server.app
export FLASK_ENV=development
export DB_USER=root
export DB_HOST=localhost
export DB_PASSWORD=gksquf
export DB_NAME=hcmk_db
# python -c "import os; print(os.urandom(16))"
# export SECRET_KEY=[]

flask db init
flask db migrate
flask db upgrade