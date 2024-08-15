from flask import Flask, request
from flask_cors import CORS

from firebase_admin import credentials, firestore, initialize_app, app_check, auth

from decorators import verify_oauth_token, verify_jwt_token
from helpers import generate_jwt_token

app = Flask(__name__)
CORS(app)

cred = credentials.Certificate('key.json')
default_app = initialize_app(cred)
db = firestore.client()

# start
mydb = {}
# end 


@app.route('/register', methods=['POST'])
@verify_oauth_token
def register(user):
    try:
        email = user['email']
        mydb[email] = {}
        token = generate_jwt_token(email,24)
        return {"token": token},200
    except Exception as e:
        print(f"error {str(e)}")
        return {"error": str(e)}, 500
    

@app.route('/login', methods=['POST'])
@verify_oauth_token
def login(user):
    try:
        email = user['email']
        token = generate_jwt_token(email,24)
        return {"token": token},200
    except Exception as e:
        print(f"error {str(e)}")
        return {"error": str(e)}, 500

@app.route('/get-user', methods=['GET', 'POST'])
@verify_jwt_token
def get_data(user):
    try:
        return {"user": mydb[user['email']]}
    except Exception as e:
        print(f"error {str(e)}")
        return {"error": str(e)}, 500

@app.route('/add-user-info', methods=['POST'])
@verify_jwt_token
def add_user(user):
    try:
        mydb[user['email']] = request.json['user']
        return {"user": "user set"}
    except Exception as e:
        print(f"error {str(e)}")
        return {"error": str(e)}, 500

if __name__ == "__main__":
    app.run(debug=True)