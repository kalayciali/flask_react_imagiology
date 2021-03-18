from flask import (
    request,
    jsonify,
)
from app import db
from app.errors import bp
from werkzeug.http import HTTP_STATUS_CODES

MESSAGE_401 = "auth required to access this resource"
MESSAGE_404 = "not found"
MESSAGE_500 = "internal_error"
MESSAGE_413 = "file too large"
MESSAGE_400 = "invalid image"
MESSAGE_409 = "already exist"

def error_response(http_code, message=None):
    payload = {'error': HTTP_STATUS_CODES.get(http_code, 'Unknown error')}
    if message:
        payload['message'] = message
    response = jsonify(payload)
    response.status_code = http_code
    return response

@bp.app_errorhandler(404)
def not_found_error(error):
    return error_response(404, MESSAGE_404)

@bp.app_errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return error_response(500, MESSAGE_500)

@bp.app_errorhandler(413)
def file_too_large(e):
    return error_response(413, MESSAGE_413)

@bp.app_errorhandler(401)
def auth_required(e):
    return error_response(401, MESSAGE_400)

@bp.app_errorhandler(400)
def invalid_image(e):
    return error_response(400, MESSAGE_400)

@bp.app_errorhandler(409)
def already_exist(e):
    return error_response(409, MESSAGE_409)
