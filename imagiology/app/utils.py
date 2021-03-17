from flask import (
    current_app,
    request,
    jsonify,
)
from app.models import User

# decorator to check for authorization
def token_required(func):
    # decorator func wraps func
    @wraps(func)
    def decorator(*args, **kwargs):
        if 'x-access-tokens' in request.headers:
            token = request.headers['x-access-tokens']

        if not token:
            return jsonify({'message': 'a valid token is missing'})

        try:
            data = jwt.decode(token, app.config[SECRET_KEY])
            current_user = User.query.filter_by(unique_id=data['unique_id']).first()
        except:
            return jsonify({'message': 'token is invalid'})

        return func(current_user, *args, **kwargs)
    return decorator



