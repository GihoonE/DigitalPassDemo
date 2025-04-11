from app import app
from flask import render_template
import pymysql


db = pymysql.connect(
    host='127.0.0.1',  # MySQL 서버 주소
    user='root',      # MySQL 사용자 이름
    password='kihun87522099@',  # MySQL 비밀번호
    db='DigitalPass',        # 사용할 데이터베이스 이름
    charset='utf8'    # 인코딩 설정
)

cursor = db.cursor()
# sql = "Select * from Auth"
    # cursor.execute(sql)
    # result = cursor.fetchall()
    # print(result)

@app.route('/')
def index():
    return render_template('Login.html')

@app.route('/admin')
def admin_index():
    return render_template('Admin.html')

@app.route('/admin/scan')
def admin_scan():
    return render_template('Scan1.html')

@app.route('/admin/m_record')
def admin_m_record():
    return render_template("AdminMilitary.html")

@app.route('/m_profile')
def military_profile():
    return render_template("MilitaryProfile.html")

@app.route('/rv_profile')
def regular_visitor_profile():
    return render_template("RegularVisitor.html")

@app.route('/ev_profile')
def ex_visitor_profile():
    return render_template("ExVisitor.html")

@app.route('/ev_profile/scanned')
def ex_visitor_scanned():
    return render_template("ScannedExVisitor.html")
