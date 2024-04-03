from fastapi import FastAPI, status, HTTPException
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


@app.get("/routes")
def get_routes():
    data_to_send = []
    
    r = requests.get("https://retro.umoiq.com/service/publicXMLFeed?command=routeList&a=ttc")
    if r.ok:
        data = xmltodict.parse(r.content)
        routes_data = data['body']['route']
        for route in routes_data:
            data_to_send.append({"tag": route['@tag'],                            
                                "title": route['@title']})
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Something went wrong")    
    return data_to_send


@app.get("/directions_stops/{tag}")
def get_directions_and_stops(tag: int):
    data_to_send = []
    
    r = requests.get(f'https://retro.umoiq.com/service/publicXMLFeed?command=routeConfig&terse&a=ttc&r={tag}')
    if r.ok:
        data = xmltodict.parse(r.content)
        for direction in data["body"]["route"]["direction"]:
            stops = [tag["@tag"] for tag in direction["stop"]]
            data_to_send.append({
                "direction": direction["@title"],
                "stops": stops
            })         
        
        print(data_to_send)
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Something went wrong")
    return data_to_send


@app.get("/directions/{tag}")
def get_directions(tag: int):
    data_to_send = []    
    r = requests.get(f'https://retro.umoiq.com/service/publicXMLFeed?command=routeConfig&terse&a=ttc&r={tag}')
    if r.ok:
        data = xmltodict.parse(r.content)
        for direction in data["body"]["route"]["direction"]:
            data_to_send.append({"direction": direction["@title"]})
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Something went wrong")
    return data_to_send


@app.get("/stops/{tag}/{direction}")
def get_stops(tag: int, direction: str):
    data_to_send = []
    stops_in_order = []
    print(direction)
    r = requests.get(f'https://retro.umoiq.com/service/publicXMLFeed?command=routeConfig&terse&a=ttc&r={tag}')
    if r.ok:
        data = xmltodict.parse(r.content)
        for route_direction in data["body"]["route"]["direction"]:
            if route_direction["@title"] == direction:
                for stop__ in route_direction["stop"]:
                    stops_in_order.append(stop__["@tag"])
        
        for stop in stops_in_order:
            for stop_ in data["body"]["route"]["stop"]:            
                if stop == stop_["@tag"]:
                    data_to_send.append({"tag": stop_["@tag"], 
                                         "title": stop_["@title"]})            
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Something went wrong")
    return data_to_send    


@app.get("/predictions/{route}/{stop}")
def get_predictions(tag: int, stop: int):
    data_to_send = []
    
    r = requests.get(f'https://retro.umoiq.com/service/publicXMLFeed?command=predictions&a=ttc&r={route}&s={stop}')
    data = xmltodict.parse(r.content)
    if ("Error" in data["body"]):    
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error happened")
    else:    
        for prediction_data in data["body"]["predictions"]["direction"]["prediction"]:
            data_to_send.append({"minute": prediction_data["@minutes"],
                                 "seconds": prediction_data["@seconds"]})
    return data_to_send