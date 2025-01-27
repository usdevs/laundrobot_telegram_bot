from enum import Enum
import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Environment(Enum):
    PROD = 'prod'
    DEV = 'dev'

# Define required environment variables
REQUIRED_ENV_VARS = [
    'TELEGRAM_BOT_TOKEN',
    'API_URL'
]

# Check for missing environment variables
missing_vars = [var for var in REQUIRED_ENV_VARS if not os.getenv(var)]
if missing_vars:
    print(f"Missing required environment variables: {', '.join(missing_vars)}")
    exit(1)

class Config:
    def __init__(self):
        self.bot_token = os.getenv('TELEGRAM_BOT_TOKEN')
        self.api_url = self._validate_api_url(os.getenv('API_URL'))
        self.env = self._validate_environment(os.getenv('ENVIRONMENT') or Environment.PROD.value)

    def _validate_api_url(self, url):
        try:
            response = requests.get(url)
            if response.status_code == 200:
                print("✅ API health check")
                return url
            else:
                raise ConnectionError(f"API health check failed with status code: {response.status_code}")
        except requests.RequestException as e:
            print(f"❌ Failed to connect to API server at {url}: {str(e)}\n\nPlease make sure your API_URL is correct in .env file\n")
            exit(1)
        except Exception as e:
            print(f"❌ Unknown error: {str(e)}")
            exit(1)

    def _validate_environment(self, env_value: str):
        if env_value not in [e.value for e in Environment]:
            print(f"❌ Invalid environment value: {env_value}. Must be one of: {[e.value for e in Environment]}")
            exit(1)
        return Environment(env_value)

config = Config()
