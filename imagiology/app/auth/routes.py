from flask import (
    request,
    jsonify,
    url_for,
    redirect,
    g,
    make_response,
    current_app,
)
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from app.utils import (
    generate_token,
    requires_auth,
    verify_token,
)
import datetime

from app import db
from app.models import User
from app.auth import bp

@bp.route('/create_user', methods=["POST"])
def create_user():
    body = request.get_json()
    user = User(
        email=body["email"],
        password=body["password"],
    )

    db.session.add(user)
    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="User with that email already exist"), 409

    new_user = User.query.filter_by(email=body["email"]).first()
    return jsonify(
        id=new_user.id,
        token=generate_token(new_user),
    )

@bp.route("/user", methods=["GET"])
@requires_auth
def get_user():
    return jsonify(data=g.current_user)

@bp.route("/get_token", methods=["POST"])
def get_token():
    body = request.get_json()
    user = User.get_user_with_email_and_password(body["email"], body["password"])
    if user:
        return jsonify(token=generate_token(user))
    return jsonify(error=True), 403

@bp.route("/is_token_valid", methods=["POST"])
def is_token_valid():
    body = request.get_json()
    is_valid = verify_token(body["token"])

    if is_valid:
        return jsonify(is_token_valid=True)
    else:
        return jsonify(is_token_valid=False), 403



