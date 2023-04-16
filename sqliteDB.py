import sqlite3
from sqlite3 import Error 
import os
from io import BytesIO
import pandas as pd
from google.cloud import storage
from PIL import Image
from PIL.ExifTags import TAGS
from pillow_heif import register_heif_opener
import os
import piexif
import csv
import uuid
import time


storage_client = storage.Client(project="Rocks")

bucket_name = "example-bucket-rocks"
bucket = storage_client.get_bucket(bucket_name)


#import bucket
current_path = os.getcwd()
dbname = "rocksdb.db"
def create_connection(db_file):
   
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        print(sqlite3.version)
        

        
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()
    

def delete_all_data():
    conn = sqlite3.connect(dbname)

    # Execute the query to delete all rows from a table
    conn.execute('DELETE  FROM posts')

    # Commit the changes to the database
    conn.commit()

def read_all_data():
    folder_path = "C:\\Users\\alex-\\Desktop\\SQL WILDHACKS\\WildHacks2023\\jpgs"
    thumbnail_path = "C:\\Users\\alex-\\Desktop\\SQL WILDHACKS\\WildHacks2023\\thumbnails"

    if not os.path.exists(thumbnail_path):
        os.mkdir(thumbnail_path)

   
    conn = sqlite3.connect(dbname)
    result = conn.execute('select rockid, url from rocks')
    
    for row in result:
        for root, dirs, files in os.walk(thumbnail_path):
            for file in files:
                #print(str(files))
                if row[1].find(str(file)) != -1:
                    print(f"found!!! {file}")

                    new_name = str(file)
                    blob = bucket.blob(f'thumbknails/{new_name}')

                    blob.content_type = "image/jpeg"

                    blob.upload_from_filename(f'C:\\Users\\alex-\\Desktop\\SQL WILDHACKS\\WildHacks2023\\thumbnails\\{new_name}')
                    newurl = f'https://storage.googleapis.com/example-bucket-rocks/thumbknails/{new_name}'
                    result = conn.execute(f"UPDATE rocks SET thumb_url = '{newurl}' WHERE rockid = {row[0]};")
                    time.sleep(.2)
                    break

    #os.system(f'images/jpgs/{img}')
    #url = f'https://storage.cloud.google.com/example-bucket-rocks/images/{new_name}?authuser=2'





    conn.commit()



# def ingest_data():
#     data = bucket.upload_and_receive_data()
    
#     conn = None

#     conn = sqlite3.connect(dbname)
#     print(sqlite3.version)
#     for r in data:
#         loc_x = r[0]
#         loc_y = r[1]
#         url = r[2]
#         result = conn.execute('SELECT MAX(assetid) FROM posts').fetchone()
#         #print(result[0])
#         if result[0] == None:
#             result = [0]
#         #print(loc_x,loc_y,url)

#         conn.execute(f"INSERT INTO posts (assetid, userid, location_x, location_y, photourl, artist, caption) VALUES ({int(result[0]+1)}, 10, {loc_x}, {loc_y}, '{url}', 'unknown', 'cool haha funny');")
#     res = conn.execute("select * from posts")
#     conn.commit()
#     for row in res:
#         print(row)
    
    
def fix_data():
    conn = None

    conn = sqlite3.connect(dbname)

    res = conn.execute("select * from rocks")
    cursor = conn.cursor()
    for row in res:
        asset_id = row[0]
        url = row[4]
        image = url.split("/")[5].split("?")[0]
        new_url = f'https://storage.googleapis.com/example-bucket-rocks/images/{image}'

        sql = '''UPDATE posts SET photourl = ? WHERE assetid= ?'''
        cursor.execute(sql, (new_url, asset_id))
    
    res = conn.execute("select * from posts")
    for row in res:
        asset_id = row[0]
        url = row[4]
    conn.commit()
    
#delete_all_data()
#ingest_data()
read_all_data()
#fix_data()

#conn = None

#conn = sqlite3.connect(dbname)

#cursor = conn.cursor()


# cursor.execute(sql)
# conn.execute(f"INSERT INTO rocks (userid, caption, assetid) "+
#               f"VALUES (1, 'This ROCKS', 1);")

#conn.commit()
# sql = '''CREATE TABLE rocks (
#              rockid INTEGER PRIMARY KEY,
#              userid INTEGER,
#              latitude INTEGER,
#              longitude INTEGER,
#              url TEXT
#          )'''
# cursor.execute(sql)

# result = conn.execute('select * from posts')
# for row in result:
#     lat = row[2]
#     long = row[3]
#     url = row[4]

#     conn.execute(f"INSERT INTO rocks (userid, latitude, longitude, url) "+
#               f"VALUES (1, {lat}, {long}, '{url}');")
# result = conn.execute('select * from rocks')
# for row in result:
#     print(row)

# sql = '''CREATE TABLE posts (
#              postid INTEGER PRIMARY KEY,
#              userid INTEGER,
#              caption TEXT,
#              rockid INTEGER
#          )'''
# cursor.execute(sql)
# sql = '''CREATE TABLE likes (
#              likeid INTEGER PRIMARY KEY,
#              postid INTEGER
#          )'''
# cursor.execute(sql)
# sql = '''CREATE TABLE comments (
#              commentid INTEGER PRIMARY KEY,
#              userid INTEGER,
#              comment TEXT,
#              postid INTEGER
#          )'''
# cursor.execute(sql)
# sql = '''CREATE TABLE users (
#              userid INTEGER PRIMARY KEY,
#              username TEXT
#          )'''
# cursor.execute(sql)

# sql = '''DROP TABLE IF EXISTS cards'''
# cursor.execute(sql)
# sql = '''DROP TABLE IF EXISTS rocks'''
# cursor.execute(sql)
# sql = '''DROP TABLE IF EXISTS likes'''
# cursor.execute(sql)
# sql = '''DROP TABLE IF EXISTS comments'''
# cursor.execute(sql)



# conn.execute(f"INSERT INTO posts (userid, caption, rockid) "+
#               f"VALUES (1, 'This ROCKS', 1);")
# conn.execute(f"INSERT INTO likes (postid) "+
#               f"VALUES (1);")
# conn.execute(f"INSERT INTO comments (userid, postid, comment) "+
#               f"VALUES (2, 1, 'more like rolls HAHAHHAHAHAHHAHAHAHAHHA');")
# conn.execute(f"INSERT INTO users (username) "+
#               f"VALUES ('Dwayne');")
# conn.execute(f"INSERT INTO users (username) "+
#               f"VALUES ('Alex');")


#.commit()






