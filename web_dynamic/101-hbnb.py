#!/usr/bin/python3
"""Starts a Flask web application for task 6"""

from flask import Flask, render_template
import uuid


app = Flask(__name__)


@app.route('/101-hbnb/')
def display_hbnb():
    """Displays the 101-hbnb page"""
    cache_id = str(uuid.uuid4())
    return render_template('101-hbnb.html', cache_id=cache_id)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
