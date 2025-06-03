from fastapi import FastAPI
from pydantic import BaseModel

class Data(BaseModel):
    smile: str
    value: float

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/api/data")
async def process_data(data: Data):
    return data