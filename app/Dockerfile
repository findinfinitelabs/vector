# Use an official Python runtime as the base image
FROM python:3.9-bullseye as base

# Set working directory
WORKDIR /app

# Install system dependencies including those needed for OpenCV and other build tools
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    libblas-dev \
    libjpeg-dev \
    libpng-dev \
    libtiff-dev \
    libopenjp2-7 \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies (cached layer)
COPY app/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY app/api/main.py /app/api/main.py
COPY app/api/routes /app/api/routes
COPY app/models /app/models
COPY app/static /app/static
COPY app/templates /app/templates

# Expose the port the app runs on
EXPOSE 8080

# Set environment variables
ENV MONGO_URI=mongodb://host.docker.internal:27017/

# Run the application with the correct module path
CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8080"]