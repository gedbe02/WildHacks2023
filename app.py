from flask import Flask
from flask import render_template
from user import USER

# initializes flask app:
app = Flask(__name__)

current_user = USER("Ben", "Geduld", "bengeduld@gmail.com")
@app.route('/')
def mainPage():
    return render_template(
        'main.html',
        user=current_user
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