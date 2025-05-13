import numpy as np
print(np.__version__)

import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib
import os

# Use your actual data path
data_path = "C:/Users/Snehansu.Ghosh.SGL/Desktop/roberta-qa/MVPs/churn-dashboard/data/churn_data.csv"

# Load data
data = pd.read_csv(data_path)

# Define input features and target
features = ['gender', 'tenure_months', 'monthly_charges', 'total_charges',
            'contract_type', 'payment_method', 'risk_level', 'complaints']
target = 'churned'

X = data[features]
y = data[target]

# Encode categorical features
categorical_cols = ['gender', 'contract_type', 'payment_method', 'risk_level']
label_encoders = {}

for col in categorical_cols:
    le = LabelEncoder()
    X[col] = le.fit_transform(X[col].astype(str))
    label_encoders[col] = le

# Train model
model = RandomForestClassifier(random_state=42)
model.fit(X, y)

# Save model and encoders
os.makedirs("model", exist_ok=True)
joblib.dump(model, "model/churn_model.pkl")
joblib.dump(label_encoders, "model/label_encoders.pkl")

print("✅ Model and encoders saved in /model/")

import joblib
model = joblib.load("model/churn_model.pkl")
print(type(model))  # Should be <class 'sklearn.ensemble.RandomForestClassifier'>
print(model.get_params())  # Confirm it's a real model object

enc = joblib.load("model/label_encoders.pkl")
print(type(enc))     # Should be <class 'dict'>
print(enc.keys())    # Should show encoded columns
