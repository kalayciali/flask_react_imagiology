import os
import uuid

from flask import (
    request,
    g,
    jsonify,
    current_app,
    send_from_directory,
)
from flask_restful import Resource
from werkzeug.utils import secure_filename
from sqlalchemy.exc import IntegrityError

from app import db
from app.utils import (
    requires_auth,
    validate_image,
)
from app.models import (
    User,
    Image,
)

BASEDIR = os.path.abspath(os.path.dirname(__file__))

class ImagesApi(Resource):
    @requires_auth
    def get(self):
        g.current_user
        # get whole images of user
        send_from_directory(current_app.config["UPLOAD_PATH"], filename)

    @requires_auth
    def post(self):
        # not sure about it
        # it could be posted as list
        incoming_file = request.files['file']
        internal_fname = str(uuid.uuid4())
        fname= secure_filename(incoming_file.filename)
        if fname == "":
            fname = "name_couldnt_detected"

        file_ext = os.path.splitext(fname)[1]
        if file_ext not in current_app.config['UPLOAD_EXTENSIONS'] or \
                file_ext != validate_image(incoming_file.stream):
            abort(400)

        # user maybe needs to be queried
        user = g.current_user
        image = Image(internal_fname=internal_fname,
                      owner=user, fname=fname)
        try:
            db.session.add(image)
            db.session.commit()
        except IntegrityError:
            return jsonify(message="User with that email already exist"), 409
        filepath = os.path.join(basedir, current_app.config["UPLOAD_PATH"] + fname)
        incoming_file.save(filepath)

class ImageApi(Resource):

    @requires_auth
    def put(self, id):

    @requires_auth
    def put(self, id):

    @requires_auth
    def delete(self, id):



