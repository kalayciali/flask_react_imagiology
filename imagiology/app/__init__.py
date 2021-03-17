from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api
from app.routes import initialize_routes

db = SQLAlchemy()
migrate = Migrate()
api = Api()


def create_app(config_class=Config):

    app = Flask(__name__)
    app.config.from_object(config_class)

    api.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)

    initialize_routes(api)

    from app.errors import bp as errors_bp
    app.register_blueprint(errors_bp)

    from app.auth import bp as auth_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')

    from app.main import bp as main_bp
    app.register_blueprint(main_bp)

    # handling logs
    if not app.debug and not app.testing:

        if not os.path.exists('logs'):
            os.mkdir('logs')

        file_handler = RotatingFileHandler('logs/imagiology.log',
                                               maxBytes=10240, backupCount=10)

        file_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s '
            '[in %(pathname)s:%(lineno)d]'))
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)

        app.logger.setLevel(logging.INFO)
        app.logger.info('Imagiology')

    return app

from app import models
