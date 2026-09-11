from flask import Flask, render_template, send_from_directory

app = Flask(__name__, static_folder="static", template_folder="templates")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/robots.txt")
def robots():
    return send_from_directory(".", "robots.txt", mimetype="text/plain")

@app.route("/sitemap.xml")
def sitemap():
    return send_from_directory(".", "sitemap.xml", mimetype="application/xml")

@app.route("/google6a61e62378e61012.html")
def google_verify():
    return send_from_directory(".", "google6a61e62378e61012.html", mimetype="text/html")

if __name__ == "__main__":
    app.run(debug=True)
