import os
import ast

# 
#   Import Flask Secret Key and Database Parameters environment variables
#

# Secret Code for Flask Sessions
flask_secret = os.environ.get('FLASK_SECRET')
sqlalchemy_track_modifications = ast.literal_eval(os.environ.get('SQLALCHEMY_TRACK_MODIFICATIONS'))

# Database Parameters
db_host = os.environ.get('DB_HOST')
db_name = os.environ.get('DB_NAME')
db_username = os.environ.get('DB_USERNAME')
db_password = os.environ.get('DB_PASSWORD')

sqlalchemy_database_uri = 'mysql+pymysql://%s:%s@%s/%s' % (db_username, db_password, db_host, db_name)

# TodoList API host and port
api_host = os.environ.get('TODO_API_HOST')
api_port = ast.literal_eval(os.environ.get('TODO_API_PORT'))

