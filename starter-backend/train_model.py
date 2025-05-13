
import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier

# Generate dummy data
X = np.random.rand(500, 8)
y = np.random.randint(0, 2, size=500)

# Train model
model = RandomForestClassifier()
model.fit(X, y)

# Save model
joblib.dump(model, 'model/dummy_churn_model.pkl')

print("✅ Dummy churn model trained and saved at model/dummy_churn_model.pkl")
