from flask import Flask

app = Flask(__name__)

from app import routes  # routes.py에서 라우트를 가져옵니다.
