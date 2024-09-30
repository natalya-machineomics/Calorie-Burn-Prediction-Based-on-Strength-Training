import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pickle

# Example dataset (you need a real dataset or API integration here)
data = {
    'exercise_type': [0, 1, 2, 0, 1],  # Squat, Bench Press, Deadlift, etc.
    'duration': [30, 45, 60, 20, 40],  # Minutes
    'intensity': [2, 3, 1, 3, 2],  # Low, Medium, High
    'weight': [70, 85, 78, 60, 90],  # User weight in kg
    'calories_burned': [250, 400, 500, 150, 300]  # Target label
}

# Create a DataFrame
df = pd.DataFrame(data)

# Features and target
X = df[['exercise_type', 'duration', 'intensity', 'weight']]
y = df['calories_burned']

# Split into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Save the model to a file
with open('calorie_model.pkl', 'wb') as f:
    pickle.dump(model, f)

# Test the model (optional)
print(f"Model test score: {model.score(X_test, y_test)}")
