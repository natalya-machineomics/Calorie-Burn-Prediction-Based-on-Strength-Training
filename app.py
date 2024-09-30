from flask import Flask, request, jsonify
import numpy as np
from sklearn.linear_model import LinearRegression
import pickle

app = Flask(__name__)

# Load pre-trained model
with open('calorie_model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/predict_calories', methods=['POST'])
def predict_calories():
    # Get the data from the POST request
    data = request.get_json()
    
    # Extract features from the data (you can add more features based on your dataset)
    exercise_type = data['exercise_type']
    duration = data['duration']  # in minutes
    intensity = data['intensity']  # low, medium, high
    weight = data['weight']  # user's weight in kg

    # Convert categorical data (exercise_type, intensity) into numerical values
    # Example of one-hot encoding or manual mapping
    exercise_type_map = {
        'squat': 0, 'bench_press': 1, 'deadlift': 2, 'push_up': 3, 'other': 4
    }
    intensity_map = {'low': 1, 'medium': 2, 'high': 3}
    
    exercise_type_encoded = exercise_type_map.get(exercise_type, 4)
    intensity_encoded = intensity_map.get(intensity, 1)

    # Create the input array for the model
    input_features = np.array([[exercise_type_encoded, duration, intensity_encoded, weight]])

    # Predict calories burned
    prediction = model.predict(input_features)
    
    # Return the result as a JSON response
    return jsonify({'calories_burned': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)
