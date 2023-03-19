import random
from flask import Flask, render_template

app = Flask(__name__,
static_url_path='/static')

thing_to_build = [ 
  "Create an api",
  "Build a website",
  "Write a web_app",
  "Create a service",
  "Write a library",
  "Output something to the cli",
  "Do something with sms",
  "Do something with email",
]

theme_to_build = [
  "movies",
  "books",
  "Paul Craig",
  "music",
  "food",
  "games",
  "AI",
  "hackathons",
  "goats",
  "holidays",
]

cds_thing_to_use = [ 
  "forms",
  "notify",
  "the design system"
]



def get_random_combinations():
  return f"""{random.choice(thing_to_build)}
Theme: {random.choice(theme_to_build)}
Must use: {random.choice(cds_thing_to_use)}
"""


@app.route("/", methods=['GET'])
def index():
    print("Rendering index")
    return render_template('index.html')