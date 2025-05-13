
import requests

url = "http://127.0.0.1:5001/api/predict_churn"

payload = {
    "gender": 1,
    "tenure_months": 12,
    "monthly_charges": 65.5,
    "total_charges": 700,
    "contract_type": 0,
    "payment_method": 0,
    "risk_level": 2,
    "complaints": 3
}

response = requests.post(url, json=payload)

print("Status Code:", response.status_code)

try:
    print("Response:", response.json())
except Exception as e:
    print("❌ Failed to parse JSON:", response.text)
