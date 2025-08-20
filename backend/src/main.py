import pandas as pd
from io import StringIO
from typing import Annotated
from fastapi import FastAPI, Request, Query
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
async def process_data(    request: Request,
    smiles_column: str = Query(..., alias="smilesColumn"),
    dim_red_method: str = Query(..., alias="dimRedMethod"),
    fingerprint_type: str = Query(..., alias="fingerprintType"),
    remove_outliers: bool = Query(..., alias="removeOutliers")
):
    # Read raw CSV text from body
    csv_bytes = await request.body()
    csv_text = csv_bytes.decode("utf-8")

    # Load into pandas
    df = pd.read_csv(StringIO(csv_text))

    df = df.reset_index(drop=True)
    
    if not validate_dataframe(df, smiles_column):
        return {"error": "SMILES not found"}
    
    result_df = analyze_data(df, smiles_column, dim_red_method, fingerprint_type, remove_outliers)

    return result_df.to_json()