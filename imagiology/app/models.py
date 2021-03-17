from app import db
from werkzeug.security import (
    generate_password_hash,
    check_password_hash,
)

class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))

    def __init__(self, email, password):
        self.email = email
        self.active = True
        self.password = User.hash_password(password)


    @staticmethod
    def hash_password():
        return generate_password_hash(password, method='sha256')

    def check_password(self, password):
        return check_password_hash(self.password, password)

    @staticmethod
    def get_user_with_email_and_password(email, password):
        user = User.query.filter_by(email=email).first()
        if user and User.check_password(user, password):
            return user
        else:
            return None

    def __repr__(self):
        return '<User {}>'.format(self.email)
