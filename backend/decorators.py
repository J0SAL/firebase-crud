from functools import wraps
from flask import request, abort
from firebase_admin import auth
import jwt
import os

key = os.getenv("JWT_SECRET_KEY")


def verify_oauth_token(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if request.method == 'OPTIONS':
            return f(*args, **kwargs)
        
        try:
            id_token = request.headers.get("X-Firebase-AppCheck")
            decoded_token = auth.verify_id_token(id_token)
            user = {}
            user['email'] = decoded_token['email']
            
            return f(*args, **kwargs, user=user)
        except Exception as e:
            print(f"Error: {str(e)}")
            return {"error": str(e)}, 401
    
    return decorated_function


def verify_jwt_token(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if request.method == 'OPTIONS':
            return f(*args, **kwargs)
        try:
            token = request.headers['Authorization'].split(" ")[1]
            
            data = jwt.decode(token, key, algorithms=["HS256"])
            user = {}
            user['email'] = data['user_email']

            return f(*args, **kwargs, user=user)
        except Exception as e:
            print(f"Error: {str(e)}")
            return {"error":str(e)}, 401
    return decorated_function