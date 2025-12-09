# ============================
# 1. Builder stage
# ============================
FROM python:3.10.12 AS builder

# Install system packages needed for building dependencies
RUN apt-get update && apt-get install -y gcc curl && rm -rf /var/lib/apt/lists/*

# Install Poetry (official method)
ENV POETRY_VERSION=2.1.1
RUN curl -sSL https://install.python-poetry.org | python3 -

ENV PATH="/root/.local/bin:$PATH"

WORKDIR /app

# Disable Poetry virtualenv creation (IMPORTANT)
RUN poetry config virtualenvs.create false

# Copy only dependency files for caching
COPY pyproject.toml poetry.lock ./

# Install dependencies into system Python
RUN poetry install --no-root

# ============================
# 2. Final runtime image
# ============================
FROM python:3.10.12

# Copy installed dependencies from builder image
COPY --from=builder /usr/local /usr/local

# Create app directory
WORKDIR /app

# Copy the actual application code
COPY . .

EXPOSE 8000

ENV PYTHONPATH=/app/src

# Start FastAPI using Uvicorn
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
