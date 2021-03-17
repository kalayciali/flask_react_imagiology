
from app.imagiology.routes import (
    ImagesApi,
    ImageApi,
)

def initialize_routes(api):
 api.add_resource(ImagesApi, '/api/images')
 api.add_resource(ImageApi, '/api/images/<id>')
