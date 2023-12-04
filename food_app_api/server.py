from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from module.pred import predict, remove_img
import os

app = Flask(__name__)
cors = CORS(app,origins="*")
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['UPLOAD_FOLDER'] = 'local'

@app.route('/', methods=['POST'])
@cross_origin()
def serve():
    print(request)
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filename)
        try:
            prediction = predict(filename)
            remove_img(filename)
            return jsonify({'prediction': prediction})
        except:
            return jsonify({'error': 'Oops Some Error Occured'}), 400
    return jsonify({'error': 'Oops Some Error Occured'}), 400

if __name__ == "__main__":
   app.run()