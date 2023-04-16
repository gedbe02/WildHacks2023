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

# Setup
storage_client = storage.Client(project="Rocks")

bucket_name = "example-bucket-rocks"
bucket = storage_client.get_bucket(bucket_name)

register_heif_opener()


def extract_coord(vals, d):
    decimal = vals[0][0]/vals[0][1]
    minutes = vals[1][0]/vals[0][1]
    seconds = vals[2][0]/vals[2][1]
    dir = d.decode('utf-8')

    dec_coords = decimal + minutes/60 + seconds/3600
    if dir in "SW":
        dec_coords *= -1
    
    return dec_coords

def upload_and_receive_data():
    data = []
    max_lat = -float("inf")
    min_lat = float("inf")
    max_long = -float("inf")
    min_long = float("inf")
    b = False
    for img in os.listdir("images/rocks"):
        #img = "wario.jpg"
        image_path = f'images/rocks/{img}'
        #image_path = f'images/wario.jpg'
        #Change to JPG
        try:
            image = Image.open(image_path)
        except:
            print("fuck")
            continue
        

        # # Extract Meta Data 
        # exif_dict = piexif.load(image.info.get('exif'))
        # #Latitude
        # lat_vals  = exif_dict['GPS'][2]
        # lat_dir   = exif_dict['GPS'][1]
        # latitude = extract_coord(lat_vals, lat_dir)
        # #Longitude
        # long_vals = exif_dict['GPS'][4]
        # long_dir = exif_dict['GPS'][3]
        # longitude = extract_coord(long_vals, long_dir)
        # # Upload Image
        # new_name = f'{uuid.uuid4()}.jpg'
        # image.save(f'images/jpgs/{new_name}')

        blob = bucket.blob(f'images/{new_name}')

        blob.content_type = "image/jpeg"

        blob.upload_from_filename(f'images/jpgs/{new_name}')
        #os.system(f'images/jpgs/{img}')
        url = f'https://storage.cloud.google.com/example-bucket-rocks/images/{new_name}?authuser=2'

        print("Image Uploaded")
        row = [latitude, longitude, url]

        data.append(row)
        # Min Max Calc
        if latitude >= max_lat:
            max_lat = latitude
        if latitude <= min_lat:
            min_lat = latitude

        if longitude >= max_long:
            max_long = longitude
        if longitude <= min_long:
            min_long = longitude
    return data
    #print(f'Max Latitude: {max_lat}, Min Latitude: {min_lat}')
    #print(f'Max Longitude: {max_long}, Min Longitude: {min_long}')

#upload_and_receive_data()