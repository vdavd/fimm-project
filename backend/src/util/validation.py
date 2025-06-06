import pandas as pd

def validate_dataframe(df: pd.DataFrame):
    if 'SMILES' in df.columns and 'label' in df.columns:
        return True   
    return False