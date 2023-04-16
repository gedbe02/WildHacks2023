from flask import Flask
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

current_user = USER("Ben", "Geduld", "bengeduld@gmail.com")
@app.route('/')
def mainPage():
    return render_template(
        'index.html',
        user=current_user,
    )


world = "World"
@app.route('/test')
def test():
    return 'Hello ' + world + '!'


@app.route('/search/<search_term>')
@app.route('/search')
def search(search_term=''):
    #pprint(restaurants[0]) # for debugging
    return "To Do: Search Term: " + search_term