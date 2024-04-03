from pymongo import MongoClient
import requests
import xmltodict

ROUTES_URL = "https://retro.umoiq.com/service/publicXMLFeed?command=routeList&a=ttc"
DIRECTIONS_URL = "https://retro.umoiq.com/service/publicXMLFeed?command=routeConfig&terse&a=ttc&r="

def db_init(): 
    # Replace the uri string with your MongoDB deployment's connection string.
    uri = "mongodb+srv://ttctracker:892project@cluster0.ir9vnug.mongodb.net/"
    client = MongoClient(uri)
    
    try:
        r = requests.get(ROUTES_URL)
        if r.ok:
            data = xmltodict.parse(r.content)
            routes_data = data['body']['route']
    except Exception as e:
        print('Error happened')
        
        
    db = client['TTC-Info']
    coll = db.Routes
    
    coll.drop()
    
    coll.insert_many(routes_data)
    return db

