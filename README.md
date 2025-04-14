# 📊 Script to Chart: Visualization Generator

This project is a **language-agnostic web application** that dynamically renders **static**, **interactive**, and **3D visualizations** from user-provided Python or R scripts. It's designed for data scientists, analysts, and educators who want to quickly generate visual outputs across environments.

---

## 🧰 Tech Stack

### 🖥️ Frontend
- React (TypeScript)
- Tailwind CSS
- Vite

### 🧪 Backend
- Python 3 (FastAPI, matplotlib, plotly, pyvista)
- R 4.2+ (Rscript execution: ggplot2, plotly, rgl, htmlwidgets)
- Secure code execution in isolated containers

### ⚙️ DevOps
- Docker + Docker Compose for isolated multi-language builds

---

## 🚀 Features

- Upload or paste **Python or R** code
- Support for **static (.png)**, **interactive (.html)**, and **3D WebGL** visualizations
- Auto-detects plotting library and saves output accordingly
- Clean API using FastAPI with static content serving
- Runs in containerized environment using Docker

---

## 🖼️ Supported Visualization Libraries

### Python:
- `matplotlib` – static images
- `plotly` – interactive charts
- `pyvista` – 3D WebGL visualizations

### R:
- `ggplot2` – static plots
- `plotly` – interactive
- `rgl` + `htmlwidgets` – 3D using `rglwidget()`

---

## 🧪 Example Scripts

### Python - Interactive

```python
import plotly.express as px
fig = px.bar(x=["A", "B", "C"], y=[10, 20, 15])

### Python - 3D

```import pyvista as pv
sphere = pv.Sphere()
plotter = pv.Plotter()
plotter.add_mesh(sphere)
plotter.show()

### R - Static
'''library(ggplot2)
df <- data.frame(x = 1:5, y = c(4, 7, 1, 8, 5))
ggplot(df, aes(x, y)) + geom_line()


### R - Interactive
'''library(plotly)
fig <- plot_ly(x = c(1, 2, 3), y = c(4, 5, 6), type = 'scatter', mode = 'lines+markers')

### R - 3D
'''library(rgl)
plot3d(x = rnorm(100), y = rnorm(100), z = rnorm(100), col = rainbow(100))
rglwidget()

#RUN Locally (Docker)
# Clone the repository
git clone https://github.com/yourusername/visualization-generator.git
cd visualization-generator

# Start the app
docker-compose up --build


### Project Structure

project/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── runner.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── App.tsx
│   └── ...
├── Dockerfile
├── frontend.Dockerfile
├── docker-compose.yml



Pull requests, suggestions and bug reports are welcome! Feel free to fork and improve.

