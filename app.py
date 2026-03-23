import json
import os
from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def load_data():
    with open(os.path.join(BASE_DIR, 'data.json'), encoding='utf-8') as f:
        return json.load(f)

@app.route('/')
def index():
    data = load_data()
    return render_template('index.html', data=data, schedule=data)

@app.route('/tv')
def tv():
    data = load_data()
    return render_template('tv.html', data=data)

@app.route('/sitemap.xml')
def sitemap():
    return send_from_directory('.', 'sitemap.xml')

@app.route('/robots.txt')
def robots():
    return send_from_directory('.', 'robots.txt')

if __name__ == "__main__":
    app.run(debug=True)