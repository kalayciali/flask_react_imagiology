from flask import (
    request,
    jsonify,
    make_response,
    current_app,
)
from flask_restful import Resource
import uuid
import jwt
import datetime

from app import db
from app.models import User

class SignupApi(Resource):
    def post(self):
        body = request.get_json()
        user = User(**body, unique_id=str(uuid.uuid4()), admin=False)
        user.hash_password()
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'registered successfully'})

class LoginApi(Resource):
    def post(self):
        auth_error = [
            'could not verify',
            401,
            {'WWW.Authentication': 'Basic realm: "login required"'},
        ],

        auth = request.authorization
        if not(auth and auth.email and auth.password):
            return make_response(*auth_error)

        user = User.query.filter_by(email=body.email).first()

        if user.check_password(auth.password):
            expiry = datetime.datetime.utcnow() + datetime.timedelta(minutes=10)
            token = jwt.encode({'unique_id': user.unique_id, 'exp' : expiry}, 
                               current_app.config['SECRET_KEY'])
            return jsonify({'token' : token.decode('UTF-8')})

        return make_response(*auth_error)



