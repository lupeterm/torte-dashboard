from flask import Flask, send_from_directory
import random

app = Flask(__name__)

# Path for our main Svelte page
@app.route("/")
def base():
    return send_from_directory('frontend/public', 'index.html')

@app.route("/<path:path>")
def home(path):
    return send_from_directory('frontend/public', path)


@app.route("/rand")
def hello():
    return str(random.randint(0, 100))

@app.route('/graph')
def graph():
    return send_from_directory('frontend/public', 'plotly_graph.html')
    # return 'frontend/public/plotly_graph.html'

if __name__ == "__main__":
    app.run(debug=True)
