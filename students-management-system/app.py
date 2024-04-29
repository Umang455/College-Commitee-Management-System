from flask import request,Flask,render_template,redirect,Response,jsonify, send_from_directory
from flask_pymongo import PyMongo, ObjectId
import pymongo
from bson.json_util import dumps
import re
from flask_cors import CORS
from flask_bcrypt import Bcrypt, check_password_hash
from flask_mail import Mail, Message
# from flask_uploads import UploadSet, configure_uploads, IMAGES
from werkzeug.utils import secure_filename
import os



bcrypt = Bcrypt()


app = Flask(__name__)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'umang.duss@gmail.com'
app.config['MAIL_PASSWORD'] = 'ckfreqcziopbjltc'

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Allowed file extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



mail = Mail(app)
CORS(app)
# MONGODB_ATLAS_CONN_STRING = "mongodb+srv://iotuser:A7GWhQ3JBYExS8ok@iotdb.e5gtqlx.mongodb.net/studentsdb?retryWrites=true&w=majority"
LOCAL_MONGODB_CONN = "mongodb+srv://umangsomani7:umangvs@clms.nvkb0oe.mongodb.net/clms"
app.config["MONGO_URI"] = LOCAL_MONGODB_CONN
mongo = PyMongo(app)

@app.route("/")
def home():
    students = list(mongo.db.students.find({}).sort("last_name", pymongo.ASCENDING))
    # Convert ObjectId to string representation
    for student in students:
        student['_id'] = str(student['_id'])
    
    # Return the list of students as JSON data
    return jsonify(students)

@app.route('/upload', methods=['POST'])
def upload_file():
    # Check if the post request has the file part
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    # If the user does not select a file, the browser submits an empty file without a filename
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        # Secure filename to prevent malicious uploads
        filename = secure_filename(file.filename)
        # Save the file to the upload directory
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return jsonify({'message': 'File uploaded successfully', 'filename': filename}), 201
    else:
        return jsonify({'error': 'File type not allowed'}), 400

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory('uploads', filename)

@app.route('/commitee', methods=['GET','POST', "PATCH"])
def add_commitee():
    if request.method == "GET":
        status = request.args.get("status")
        print(status, "my request")
        commitees = list(mongo.db.commitees.find({'status':status}))
    #
   
    #  Convert ObjectId to string representation
        for commitee in commitees:
            commitee['_id'] = str(commitee['_id'])
    
    # Return the list of students as JSON data
        return jsonify(commitees)

    elif request.method == "POST":
        # print("proper hit")
        data =request.json
        
        print(data)

        mongo.db.commitees.insert_one(data  )
        return "Hey"
    
    elif request.method == 'PATCH':
        data = request.json  
        committee_id_str = data.get("id")
        status = data.get("status")

        try:
            committee_id = ObjectId(committee_id_str)
        except Exception as e:
            return "Invalid committee ID", 400
        
        
        committee = mongo.db.commitees.find_one({'_id': committee_id    })
        print(committee , "My commitee")
        if committee:
            print("commitee found")
        # Update the status of the committee
            mongo.db.commitees.update_one({'_id': committee_id}, {'$set': {'status': status}})
            return "Committee Patched Successfully"
        return "Found"
    else:
        return "null request"  


@app.route('/commiteeUpdate', methods=['GET','POST', "PATCH"])
def commiteeUpdates():
    if request.method == "GET":
        status = request.args.get("status")
        print(status, "my request")
        commitees = list(mongo.db.commiteeUpdates.find({'status':status}))
    #
   
    #  Convert ObjectId to string representation
        for commitee in commitees:
            commitee['_id'] = str(commitee['_id'])
    
    # Return the list of students as JSON data
        return jsonify(commitees)

    elif request.method == "POST":
        # print("proper hit")
        data =request.json
        
        print(data)

        mongo.db.commiteeUpdates.insert_one(data  )
        return "Hey"
    
    # elif request.method == 'PATCH':
    #     data = request.json  
    #     committee_id_str = data.get("id")
    #     status = data.get("status")

    #     try:
    #         committee_id = ObjectId(committee_id_str)
    #     except Exception as e:
    #         return "Invalid committee ID", 400
        
        
    #     committee = mongo.db.commitees.find_one({'_id': committee_id    })
    #     print(committee , "My commitee")
    #     if committee:
    #         print("commitee found")
    #     # Update the status of the committee
    #         mongo.db.commitees.update_one({'_id': committee_id}, {'$set': {'status': status}})
    #         return "Committee Patched Successfully"
    #     return "Found"
    else:
        return "null request"  
                

@app.route('/register', methods=['GET','POST', "PATCH"])
def register():
    if request.method == "GET":
        status = request.args.get("status")
        print(status, "my request")
        commitees = list(mongo.db.commitees.find({'status':status}))
    #
   
    #  Convert ObjectId to string representation
        for commitee in commitees:
            commitee['_id'] = str(commitee['_id'])
    
    # Return the list of students as JSON data
        return jsonify(commitees)

    elif request.method == "POST":
        # print("proper hit")
        data =request.json
        
        print(data)

        mongo.db.commitees.insert_one(data  )
        return "Hey"
    
    elif request.method == 'PATCH':
        data = request.json  
        committee_id_str = data.get("id")
        student_id_str = data.get("studentId")
        status = data.get("status")

        try:
            committee_id = ObjectId(committee_id_str)
            student_id = ObjectId(student_id_str)
        except Exception as e:
            return "Invalid committee ID", 400
        
        
        committee = mongo.db.commitees.find_one({'_id': committee_id    })
        student = mongo.db.students.find_one({'_id': student_id    })
        # print(committee , "My commitee")
        # print(student, "My student")
        if committee and student:
            if student_id_str not in committee.get('registeredStudents', []):
                mongo.db.commitees.update_one({'_id': committee_id}, {'$push': {'registeredStudents': student_id_str}})
            else:
                return jsonify({'error': 'Already Registered'}), 405
        # Check if the committee ID is not already in the registeredCommitees array
            if committee_id_str not in student.get('registeredCommitees', []):
                mongo.db.students.update_one({'_id': student_id}, {'$push': {'registeredCommitees': committee_id_str}})

            return "Committee Patched Successfully"
        elif not committee:
            return "Committee not found", 404
        else:
            return "Student not found", 404
        return "hey"
        # if committee:
        #     print("commitee found")
        # # Update the status of the committee
        #     mongo.db.commitees.update_one({'_id': committee_id}, {'$set': {'status': status}})
        #     return "Committee Patched Successfully"
        # return "Found"
    else:
        return "null request"  
        




@app.route('/student', methods=['GET','POST'])
def student():
    if request.method == "GET":
        students = list(mongo.db.students.find({}))
    # Convert ObjectId to string representation
        for student in students:
            student['_id'] = str(student['_id'])
    
    # Return the list of students as JSON data
        return jsonify(students)

    elif request.method == "POST":
        # print("proper hit")
        data =request.json
        password = data.get('password')
        email = data.get('email')
        name = data.get("name")
        data["role"] = "student"
        content = "You are registered for the college commitee management system"
        # Hash the password
        print(data)
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        data["password"] = hashed_password
        mongo.db.students.insert_one(data)
        msg = Message('Welcome to college commitee management system',
                  sender='umang.duss@gmail.com',
                  recipients=[email])
        msg.body = f"Hello {name},\n\n{content}"
        mail.send(msg)
        return "Hey"

@app.route('/faculty', methods=['GET','POST'])
def faculty ():
    if request.method == "GET":
        faculties = list(mongo.db.faculties.find({}))
    # Convert ObjectId to string representation
        for faculty in faculties:
            faculty['_id'] = str(faculty['_id'])
    
    # Return the list of students as JSON data
        return jsonify(faculties)

    elif request.method == "POST":
        # print("proper hit")
        data =request.json
        password = '111111' 
        email = data.get('email')
        name = data.get("name")
        data["role"] = "faculty"
        content = "You are   registered as faculty for the college commitee management system"
        # Hash the password
        print(data)
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        data["password"] = hashed_password
        mongo.db.faculties.insert_one(data)
        msg = Message('Welcome to college commitee management system',
                  sender='umang.duss@gmail.com',
                  recipients=[email])
        msg.body = f"Hello {name},\n\n{content}"
        mail.send(msg)
        return "Hey"

        
@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        print("HIT HUA")
        # Assuming you receive username and password in JSON format
        login_data = request.json
        email = login_data.get('email')
        password = login_data.get('password')
        student = mongo.db.students.find_one({'email': email})
        print(student , "My student in db")
        if student:
            std_pass = student.get('password')
            if check_password_hash(std_pass, password):
                # If passwords match, convert ObjectId to string representation and return the student data
                student['_id'] = str(student['_id'])
                return jsonify(student)
            else:
                # If passwords don't match, return an error
                return jsonify({'error': 'Invalid email or password'}), 401
        else:
            # If the email is not found, return an error
            return jsonify({'error': 'User not found'}), 404

    else:
        return jsonify({'error': 'Method Not    Allowed'}), 405
    



@app.route('/edit-student', methods=['GET','POST'])
def edit_student():
    if request.method == "GET":
        student_id = request.args.get('_id')
        student = dict(mongo.db.students.find_one({"_id":ObjectId(student_id)}))

        return render_template('pages/manage-student.html',student=student, 
                               page_title="Edit Student", page_url="edit-student")
    
    elif request.method == "POST":
        _id = request.form['_id']
        student_id = request.form['student_id']
        first_name = request.form['first_name']
        middle_name = request.form['middle_name']
        last_name = request.form['last_name']

        mongo.db.students.update_one({"_id":ObjectId(_id)},{"$set":{"student_id":student_id,"first_name":first_name
                                                                    ,"middle_name":middle_name,"last_name":last_name }})
        return redirect("/")
    
@app.route('/delete-student', methods=['GET','POST'])
def delete_student():
    if request.method == "GET":
        student_id = request.args.get('_id')
        student = dict(mongo.db.students.find_one({"_id":ObjectId(student_id)}))

        return render_template('pages/manage-student.html',student=student, 
                               page_title="Delete Student", page_url="delete-student", delete="true")
    
    elif request.method == "POST":
        _id = request.form['_id']

        mongo.db.students.delete_one({ "_id": ObjectId(_id)})
        return redirect("/")
    
@app.route('/add-student', methods=['GET','POST'])
def add_student():
    if request.method == "GET":

        return render_template('pages/manage-student.html',
                               page_title="Add Student", page_url="add-student")
    
    elif request.method == "POST":
        student_id = request.form['student_id']
        first_name = request.form['first_name']
        middle_name = request.form['middle_name']
        last_name = request.form['last_name']

        mongo.db.students.insert_one({"student_id":student_id,
                                      "first_name":first_name,
                                      "middle_name":middle_name,
                                      "last_name":last_name })
        return redirect("/")
    
@app.route('/search-student', methods=['POST'])
def search_student():

    student_id = request.form['student_id']
    last_name = request.form['last_name']

    student_id_regx = re.compile(student_id, re.IGNORECASE)
    last_name_regx = re.compile(last_name, re.IGNORECASE)

    students = list(mongo.db.students.
                    find({"$and":[ {"student_id":student_id_regx}, 
                                  {"last_name":last_name_regx}]}))

    return render_template("/pages/home.html", students=students)