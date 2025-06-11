import pandas as pd

def validate_dataframe(df: pd.DataFrame, smiles_column: str):
    if smiles_column in df.columns:
        return True
    return False