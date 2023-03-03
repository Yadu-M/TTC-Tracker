import xml.etree.ElementTree as ET
import requests
import json
import ipinfo

# stopId = '0637'
command_url = f"https://retro.umoiq.com/service/publicXMLFeed?command=routeList&a=ttc"

ttcData = requests.get(command_url).text

print(ttcData)
# json.dump(ttcData.text, fp="test.json")

# def timeToDip(userTime):

#     webPage = requests.get(url)
#     text = webPage.text
#     data = ET.fromstring(text)

#     print("test")
#     if int(data.find('predictions').find('direction').find('prediction').get('minutes')) <= int(userTime):
#         print("Yo time to dip")
#         return "Yo time to dip, bus coming in " + data.find('predictions').find('direction').find('prediction').get('minutes' + " minutes!")
#     else:
#         print("you can watch more anime sickomode!")
