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
            print(f"Error oauth: {str(e)}")
            return {"error oauth": str(e)}, 401
    
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
        except jwt.ExpiredSignatureError as e:
            print("jwt expired", str(e))
            return {"status": "jwt_expired"}, 402
        except Exception as e:
            print(f"Error jwt: {str(e)}")
            return {"error jwt":str(e)}, 401
    return decorated_function