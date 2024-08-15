from flask import Flask, request, jsonify
from flask_cors import CORS

from firebase_admin import credentials, firestore, initialize_app, app_check, auth

from decorators import verify_oauth_token, verify_jwt_token
from helpers import generate_jwt_token

app = Flask(__name__)
CORS(app)

cred = credentials.Certificate('key.json')
default_app = initialize_app(cred)
db = firestore.client()


# Schemas
users_ref = db.collection('users')


@app.route('/register', methods=['POST'])
@verify_oauth_token
def register(user):
    try:
        email = user['email']
        user = users_ref.where('email', '==', email).get()
        if user: 
            return {'error': 'user already exist'}, 401
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
        userdata = users_ref.where('email', '==', user['email']).get()
        if not userdata: 
            return {'user': ""}, 201
        print(userdata[0].to_dict())
        return {"user": userdata[0].to_dict()}, 201
    except Exception as e:
        print(f"error {str(e)}")
        return {"error": str(e)}, 500

@app.route('/add-user-info', methods=['POST'])
@verify_jwt_token
def add_user(user):
    try:
        email = user['email']
        jsondata = request.json
        newuser = users_ref.add({
            'email': email,
            'name': jsondata['user_name'],
            'locality': jsondata['locality'],
        })
        return {"user": newuser[1].get().to_dict()}, 200
    except Exception as e:
        print(f"error {str(e)}")
        return {"error": str(e)}, 500

if __name__ == "__main__":
    app.run(debug=True)