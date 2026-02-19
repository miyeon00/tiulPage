import json
import os
from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route("/")
def index():
    schedule_path = os.path.join(os.path.dirname(__file__), "schedule.json")
    with open(schedule_path, "r", encoding="utf-8") as f:
        schedule = json.load(f)
    return render_template("index.html", schedule=schedule)

@app.route('/sitemap.xml')
def sitemap():
    return send_from_directory('.', 'sitemap.xml')

if __name__ == "__main__":
    app.run(debug=True)