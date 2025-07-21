import pandas as pd
from io import StringIO
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
def process_data(csv_data: Annotated[str, Form()], smiles_column: Annotated[str, Form()],
                 dim_red_method: Annotated[str, Form()], fingerprint_type: Annotated[str, Form()],
                 remove_outliers: Annotated[bool, Form()]):
    df = pd.read_csv(StringIO(csv_data))

    print(remove_outliers)

    df = df.reset_index(drop=True)
    
    if not validate_dataframe(df, smiles_column):
        return {"error": "SMILES not found"}
    
    result_df = analyze_data(df, smiles_column, dim_red_method, fingerprint_type, remove_outliers)

    return result_df.to_json()