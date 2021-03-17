from app import db
from werkzeug.security import (
    generate_password_hash,
    check_password_hash,
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    unique_id = db.Column(db.Integer)
    email = db.Column(db.String(120), index=True, unique=True, required=True)
    password = db.Column(db.String(50), index=True, 
                         unique=True, required=True, min_length=6)
    admin = db.Column(db.Boolean)

    def __repr__(self):
        return '<User {}>'.format(self.email)

    def hash_password(self):
        self.password = generate_password_hash(self.password, method='sha256')

    def check_password(self, password):
        return check_password_hash(self.password, password)

