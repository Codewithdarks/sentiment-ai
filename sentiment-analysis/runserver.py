from flask import Flask
from app import sentiment_bp
from twitter import twitter_bp
from tweetanalysis import tweetanalysis_bp

app = Flask(__name__)
#amit
# Register blueprints
app.register_blueprint(sentiment_bp, url_prefix='/sentiment')
app.register_blueprint(twitter_bp, url_prefix='/twitter')
app.register_blueprint(tweetanalysis_bp, url_prefix='/tweetanalysis')

# Optional root route
@app.route('/')
def home():
    return "Welcome to Sentiment Analysis and Twitter API Server! Use /sentiment/analyze, /twitter/tweets/<username>, or /tweetanalysis/<username>"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)