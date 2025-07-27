import requests, json
import pprint as pp

test = requests.get("https://tmuf.exchange/api/tracks",{"authoruserid": 500, "count":147, "fields": "TrackName,TrackId,UId"}, headers={"User-Agent": "TMXData/1.0"})

all_maps = test.json()['Results']

results = []
for map in all_maps:
    results.append([map['TrackName'], map['TrackId'], map['UId']])

results.sort(key=lambda x: x[0])

with open("otherTests/FetchingWRs/TMUFST_mapdata.txt", "w") as end:
    for thing in results:
        end.writelines(f"{thing[0]}\t{thing[1]}\t{thing[2]}\n")