from flask import Blueprint, request, jsonify
from flask_cors import CORS
import tweepy
import logging
import time
from app import preprocess_text, predict_sentiment  # Import sentiment functions

tweetanalysis_bp = Blueprint('tweetanalysis', __name__)
CORS(tweetanalysis_bp)

# Logging setup
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Twitter API credentials
TWITTER_BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAGGjowEAAAAAHW8tRXE%2BRI2%2BQ5QbKcXVKZO0cNs%3DvYZQ7CBb2f1RlLJZ39ifwWdTbToMNks0qoEA2OEh0jkCQsCc71"

class TweetAnalyzer:
    def __init__(self, bearer_token):
        self.client = tweepy.Client(bearer_token=bearer_token)
        self.last_request_time = 0
        self.RATE_LIMIT_WAIT = 900  # 15 minutes in seconds

    def can_make_request(self):
        current_time = time.time()
        time_since_last_request = current_time - self.last_request_time
        return time_since_last_request >= self.RATE_LIMIT_WAIT

    def analyze_tweets(self, username, count=5):
        if not self.can_make_request():
            wait_time = int(self.RATE_LIMIT_WAIT - (time.time() - self.last_request_time))
            return {"error": f"Rate limited. Please wait {wait_time} seconds before trying again."}, 429

        try:
            user_response = self.client.get_user(username=username)
            if not user_response.data:
                return {"error": f"Twitter user @{username} not found."}, 404

            user_id = user_response.data.id
            count = max(5, min(int(count), 100))
            tweets_response = self.client.get_users_tweets(
                id=user_id,
                max_results=count
            )

            if not tweets_response.data:
                return {"tweets": [f"No recent tweets found for @{username}"]}, 200

            self.last_request_time = time.time()
            # Analyze each tweet's sentiment
            tweets = [
                {
                    "text": tweet.text,
                    "created_at": tweet.created_at.isoformat() if tweet.created_at else "Unknown",
                    "sentiment": predict_sentiment(preprocess_text(tweet.text))
                }
                for tweet in tweets_response.data
            ]
            return {
                "username": username,
                "name": user_response.data.name,
                "tweets": tweets
            }, 200

        except tweepy.TooManyRequests:
            logger.warning("Too Many Requests (429). Wait 15 minutes.")
            self.last_request_time = time.time()
            return {"error": "Too Many Requests (429). Wait 15 minutes."}, 429
        except Exception as e:
            logger.error(f"Error analyzing tweets: {e}")
            return {"error": f"Error analyzing tweets: {str(e)}"}, 500

tweet_analyzer = TweetAnalyzer(TWITTER_BEARER_TOKEN)

@tweetanalysis_bp.route('/<username>', methods=['GET'])
def analyze_user_tweets(username):
    count = request.args.get('count', default=5, type=int)
    result, status_code = tweet_analyzer.analyze_tweets(username, count)
    return jsonify(result), status_code