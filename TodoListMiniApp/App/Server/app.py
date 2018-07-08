import pymysql
from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy

import datetime

import config

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = config.sqlalchemy_database_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = config.sqlalchemy_database_uri
app.config['SECRET_KEY'] = config.flask_secret

api = Api(app)

db = SQLAlchemy(app)

class TaskTable(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30))
    description = db.Column(db.Text)
    complete = db.Column(db.Boolean)
    add_time = db.Column(db.DateTime)

    def __repr__(self):
        return '<TaskTable id=%i title=%s>' % (self.id, self.title)

    @staticmethod
    def getColumns():
        return [column.key for column in TaskTable.__table__.columns]

    @staticmethod
    def getEditableColumns():
        return [column.key for column in TaskTable.__table__.columns if column.key != 'id' and column.key != 'add_time']
        
    def toJSON(self):
        return {'id' : self.id, 'title' : self.title, 'description' : self.description, 'complete' : self.complete, 'add_time' : str(self.add_time)}


# A Testing REST API
class Test(Resource):
    def get(self):
        return {'Test' : 'It works!'}
    
    def post(self):
        send = request.get_json()
        return {'Info Send' : send}

#   Task API Example:   
#
#   {
#       'id' : 0
#       'title' : 'task title as a string' ,
#       'description' : 'task description as a string' ,
#       'complete' : [True or False] ,
#       'add-time' : 'datetime'
#   }
#

class Task(Resource):
    # Getting Task Data From database
    def get(self):
        # json received from get request
        receive = request.get_json()
        
        # filter the query data
        if receive is not None:
            valid_receive_dict = {key : value for key, value in receive.items() if key in TaskTable.getColumns()}
            if len(valid_receive_dict) > 0:
                filtered_tasks = list(map(lambda x: x.toJSON(), TaskTable.query.filter_by(**valid_receive_dict)))
                return {'Tasks' : filtered_tasks}
        
        if 'id' in request.values.keys():
            filtered_tasks = list(map(lambda x: x.toJSON(), TaskTable.query.filter_by(id=request.values['id'])))
            return {'Tasks' : filtered_tasks}

        if 'complete' in request.values.keys():
            if request.values['complete'].lower() == 'true':
                filtered_tasks = list(map(lambda x: x.toJSON(), TaskTable.query.filter_by(complete=True)))
                return {'Tasks' : filtered_tasks}
            elif request.values['complete'].lower() == 'false':
                filtered_tasks = list(map(lambda x: x.toJSON(), TaskTable.query.filter_by(complete=False)))
                return {'Tasks' : filtered_tasks}

        # no valid data was sent from the get request, no need to filter the data
        all_tasks = list(map(lambda x: x.toJSON(), TaskTable.query.all()))
        return {'Tasks' : all_tasks}
    
    # Adding Task Data To Database
    def post(self):
        # json received from post request
        receive = request.get_json()

        # filter the received json to ensure that only the valid info can be added to the database
        valid_receive_dict = {key : value for key, value in receive.items() if key in TaskTable.getEditableColumns()}
        
        # add received json to database
        if len(valid_receive_dict) > 0:
            valid_receive_dict['add_time'] = str(datetime.datetime.now())
            signature = TaskTable(**valid_receive_dict)
            db.session.add(signature)
            db.session.commit()

            return {'Success' : True, 'Inserted-Data' : signature.toJSON()}
        
        return {'Success' : False, 'Message' : 'No valid data was sent from the post request'}

    # Modifying Task Data To Database, using id as primary key
    def put(self):
        # json received from put request
        receive = request.get_json()

        if receive is None or 'id' not in receive.keys():
            return {'Success' : False, 'Message' : 'Missing key "id" from the put request'}

        # filter the received json to ensure that only the valid info can be added to the database
        valid_receive_dict = {key : value for key, value in receive.items() if key in TaskTable.getEditableColumns()}
        if len(valid_receive_dict) == 0:
            return {'Success' : False, 'Message' : 'Missing updating parameters from the put request'}

        # query and update the task table
        updated_count = TaskTable.query.filter_by(id=receive['id']).update(valid_receive_dict)
        if updated_count == 0:        
            return {'Success' : False, 'Message' : 'There is no task data where id = %i ' % receive['id']}

        db.session.commit()

        task_table = list(map(lambda x: x.toJSON(), TaskTable.query.filter_by(id=receive['id'])))

        return {'Success' : True, 'Modified-Data' : task_table}

    def delete(self):
        # json received from delete request
        receive = request.get_json()

        if receive is None or 'id' not in receive.keys():
            return {'Success' : False, 'Message' : 'Missing key "id" from the delete request'}
        
        TaskTable.query.filter_by(id=receive['id']).delete()
        db.session.commit()

        return {'Success' : True}


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    return response

api.add_resource(Test, '/')
api.add_resource(Task, '/task')

if __name__ == "__main__":
    app.run(debug=True, port=config.api_port)

    
