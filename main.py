from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')        

@app.route('/getParam', methods = ['GET'])
def getParam():
    #print(request.args)
    return f"It works {request.args.get('vards')}"

@app.route('/postMsg', methods = ['POST'])
def postMsg():
    dati = request.json

    return f"This is postMsg! {dati['vards']}"

@app.route('/info', methods = ['GET', 'POST'])
def info():
    if request.method == 'GET':
        if request.args.get('vards'):
            return f"Hello, {request.args.get('vards')}!"
        else:
            return "Hello, stranger!"
    elif request.method == "POST":
        if request.content_type == 'application/json':
            dati = request.json
            return dati
        else:
            return f"Wrong content type {request.content_type}"
    else:
        return "This unknow method!"



app.run(host="0.0.0.0", port=80, debug=True)