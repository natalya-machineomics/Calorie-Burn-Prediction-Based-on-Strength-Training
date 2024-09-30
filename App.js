import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [exerciseType, setExerciseType] = useState('');
  const [duration, setDuration] = useState('');
  const [intensity, setIntensity] = useState('');
  const [weight, setWeight] = useState('');
  const [calories, setCalories] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Send the data to the backend for prediction
    const data = {
      exercise_type: exerciseType,
      duration: parseInt(duration),
      intensity: intensity,
      weight: parseInt(weight),
    };
    
    try {
      const response = await axios.post('http://localhost:5000/predict_calories', data);
      setCalories(response.data.calories_burned);
    } catch (error) {
      console.error('Error predicting calories:', error);
    }
  };

  return (
    <div>
      <h1>Calorie Burn Prediction</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Exercise Type:</label>
          <select value={exerciseType} onChange={(e) => setExerciseType(e.target.value)}>
            <option value="">Select</option>
            <option value="squat">Squat</option>
            <option value="bench_press">Bench Press</option>
            <option value="deadlift">Deadlift</option>
            <option value="push_up">Push Up</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Duration (minutes):</label>
          <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>
        <div>
          <label>Intensity:</label>
          <select value={intensity} onChange={(e) => setIntensity(e.target.value)}>
            <option value="">Select</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label>Weight (kg):</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
        <button type="submit">Predict Calories</button>
      </form>
      
      {calories !== null && <h2>Calories Burned: {calories}</h2>}
    </div>
  );
}

export default App;
