import pandas as pd
from fastapi import FastAPI, UploadFile
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
async def root():
    return {"message": "Hello World"}

@app.post("/api/data")
async def process_data(csv_data: UploadFile):
    df = pd.read_csv(csv_data.file, index_col=0)

    if not validate_dataframe(df):
        return {"error": "SMILES or label column not found"}
    
    result_df = analyze_data(df)

    print(result_df.head(5))

    return {
        "success"
    }