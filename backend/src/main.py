import pandas as pd
from io import StringIO
from typing import List
from fastapi import FastAPI, Request, Query
from fastapi.middleware.cors import CORSMiddleware
from util.validation import validate_dataframe, validate_target_smiles
from util.analyze_data import analyze_plot_data
from util.analyze_data import analyze_similarity_data
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

@app.post("/api/plotData")
async def process_plot_data(    request: Request,
    smiles_column: str = Query(..., alias="smilesColumn"),
    dim_red_method: str = Query(..., alias="dimRedMethod"),
    fingerprint_type: str = Query(..., alias="fingerprintType"),
    remove_outliers: bool = Query(..., alias="removeOutliers"),
    number_neighbors_umap: int = Query(..., alias="numberNeighborsUmap")
):
    # Read raw CSV text from body
    csv_bytes = await request.body()
    csv_text = csv_bytes.decode("utf-8")

    # Load into pandas
    df = pd.read_csv(StringIO(csv_text))

    df = df.reset_index(drop=True)
    
    if not validate_dataframe(df, smiles_column):
        return {"error": "SMILES not found"}
    
    result_df = analyze_plot_data(df, smiles_column, dim_red_method, fingerprint_type, remove_outliers, number_neighbors_umap)

    return result_df.to_json()

@app.post("/api/similarityData")
async def process_similarity_data(    request: Request,
    smiles_column: str = Query(..., alias="smilesColumn"),
    target_smiles: List[str] = Query(..., alias="targetSmiles"),
    fingerprint_type: str = Query(..., alias="fingerprintType")
    ):

    print(target_smiles)
    # Read raw CSV text from body
    csv_bytes = await request.body()
    csv_text = csv_bytes.decode("utf-8")

    df = pd.read_csv(StringIO(csv_text))

    df = df.reset_index(drop=True)
    
    if not validate_dataframe(df, smiles_column):
        return {"error": "SMILES not found"}
    
    validate_target_smiles(target_smiles)
    
    result_df = analyze_similarity_data(df, smiles_column, target_smiles, fingerprint_type)

    return result_df.to_json(orient="records")