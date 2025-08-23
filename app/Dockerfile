# Use an official Python runtime as the base image
FROM python:3.9-bullseye

# Set working directory
WORKDIR /app

# Copy the entire project directory to the working directory
COPY . /app

# Copy requirements.txt specifically from the app subdirectory
COPY app/requirements.txt /app/requirements.txt

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

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port the app runs on
EXPOSE 8080

# Set environment variables
ENV MONGO_URI=mongodb://host.docker.internal:27017/

# Run the application from the correct directory
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]