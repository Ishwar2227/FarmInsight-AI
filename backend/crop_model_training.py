import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib
import os

# Load dataset
file_path = os.path.join(os.path.dirname(__file__), "crop_recommendation.csv")
df = pd.read_csv(file_path)

# Split features and target
X = df.drop('label', axis=1)
y = df['label']

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Model
model = RandomForestClassifier(n_estimators=120, random_state=42)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy:.2%}")

# Save model
output_path = os.path.join(os.path.dirname(__file__), "crop_model.pkl")
joblib.dump(model, output_path)

print(f"Model saved as {output_path}")
