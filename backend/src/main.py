import pandas as pd
from typing import Annotated
from fastapi import FastAPI, UploadFile, Form, File
from fastapi.middleware.cors import CORSMiddleware
from util.validation import validate_dataframe
from util.analyze_data import analyze_data
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
def root():
    return {"message": "Hello World"}

@app.post("/api/data")
def process_data(csv_data: Annotated[UploadFile, File()], smiles_column: Annotated[str, Form()]):
    df = pd.read_csv(csv_data.file)

    df = df.reset_index(drop=True)
    
    if not validate_dataframe(df, smiles_column):
        return {"error": "SMILES not found"}
    
    result_df = analyze_data(df, smiles_column)

    return result_df.to_json()