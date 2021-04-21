from app import app
import json
from flask import Flask, render_template, request, url_for
from app.pyScripts import create_image, detect_emotion
import random

@app.route('/', methods=['GET','POST'])
def home():
	do = True
	p = None
	songIndex = {}
	songIndex["Beyonce"] = 0
	songIndex["Dua Lipa"] = 1
	song = "Beyonce"
	thumbnails = ["lemonade.png", "dontstartnow.png"]
	link = "assets/images/" + thumbnails[songIndex[song]]
	#songLink = url_for('static', filename=link)
	songLink = url_for('static', filename='static/assets/images/lemonade.png')
	print(songLink)
	if request.method == "POST":
		x = request.form['data']
		y = json.loads(x)
		print(y[1][1])
		img = create_image(y)
		emotion = detect_emotion(img)
		print(emotion)
		x = ["One", "Two", "Three", "Four"]
		p = random.choice(x)
	return render_template('player.html', param=p, song=song, Index=json.dumps(songIndex[song]), songLink=json.dumps(songLink))

@app.route('/suggest', methods=['GET', 'POST'])
def suggest():
	l = ["Prasurjya", "Kashyap", "Rohit", "Paul"]
	x = random.choice(l)
	return x