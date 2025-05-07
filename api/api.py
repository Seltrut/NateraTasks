from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
import sqlite3



app = Flask(__name__)
api = Api(app)
CORS(app)

class Tasks(Resource):
    def get(self):

        prio = request.args.get('priority')
        query = 'select * from tasks' 
        if prio is not None:
            query = query + ' where priority = "' + prio + '"'

        conn = sqlite3.connect("tasks.db")
        cursor = conn.execute(query)
        data = cursor.fetchall()
        names = list(map(lambda x: x[0], cursor.description))
        json_data = []
        i = 0
        print(data)
        for d in data:
            json_data.append({
                names[0]: data[i][0],
                names[1]: data[i][1],
                names[2]: data[i][2],
                names[3]: data[i][3]
            })
            i = i + 1
        return json_data, 200

    def post(self):
        title = request.json['title']
        desc = request.json['description']
        priority = request.json['priority']
        try:
            conn = sqlite3.connect("tasks.db")
            data = [None, title, desc, priority]
            conn.execute('INSERT INTO tasks VALUES(?, ?, ?, ?)', data)
            conn.commit()
        except Exception as e:
            print("THERE WAS A PROBLEM")
            print(str(e))

        return 200

api.add_resource(Tasks, '/tasks')

def create_table():
    conn = sqlite3.connect("tasks.db")
    all_tables = conn.execute('''SELECT name FROM sqlite_master WHERE type='table' and name='TASKS';''').fetchall()
    if len(all_tables) > 0:
        print('table already exists')
        return
    else:
        print('creating table')
        conn.execute('''CREATE TABLE TASKS
            (ID INTEGER PRIMARY KEY NOT  NULL,
            TITLE           TEXT                NOT NULL,
            DESC            TEXT                NOT NULL,
            PRIORITY        TEXT NOT NULL);''')
        data = [
            (None,"create api", 'create tasks api for natera', 'high'),
            (None, 'create frontend', 'create react front end for natera', 'high'),
            (None, 'sleep', 'get some rest', 'low'),
        ]
        conn.executemany("INSERT INTO tasks VALUES(?, ?, ?, ?)", data)
        conn.commit()

if __name__ == '__main__':
    create_table()
    app.run(debug=True)
    