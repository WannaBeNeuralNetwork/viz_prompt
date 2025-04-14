from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from app.runner import run_script
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow Vite frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="app/static"), name="static")

class CodeInput(BaseModel):
    language: str  # "python" or "r"
    code: str

@app.post("/generate")
async def generate_visualization(input_data: CodeInput):
    result = run_script(input_data.language.lower(), input_data.code)
    if result["status"] == "success":
        return {
            "type": result["type"],
            "content": f"/static/{result['filename']}"
        }
    raise HTTPException(status_code=400, detail=result["error"])
