# Sentiment-AI

A full-stack application for fetching Twitter posts, analyzing their sentiment using AI, and saving the results to a MongoDB database. Built with React (frontend), Node.js/Express (backend), and Python/Flask (sentiment analysis).

## Project Structure
- **`sentiment-frontend`**: React frontend for user interface.
- **`sentiment-backend`**: Node.js/Express backend for API and MongoDB integration.
- **`sentiment-analysis`**: Python/Flask service for tweet fetching and sentiment analysis.

## Prerequisites
Before setting up the project, ensure you have the following installed:
- **Node.js** (v16+): [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Python** (v3.8+): [Download](https://www.python.org/)
- **MongoDB** (v4.4+): [Download](https://www.mongodb.com/try/download/community)
- **Git**: [Download](https://git-scm.com/)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Codewithdarks/sentiment-ai.git
cd sentiment-ai

# SETUP.txt - Simple Instructions for Sentiment-AI Project Setup


# Step 2: Set Up MongoDB

# Start MongoDB to store tweets.

1. Run this in a terminal:
   mongod

   # Keeps MongoDB running on localhost:27017.


2. No need to create a database yet.

   # It auto-creates `sentiment-ai` when you save data.


# Step 3: Set Up Backend (`sentiment-backend`)

# Set up the Node.js server.

1. Go to backend folder:
   cd sentiment-backend


2. Install packages:
   npm install

   # Gets express, mongoose, and more.


3. Make a `.env` file:
   echo JWT_SECRET=mysecret123 > .env
   echo PORT=5050 >> .env

   # Use your own secret instead of mysecret123.


4. Start the server:
   npm start

   # Look for "MongoDB connected" and "port 5050" in terminal.


# Step 4: Set Up Sentiment Analysis (`sentiment-analysis`)

# Set up the Python service.

1. Go to this folder:
   cd sentiment-analysis


2. Make a virtual environment:
   # Windows:
   python -m venv venv

# To activate venv we need to give permission to terminall to run system program
   set-executionpolicy unresticted -scope process
# now activate virtual environment
   .\venv\Scripts\activate

   # Linux/Mac:
   python3 -m venv venv
   source venv/bin/activate


3. Install Python packages:
   pip install -r requirements.txt

# now we need to install tweepy all pre versions to project smoothly if you intract with any kind of error
   pip install --pre tweepy

   # Needs flask, flask-cors, torch, transformers, pandas, scikit-learn, --pre tweepy, nltk


4. Add Twitter API key:
   # Edit `twitter.py` and add:
   TWITTER_BEARER_TOKEN = "your-token-here"

   # Get this from Twitter Developer Portal.


5. Run the Flask app:
   python runserver.py

   # Runs on http://localhost:5001.


# Step 5: Set Up Frontend (`sentiment-frontend`)

# Set up the React app.

1. Go to frontend folder:
   cd sentiment-frontend


2. Install packages:
   npm install

   # Gets react, axios, and routing stuff.


3. Start the app:
   npm start

   # Opens http://localhost:3000 in browser.


# Step 6: Environment Variables

# Files you need to set up.

- Backend `.env`:
  JWT_SECRET=mysecret123
  PORT=5050

  # Change mysecret123 to something secure.


- Twitter token in `sentiment-analysis/twitter.py`:
  TWITTER_BEARER_TOKEN = "your-token-here"


# Running the Project

# How to get it all working.

1. Keep MongoDB running:
   mongod


2. Start backend:
   npm start  # In sentiment-backend/


3. Start Python service:
   python runserver.py  # In sentiment-analysis/


4. Start frontend:
   npm start  # In sentiment-frontend/


5. Open browser:
   http://localhost:3000

   # Log in, fetch tweets, analyze, save them.


# Features

# What this app does.

- Get tweets from Twitter.

- Check their sentiment with AI.

- Save results to MongoDB.


# Troubleshooting

# Fixes for common problems.

- MongoDB not working?
  # Make sure `mongod` is running.


- Seeing 500 errors?
  # Check backend terminal for clues.


- Twitter not fetching?
  # Verify your Twitter token is correct.


# Contributing

# How to help out.

1. Fork this on GitHub.

2. Make a branch:
   git checkout -b my-feature


3. Save your work:
   git commit -m "Added something"


4. Push it:
   git push origin my-feature


5. Make a Pull Request on GitHub.


# License

# Legal stuff.

MIT License - check [LICENSE] file.
