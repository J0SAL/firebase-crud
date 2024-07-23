import jwt
import os
from datetime import datetime, timezone, timedelta
from dotenv import load_dotenv

load_dotenv()

key = os.getenv("JWT_SECRET_KEY")

def generate_jwt_token(email, expiry_in_hours):
    payload = {
        'user_email': email,
        'exp': datetime.now(tz=timezone.utc) + timedelta(hours=expiry_in_hours)
    }

    token = jwt.encode(payload, key, algorithm="HS256")
    return token