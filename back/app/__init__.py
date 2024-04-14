from flask import Flask
from .routes import bp  # Asegúrate de importar el Blueprint 'bp' que definiste en routes.py.

def create_app():
    app = Flask(__name__)
    app.register_blueprint(bp)  # Registra el Blueprint.
    return app