import os
import sys
from dotenv import load_dotenv
from datetime import timedelta

# =======================================
# Load & Check environment variables
# =======================================

load_dotenv()
db_name = os.getenv("DATABASE_NAME")
db_host = os.getenv("DATABASE_HOST")
db_user = os.getenv("DATABASE_USER")
db_password = os.getenv("DATABASE_PASSWORD")
db_port = os.getenv("DATABASE_PORT")

env_variables = {
    "DB_NAME": db_name,
    "DB_HOST": db_host,
    "DB_USER": db_user,
    "DB_PWD": db_password,
    "DB_PORT": db_port,
}

# Check all required env variables are set.
for key, val in env_variables.items():
    if env_variables[key] is None or env_variables[key] == "None":
        print("Not all required variables are set. Please double check.")
        sys.exit()
    else:
        print(f"{key} variable loaded.")

print(env_variables["DB_PORT"])
SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{env_variables['DB_USER']}:{env_variables['DB_PWD']}@{env_variables['DB_HOST']}:{env_variables['DB_PORT']}/{env_variables['DB_NAME']}"


# jwt option
key = "hey"
access = timedelta(hours=1)
refresh = timedelta(days=14)