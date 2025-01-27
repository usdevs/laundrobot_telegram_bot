# Use Python 3.13 base image
FROM python:3.13-slim

# Set working directory
WORKDIR /app

# Install pipenv
RUN pip install pipenv

# Copy Pipfile and Pipfile.lock
COPY Pipfile* ./

# Install dependencies
RUN pipenv install --system --deploy

# Copy bot code
COPY . .

# Run bot
CMD ["python", "bot.py"]
