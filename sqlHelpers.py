import sqlite3
import json

dbname = "rocksdb.db"

def get_rocks_table():
    rock_ids = []
    user_ids = []
    coords = []
    urls = []
    
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

    jsondata = {
        "rock_ids" : rock_ids,
        "user_ids" : user_ids,
        "coords"   : coords,
        "urls"     : urls
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

def get_users_table():
    user_ids = []
    usernames = []
    
    conn = sqlite3.connect(dbname)
    result = conn.execute('select * from users')

    for row in result:
        user_ids.append(row[0])
        usernames.append(row[1])

    jsondata = {
        "user_ids" : user_ids,
        "usernames" : usernames,
    }
    with open("static//json//usersTB.json", "w") as json_file:
     json.dump(jsondata, json_file)

def get_comments_table():
    comment_ids = []
    user_ids = []
    comments = []
    post_ids = []
    
    conn = sqlite3.connect(dbname)
    result = conn.execute('select * from comments')

    for row in result:
        comment_ids.append(row[0])
        user_ids.append(row[1])
        comments.append(row[2])
        post_ids.append(row[3])

    jsondata = {
        "comment_ids" : comment_ids,
        "user_ids" : user_ids,
        "comments" : comments,
        "post_ids" : post_ids
    }
    with open("static//json//commentsTB.json", "w") as json_file:
     json.dump(jsondata, json_file)

def get_likes_table():
    like_ids = []
    post_ids = []
    
    conn = sqlite3.connect(dbname)
    result = conn.execute('select * from likes')

    for row in result:
        like_ids.append(row[0])
        post_ids.append(row[1])

    jsondata = {
        "like_ids" : like_ids,
        "post_ids" : post_ids,
    }
    with open("static//json//likesTB.json", "w") as json_file:
     json.dump(jsondata, json_file)
#get_rocks_table()
#get_posts_table()
#get_users_table()
get_comments_table()
#get_likes_table()