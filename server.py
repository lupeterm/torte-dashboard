from flask import Flask, send_from_directory, request
import random

app = Flask(__name__)
FIGURE_FOLDER = "frontend/public/figures"
TMP_MAPPING = {
    "Linux-Sloc": "sloc.html",
    "Jaccard-Features": "features-jaccard.html",
    "Configuration-Similarity": "configuration-similarity.html",
    "Total-Features": "total-features.html",
}

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
    print(request.args)
    req = request.args["graph"]
    file = TMP_MAPPING[req]
    return send_from_directory(FIGURE_FOLDER, file)
    # return 'frontend/public/plotly_graph.html'

if __name__ == "__main__":
    app.run(debug=True)
