from flask import Flask, 
render_template , Response

app = Flask(__name__)
@app.route("/robots.txt")
def robots():
    return response(
        """user-agent: *
allow: /

sitemap:
https://tanmay-sheth-portfolio.vercel.app/sitemap.xml
""",
        mimetype="text/plan"
    )

@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
