from os import getenv
from .app import app


def run():
    if getenv('PYTHON_ENV') == 'production':
        import bjoern
        bjoern.run(app, '0.0.0.0', 29500)
    else:
        app.run('0.0.0.0')
