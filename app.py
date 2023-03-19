import random
from flask import Flask, render_template

app = Flask(__name__,
static_url_path='/static')

@app.route("/", methods=['GET'])
def index():
    print("Rendering index")
    return render_template('index.html')