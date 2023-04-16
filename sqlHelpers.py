import sqlite3
import json

dbname = "rocksdb.db"

def get_rocks_table():
    rock_ids = []
    user_ids = []
    coords = []
    urls = []
    thumbs = []
    
    conn = sqlite3.connect(dbname)
    result = conn.execute('select * from rocks')
    # result = conn.execute('select photourl from posts')
    # x = conn.execute('select location_x from posts')
    # y = conn.execute('select location_y from posts')
    for row in result:
        rock_ids.append(row[0])
        user_ids.append(row[1])
        coords.append([row[2], row[3]])
        urls.append(row[4])
        thumbs.append(row[5])

    jsondata = {
        "rock_ids" : rock_ids,
        "user_ids" : user_ids,
        "coords"   : coords,
        "urls"     : urls,
        "thumnails" : thumbs
    }
    with open("static//json//rocksTB.json", "w") as json_file:
     json.dump(jsondata, json_file)

def get_posts_table():
    post_ids = []
    user_ids = []
    captions = []
    rock_ids = []
    
    conn = sqlite3.connect(dbname)
    result = conn.execute('select * from posts')

    for row in result:
        post_ids.append(row[0])
        user_ids.append(row[1])
        captions.append(row[2])
        rock_ids.append(row[3])

    jsondata = {
        "post_ids" : post_ids,
        "user_ids" : user_ids,
        "captions"   : captions,
        "rock_ids"     : rock_ids
    }
    with open("static//json//postsTB.json", "w") as json_file:
     json.dump(jsondata, json_file)

get_rocks_table()
get_posts_table()