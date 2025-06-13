import pandas as pd
import numpy as np
from rdkit.Chem import AllChem, PandasTools
from rdkit import DataStructs
from sklearn.decomposition import PCA

def generate_mols(df: pd.DataFrame, smiles_column: str):
    print('generating mols....')
    PandasTools.AddMoleculeColumnToFrame(df, smiles_column, 'mol')
    return df

def generate_fingerprints(df: pd.DataFrame):
    fingerprints = []

    fingerprint_generator = AllChem.GetMorganGenerator(radius=2) 
    print('generating fingerprints....')
    for mol in df['mol']:
        fingerprint = fingerprint_generator.GetFingerprint(mol)
        fingerprint_arr = np.zeros((0,), dtype=int)
        # convert the RDKit explicit vectors into numpy arrays
        DataStructs.ConvertToNumpyArray(fingerprint, fingerprint_arr)
        fingerprints.append(fingerprint_arr)

    # convert ecfp fingerprints into dataframe
    fingerprint_df = pd.DataFrame(fingerprints)

    return fingerprint_df

def perform_pca(fingerprint_df: pd.DataFrame):
    print("performing pca...")
    # Perform PCA
    pca = PCA(n_components=2)
    principal_components = pca.fit_transform(fingerprint_df)

    # Convert the results to a DataFrame
    principal_df = pd.DataFrame(data=principal_components, columns=['PC1', 'PC2'])

    return principal_df

def analyze_data(df: pd.DataFrame, smiles_column: str):
    # Generate mols from SMILES
    df_with_mols = generate_mols(df, smiles_column)

    # Generate Morgan fingerprints
    fingerprint_df = generate_fingerprints(df_with_mols)

    # Perform PCA on fingerprints
    principal_df = perform_pca(fingerprint_df)

    # Concatenate PCA results with df containing other data
    final_df = pd.concat([df_with_mols, principal_df], axis=1)

    return final_df
