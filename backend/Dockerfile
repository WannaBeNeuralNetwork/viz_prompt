FROM rocker/r-ver:4.2.3

# Installing system + graphics dependencies
RUN apt-get update && apt-get install -y \
    python3 python3-pip curl \
    libx11-dev libglu1-mesa-dev libxext-dev libxrender-dev \
    libsm6 libxmu6 libfreetype6-dev libpng-dev libjpeg-dev \
    libgl1 xvfb pandoc && \
    apt-get clean

# Python requirements
COPY backend/requirements.txt /app/requirements.txt
RUN pip3 install --no-cache-dir -r /app/requirements.txt

# Install R libraries
RUN R -e "install.packages(c('plotly', 'rgl', 'htmlwidgets', 'ggplot2'), repos='https://cloud.r-project.org')"

# Copy backend app code
COPY backend/app /app/app

WORKDIR /app
EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
