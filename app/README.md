# AI Learning Game App

This app teaches users about AI, image labeling, and gamifies the verification of AI responses. It supports login via Google, Apple, X, or username/password, tracks user progress, and rewards points redeemable for money or goods. The backend uses FastAPI and MongoDB, and is containerized for deployment to Azure Kubernetes Services.

## Getting Started

### Prerequisites
- Docker Desktop (or Docker Engine)
- MongoDB (local or cloud, e.g., MongoDB Atlas)
- Python 3.11+ (for local development)

### Quick Start (Docker)
1. **Build the Docker image:**
   ```pwsh
   docker build --no-cache -t ai-learning-game:latest ./app
   ```
2. **Run the container:**
   ```pwsh
   docker run -p 8100:8080 -e MONGO_URI="mongodb://host.docker.internal:27017/" ai-learning-game:latest
   ```
   - Replace `8100` with your desired local port.
   - Update `MONGO_URI` if using a remote MongoDB instance.
3. **Open the app:**
   - Visit `http://localhost:8100` in your browser.

### Local Development
1. **Install dependencies:**
   ```pwsh
   cd app
   pip install -r requirements.txt
   ```
2. **Set environment variable:**
   ```pwsh
   export MONGO_URI="mongodb://localhost:27017/"
   ```
3. **Start FastAPI server:**
   ```pwsh
   uvicorn api.main:app --reload --host 0.0.0.0 --port 8080
   ```

## Maintenance
- **Update dependencies:** Edit `requirements.txt` and rebuild the Docker image.
- **Database:** Use MongoDB Compass or Atlas to manage users, progress, and rewards.
- **Testing:**
   ```pwsh
   pytest
   ```
- **Deployment:**
   - Push the Docker image to Azure Container Registry.
   - Deploy to Azure Kubernetes Services (AKS) using your preferred method (YAML, Helm, etc.).

## Troubleshooting
- **Port already allocated:** Use a different port with `-p` or stop the process using the port.
- **MongoDB connection errors:** Ensure MongoDB is running and accessible from the container. Use `host.docker.internal` for local MongoDB on macOS/Windows.
- **Static files/UI not loading:** Rebuild the Docker image with `--no-cache` to ensure the latest code is used.

## Project Structure
- `api/` - FastAPI backend and routes
- `models/` - Pydantic models and DB connection
- `templates/` - HTML templates (UI)
- `static/` - CSS and JS for frontend
- `features/` - BDD feature files
- `tests/` - Automated tests
- `requirements.txt` - Python dependencies
- `Dockerfile` - Container build instructions

## Contact
For questions or contributions, open an issue or pull request in this repository.
