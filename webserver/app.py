from flask import Flask, render_template
import json

app = Flask(__name__)

alive = 0
data = {}

@app.route("/")
def index():
    return render_template("index.html")



@app.route('/keep_alive')
def keep_alive():
    global alive, data
    alive += 1
    keep_alive_count = str(alive)
    data['keep_alive']= keep_alive_count
    parsed_json = json.dumps(data)
    print(parsed_json)
    return str(parsed_json)


app.run(host="172.20.10.5", port=5000)
