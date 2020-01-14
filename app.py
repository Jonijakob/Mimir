from flask import *
from flask import Flask, render_template
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
cred = credentials.Certificate("/home/pi/Mimir/shortfin-58804-firebase-adminsdk-frw4d-1c00914f1b.json")
firebase_admin.initialize_app(cred, {
    'databaseURL' : 'https://shortfin-58804.firebaseio.com'
})

data=db.reference()

app = Flask(__name__)

@app.route('/', methods=['GET','POST'])
def index():
    
    if request.method == 'POST':
            name = request.form.get("prop_id")
            body = request.form.get("group_html")
            group_jaq = request.form.get("group_jaq")
            data_got={"name":name,"html":body}
            bob=data.child("webdata").push(data_got)
            ref = db.reference('webdata')
            snapshot = ref.order_by_child('html').get()
            return render_template('index.jinja2',t=snapshot)
    
    return render_template('index.jinja2')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')