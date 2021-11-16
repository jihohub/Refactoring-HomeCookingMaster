from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restx import Api

# from flask_cors import CORS
import os
import sys
from dotenv import load_dotenv