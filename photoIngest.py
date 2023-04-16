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
register_heif_opener()


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










def extract_coord(vals, d):
    decimal = vals[0][0]/vals[0][1]
    minutes = vals[1][0]/vals[0][1]
    seconds = vals[2][0]/vals[2][1]
    dir = d.decode('utf-8')

    dec_coords = decimal + minutes/60 + seconds/3600
    if dir in "SW":
        dec_coords *= -1
    
    return dec_coords



















def add_photo_to_table(path, img):
    data = []
    max_lat = -float("inf")
    min_lat = float("inf")
    max_long = -float("inf")
    min_long = float("inf")
    b = False

    image_path = os.path.join(path, img)
   
    #Change to JPG
    try:
        image = Image.open(image_path)
    except:
        print("fuck")
        
    

    # Extract Meta Data 
    exif_dict = piexif.load(image.info.get('exif'))
    #Latitude
    lat_vals  = exif_dict['GPS'][2]
    lat_dir   = exif_dict['GPS'][1]
    latitude = extract_coord(lat_vals, lat_dir)
    #Longitude
    long_vals = exif_dict['GPS'][4]
    long_dir = exif_dict['GPS'][3]
    longitude = extract_coord(long_vals, long_dir)
    # Upload Image
    new_name = f'{uuid.uuid4()}.jpg'
    image.save(f'images/newuploads/{new_name}')

    
    blob = bucket.blob(f'images/{new_name}')

    blob.content_type = "image/jpeg"

    blob.upload_from_filename(f'images/jpgs/{new_name}')
    #os.system(f'images/jpgs/{img}')
    url = f'https://storage.cloud.google.com/example-bucket-rocks/images/{new_name}?'

    print("Image Uploaded")
    row = [latitude, longitude, url]

    data.append(row)
      
 


        
    





    

    
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




    conn.commit()


    

add_photo_to_table()
