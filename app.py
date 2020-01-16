import os
from flask import *
from flask import Flask, render_template
from flask_pymongo import PyMongo

app = Flask(__name__)
uri= os.environ.get('MONGO_URI')
app.config["MONGO_URI"]=uri
mongo = PyMongo(app)
mongo.init_app(app)

@app.route('/', methods=['GET','POST'])
def index():
    user_collection = mongo.db.users
    if request.method == 'POST':
            name = request.form.get("prop_id")
            body = request.form.get("group_html")
            group_jaq = request.form.get("group_jaq")
            
            return render_template('index.jinja2',t)
    
    return render_template('index.jinja2')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')