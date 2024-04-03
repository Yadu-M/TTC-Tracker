from fastapi import FastAPI, status, HTTPException
from database import db_init
from fastapi.middleware.cors import CORSMiddleware
import requests
import xmltodict


app = FastAPI()

origins = [
    "*",
    "http://localhost.*",
    "https://localhost/*",
    "http://localhost:80",
    "http://localhost:8080",
    "http://localhost:8000",
    "https://coe892lab42024g.azurewebsites.net/*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    global db
    db = db_init()   

@app.get("/")
def read_root():
    print(db)
    return {"Hello": "World"}

@app.get("/routes")
def get_routes():
    routes = db['Routes']
    data = routes.find()
    data_to_send = []
    for route in data:
        data_to_send.append({"tag": route['@tag'],
                            
                            "title": route['@title']})
    return data_to_send


@app.get("/directions_stops/{tag}")
def get_directions_and_stops(tag: int):
    directions_stops = []
    try:
        r = requests.get(f'https://retro.umoiq.com/service/publicXMLFeed?command=routeConfig&terse&a=ttc&r={tag}')
        if r.ok:
            data = xmltodict.parse(r.content)
            for direction in data["body"]["route"]["direction"]:
                stops = [tag["@tag"] for tag in direction["stop"]]
                directions_stops.append({
                    "direction": direction["@title"],
                    "stops": stops
                })         
            
            print(directions_stops)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=e)
    return directions_stops


@app.get("/predictions/{route}/{stop}")
def get_predictions(route: int, stop: int):
    data_to_send = []
    try:
        r = requests.get(f'https://retro.umoiq.com/service/publicXMLFeed?command=predictions&a=ttc&r={route}&s={stop}')
        data = xmltodict.parse(r.content)
        # print(data["body"]["predictions"]["direction"]["prediction"])
        for prediction_data in data["body"]["predictions"]["direction"]["prediction"]:
            data_to_send.append({"minute": prediction_data["@minutes"],
                                 "seconds": prediction_data["@seconds"]})
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=e)
    return data_to_send