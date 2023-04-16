from flask import Flask, request, jsonify
import sqlite3
from flask import render_template
from user import USER
import sqlHelpers

# initializes flask app:
app = Flask(__name__)

# Get DB data
sqlHelpers.get_rocks_table()
sqlHelpers.get_posts_table()
sqlHelpers.get_users_table()
sqlHelpers.get_comments_table()
sqlHelpers.get_likes_table()

current_user = USER("Ben", "Jamin", "bengeduld@gmail.com")
@app.route('/')
def mainPage():
    return render_template(
        'index.html',
        user=current_user,
    )

@app.route('/comment', methods=['POST'])
def add_comment():
    # Get the comment data from the request
    data = request.json


    # # Connect to the database
    conn = sqlite3.connect('rocksdb.db')
    cursor = conn.cursor()

    #WE HAVE POSTID NOW

    # # Insert the comment data into the database
    cursor.execute('INSERT INTO comments (comment, postid, userid) VALUES (?, ?, ?)',
                   (data['message'], data['postId'], 3))
    
    conn.commit()

    # # Close the database connection
    conn.close()

    # Return a success message
    return jsonify({'message': data['message'] + " " + data['postId']})

@app.route('/like', methods=['POST'])
def like():
    # Get the comment data from the request
    data = request.json

    # # Connect to the database
    conn = sqlite3.connect('rocksdb.db')
    cursor = conn.cursor()
    #WE HAVE POSTID NOW

    # # Insert the comment data into the database
    cursor.execute('INSERT INTO likes (postid) VALUES (?)',
                     (data['postId'],))
    conn.commit()
    result = conn.execute('select * from likes')


    # # Close the database connection
    conn.close()

    # Return a success message
    return jsonify({'message': "LIKE: " + data['postId']})


@app.route('/dislike', methods=['POST'])
def dislike():
    # Get the comment data from the request
    data = request.json

    # # Connect to the database
    conn = sqlite3.connect('rocksdb.db')
    cursor = conn.cursor()
    #WE HAVE POSTID NOW

    # # Insert the comment data into the database
    cursor.execute("DELETE FROM my_table WHERE id = ?", (data['postId'],))

    conn.commit()

    # # Close the database connection
    conn.close()

    # Return a success message
    return jsonify({'message': "LIKE: " + data['postId']})
