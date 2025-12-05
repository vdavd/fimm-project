import pandas as pd
from rdkit.Chem import MolFromSmiles
from fastapi import HTTPException

def validate_dataframe(df: pd.DataFrame, smiles_column: str):
    if smiles_column in df.columns:
        return True
    return False

def validate_target_smiles(target_smiles: list):
    if len(target_smiles) > 5 or len(target_smiles) < 1:
        raise HTTPException(status_code=400, detail=f"Number of target SMILES must be between 1 and 5")
    
    invalid_smiles = []
    for smiles in target_smiles:
        mol = MolFromSmiles(str(smiles))
        if mol is None:
            if len(smiles) > 30:
                trimmed_smiles = smiles[:30] + "..."
                invalid_smiles.append(trimmed_smiles)
            else:
                invalid_smiles.append(smiles)

    if len(invalid_smiles) > 0:
        invalid_smiles_str = ", ".join(invalid_smiles).strip()
        raise HTTPException(status_code=400, detail=f"Invalid SMILES: {invalid_smiles_str}")