from flask import Blueprint, request, jsonify
from flask_cors import CORS
import re
import torch
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from transformers import BertTokenizer, BertForSequenceClassification
import nltk

# Define Blueprint instead of Flask app
sentiment_bp = Blueprint('sentiment', __name__)
CORS(sentiment_bp)

nltk.download('punkt_tab')
nltk.download('stopwords')

tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=3)

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'http\S+|@\w+|#\w+', '', text)
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    tokens = word_tokenize(text)
    stop_words = set(stopwords.words('english'))
    tokens = [word for word in tokens if word not in stop_words]
    return ' '.join(tokens)

def encode_tweet(tweet, max_length=128):
    inputs = tokenizer(tweet, return_tensors="pt", truncation=True, padding=True, max_length=max_length)
    return inputs

def predict_sentiment(tweet):
    inputs = encode_tweet(tweet)
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        prediction = torch.argmax(logits, dim=1).item()
    sentiment_map = {0: "Negative", 1: "Neutral", 2: "Positive"}
    return sentiment_map[prediction]

@sentiment_bp.route('/analyze', methods=['POST'])
def analyze_tweet():
    data = request.get_json()
    tweet = data.get('tweet', '')
    if not tweet:
        return jsonify({'error': 'No tweet provided'}), 400
    cleaned_tweet = preprocess_text(tweet)
    sentiment = predict_sentiment(cleaned_tweet)
    response = {
        'original_tweet': tweet,
        'cleaned_tweet': cleaned_tweet,
        'sentiment': sentiment
    }
    return jsonify(response)

@sentiment_bp.route('/')
def home():
    return "Flask Sentiment Analysis API is running!"