import sqlite3
from sqlite3 import Error 
import os
#import bucket
import json

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
    conn = sqlite3.connect(dbname)
    result = conn.execute('select * from posts')
    for row in result:
        print(row)




def ingest_data():
    data = bucket.upload_and_receive_data()
    
    conn = None

    conn = sqlite3.connect(dbname)
    print(sqlite3.version)
    for r in data:
        loc_x = r[0]
        loc_y = r[1]
        url = r[2]
        result = conn.execute('SELECT MAX(assetid) FROM posts').fetchone()
        #print(result[0])
        if result[0] == None:
            result = [0]
        #print(loc_x,loc_y,url)

        conn.execute(f"INSERT INTO posts (assetid, userid, location_x, location_y, photourl, artist, caption) VALUES ({int(result[0]+1)}, 10, {loc_x}, {loc_y}, '{url}', 'unknown', 'cool haha funny');")
    res = conn.execute("select * from posts")
    conn.commit()
    for row in res:
        print(row)
    
    
def make_json_from_db():
    data = []
    coordsx = []
    coordsy = []
    coords = []
    
    conn = sqlite3.connect(dbname)
    result = conn.execute('select photourl from posts')
    x = conn.execute('select location_x from posts')
    y = conn.execute('select location_y from posts')
   
    for row in result:
        if not(row == None): 
         #print(row[0])
         data.append(row[0])
    for row in x:
        #print(row[0])
        coordsx.append(row[0])
    for row in y:
        #print(row[0])
        coordsy.append(row[0])
    coords = [[x, y] for x, y in zip(coordsx, coordsy)]
         

    jsondata = {
        "content" : data,
        "coords" : coords
    }
    with open("static//urls.json", "w") as json_file:
    # write the list to the file in JSON format
     json.dump(jsondata, json_file)



#delete_all_data()
#ingest_data()
#read_all_data()

make_json_from_db()







