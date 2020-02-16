import os
from flask import *
from flask import Flask, render_template
import pymongo
from cryptography.fernet import Fernet
import requests
#the dirctory of the key open the file with the DB address 
with open('/home/pi/Mimir_database_data/Mimir_db.key', 'rb') as key_got,open('Mimir_db_uri.encrypted', 'rb') as uri_got:
    key = key_got.read()
    mimirdb_uri = uri_got.read()
    key_got.close()
    uri_got.close()
    f = Fernet(key)

app = Flask(__name__)
mongo=pymongo.MongoClient(f.decrypt(mimirdb_uri))
@app.route('/', methods=['GET','POST'])
def index():
 #Create the collection inside the MongoDB server
    mydb=mongo["Mimir"]
    web_data=mydb["web_data"]
    group_data=mydb["group_data"]
    if request.method == 'POST':
        #Get the data from the create group function from the javascript file
        if request.form.get("status")=="creat":
            forms_id_input = request.form.get("forms_id")
            body = request.form.get("group_html")
            name = request.form.get("name")
            #update the data to webdata collection page store and create 2 types of from to types of forms/tabs
            if forms_id_input=="forms":
                html_name="ir_settings_page_store"
            elif forms_id_input=="forms2":
                html_name="wifi_settings_page_store"
            if mydb.list_collection_names():
                send_web_data={"$set": { html_name:body} }
                old_value=web_data.find_one({},{ "_id": 0, html_name: 1})
                web_data.update_one(old_value,send_web_data,upsert=False)
            #Save all the data to group_data collection like buttons name from what form/tab the data came 
            else:
                send_web_data={html_name:body}
                web_data.insert_one(send_web_data)
            """
            if mydb.list_collection_names():
                send_group_data={"$set": { html_name:body} }
                old_group_value=group_data.find_one({},{ "_id": 0, html_name: 1})
                group_data.update_one(old_value,send_web_data,upsert=False)
            else:
                send_group_data={html_name:body}
                group_data.insert_one(send_group_data)
            """
            send_group_data={"name":name,"setting_tab":forms_id_input}
            group_data.insert_one(send_group_data)
        #Update the new change from the page in the UI when the save button press
        elif request.form.get("status")=="update":
            TAB_IR=request.form.get("TAB_IR")
            TAB_WIFI=request.form.get("TAB_WIFI")
            update_web_data={"$set": { "ir_settings_page_store":TAB_IR,"wifi_settings_page_store":TAB_WIFI} }
            update_old_value=web_data.find_one({},{ "_id": 0})
            web_data.update_one(update_old_value,update_web_data)
            return redirect('/?submit', code=302)
        #Remove the group from the db after press the remove buttons in the gorup settings and update the page elements store
        elif request.form.get("status")=="remove":
            remove_web_data={"$set": { "ir_settings_page_store":request.form.get("ir_up"),"wifi_settings_page_store":request.form.get("wifi_up")} }
            remove_old_value=web_data.find_one({},{ "_id": 0})
            web_data.update_one(remove_old_value,remove_web_data)
            
            delete_data=group_data.find({"setting_tab":request.form.get("forms_n"),"name":request.form.get("obj_name")})
            for the_data in delete_data:
                group_data.delete_one(the_data)
                return redirect('/?submit', code=302)
        #Create new button to the db with the a name
        elif request.form.get("status")=="addbutton":
                group={"setting_tab":request.form.get("form"),"name":request.form.get("name")}
                send_group_data_newbutton={'$set': {'button.{}'.format(request.form.get('button_id')):'test'}}
                group_data.update(group,send_group_data_newbutton)
        #Save new button value in this button that create and encrypt this address data by using python cryptography library key you must generate key before using this  
        elif request.form.get("status")=="save_button_value":
                button_data_value=f.encrypt(request.form.get('button_code').encode())
                group={"setting_tab":request.form.get("from_where"),"name":request.form.get("group_name")}
                send_group_button_value={'$set':{'button.{}'.format(request.form.get("button_id")):button_data_value}}
                group_data.update(group,send_group_button_value)
        #When the button pressed its call to this option the call back the address and then decrypt it with the key 
        elif request.form.get("status")=="run_button_value":
            code="button."+request.form.get("button_id")
            excute_group_data=group_data.find_one({"setting_tab":request.form.get("tab"),"name":request.form.get("group_name"),code:{ "$exists": True }},{ "_id": 0,"setting_tab":0,"name": 0})
            excute_data=f.decrypt(excute_group_data["button"][request.form.get("button_id")].encode())
            requests.post(excute_data)
    #Render the page if there is a data else it just call to simple page 
    if mydb.list_collection_names():
        data_web_back=web_data.find_one()
        ir_settings_data=[]
        ir_buttons_data=[]
        wifi_settings_data=[]
        wifi_buttons_data=[]
        #Make a quary to find the page data then send it back to reload the page and elements again  otherwise the dragble option will not work fine 
        for data_group_back in group_data.find({},{ "_id": 0, "setting_tab": 1, "name": 1,"button":1}):
            if data_group_back["setting_tab"]=="forms":
                ir_settings_data.append(data_group_back["name"])
                try: 
                    data_group_back["button"]
                except:
                    print("not ir button")
                else:
                    ir_buttons_data.append(data_group_back["button"])
            elif data_group_back["setting_tab"]=="forms2":
                wifi_settings_data.append(data_group_back["name"])
                try: 
                    data_group_back["button"]
                except:
                    print("not wifi button")
                else:
                    wifi_buttons_data.append(data_group_back["button"])
        if bool(data_web_back)==True or bool(ir_settings_data)==True  or bool(wifi_settings_data)==True :     
            return render_template('index.jinja2',
            ir_settings_page_store=data_web_back["ir_settings_page_store"],
            wifi_settings_page_store=data_web_back["wifi_settings_page_store"],
            ir_settings_data=ir_settings_data,
            wifi_settings_data=wifi_settings_data,
            ir_buttons_data=ir_buttons_data,
            wifi_buttons_data=wifi_buttons_data
            )
        
            
    return render_template('index.jinja2')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')