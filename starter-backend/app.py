
from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the model
model = joblib.load('model/dummy_churn_model.pkl')

@app.route('/')
def home():
    return "Hello, Flask is running!"

@app.route('/api/predict_churn', methods=['POST'])
def predict_churn():
    try:
        data = request.get_json()

        # Expect 8 features
        features = [
            data.get('gender', 0),
            data.get('tenure_months', 0),
            data.get('monthly_charges', 0),
            data.get('total_charges', 0),
            data.get('contract_type', 0),
            data.get('payment_method', 0),
            data.get('risk_level', 0),
            data.get('complaints', 0)
        ]

        features = np.array(features).reshape(1, -1)

        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0][1]

        result = {
            'prediction': 'Churn' if prediction == 1 else 'No Churn',
            'probability': round(float(probability), 2)
        }

        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=False)
