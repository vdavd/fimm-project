from typing import Annotated
import pandas as pd
from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    )

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/api/data")
async def process_data(csv_data: UploadFile):
    df = pd.read_csv(csv_data.file)
    print(df.columns)
    return {
        "filename": "from backend: " + csv_data.filename
    }