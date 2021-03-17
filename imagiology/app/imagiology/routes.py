import os
from flask import (
    request,
    g,
    jsonify,
    current_app,
)
from flask_restful import Resource
from app import db
from app.utils import (
    requires_auth,
    validate_image,
)
from app.models import (
    User,
    Image,
)
from sqlalchemy.exc import IntegrityError

class ImagesApi(Resource):
    @requires_auth
    def get(self):

    @requires_auth
    def post(self):
        for incoming_file in request.files.getlist('file'):
            incoming_file = request.files['file']
            filename = incoming_file.filename
            if filename != "":
                file_ext = os.path.splitext(filename)[1]
                if file_ext not in current_app.config['UPLOAD_EXTENSIONS'] or \
                        file_ext != validate_image(incoming_file.stream):
                    abort(400)
                basedir = os.path.abspath(os.path.dirname(__file__))
                filepath = os.path.join(basedir, current_app.config["UPLOAD_PATH"] + filename)
                incoming_file.save(filepath)

class ImageApi(Resource):

    @requires_auth
    def put(self, id):

    @requires_auth
    def put(self, id):

    @requires_auth
    def delete(self, id):



