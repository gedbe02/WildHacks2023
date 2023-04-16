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
    # cursor.execute('INSERT INTO comments (comment, postid, userid) VALUES (?, ?, ?)',
    #                (data['message']), ?, 3)
    # conn.commit()

    # # Close the database connection
    # conn.close()

    # Return a success message
    return jsonify({'message': data['message'] + " " + data['postId']})


world = "World"
@app.route('/test')
def test():
    return 'Hello ' + world + '!'


@app.route('/search/<search_term>')
@app.route('/search')
def search(search_term=''):
    #pprint(restaurants[0]) # for debugging
    return "To Do: Search Term: " + search_term