import pandas as pd
import numpy as np
from rdkit.Chem import AllChem, MolFromSmiles, Draw, MACCSkeys
from rdkit import DataStructs
from sklearn.decomposition import PCA
from sklearn.ensemble import IsolationForest
import urllib.parse
import umap

def remove_missing_smiles(df: pd.DataFrame, smiles_column: str):
    df_without_na = df.dropna(subset=[smiles_column])
    return df_without_na

def generate_mols(df: pd.DataFrame, smiles_column: str):
    print('generating mols...')
    molecules = []

    # Generate mols objects for each smiles
    for smiles in df[smiles_column]:       
        mol = MolFromSmiles(smiles, sanitize=True)
        molecules.append(mol)
    
    df['mol'] = molecules

    # Remove rows where mols couldn't be generated from smiles
    valid_mols_df = df.dropna(subset=['mol'])
    valid_mols_df = valid_mols_df.reset_index(drop=True)

    return valid_mols_df

def generate_fingerprints(df: pd.DataFrame, fingerprint_type: str):
    fingerprints = []

    if fingerprint_type == "Morgan":
        fingerprint_generator = AllChem.GetMorganGenerator(radius=2) 
        print('generating fingerprints...')
        for mol in df['mol']:
            fingerprint = fingerprint_generator.GetFingerprint(mol)
            fingerprint_arr = np.zeros((0,), dtype=int)
            # convert the RDKit explicit vectors into numpy arrays
            DataStructs.ConvertToNumpyArray(fingerprint, fingerprint_arr)
            fingerprints.append(fingerprint_arr)

    elif fingerprint_type == "Topological":
        fingerprint_generator = AllChem.GetRDKitFPGenerator()
        print('generating fingerprints...')
        for mol in df['mol']:
            fingerprint = fingerprint_generator.GetFingerprint(mol)
            fingerprint_arr = np.zeros((0,), dtype=int)
            # convert the RDKit explicit vectors into numpy arrays
            DataStructs.ConvertToNumpyArray(fingerprint, fingerprint_arr)
            fingerprints.append(fingerprint_arr)
    
    elif fingerprint_type == "MACCS":
        print('generating fingerprints...')
        for mol in df['mol']:
            fingerprint = MACCSkeys.GenMACCSKeys(mol)
            fingerprint_arr = np.zeros((0,), dtype=int)
            # convert the RDKit explicit vectors into numpy arrays
            DataStructs.ConvertToNumpyArray(fingerprint, fingerprint_arr)
            fingerprints.append(fingerprint_arr)
        
    # Convert fingerprint array into a pandas DataFrame    
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

def perform_umap(fingerprint_df: pd.DataFrame):
    print("performing umap...")
    reducer = umap.UMAP(n_neighbors=100)

    # Perform UMAP
    embedding = reducer.fit_transform(fingerprint_df)

    # Convert the results to a DataFrame
    principal_df = pd.DataFrame(data=embedding, columns=['PC1', 'PC2'])

    return principal_df

def mol_to_svg_uri(mol, width=200, height=200):
    try:
        if mol is None:
            return ""
        drawer = Draw.MolDraw2DSVG(width, height)
        options = drawer.drawOptions()
        options.useBWAtomPalette()
        options.setBackgroundColour((1, 1, 1, 0))
        drawer.DrawMolecule(mol)
        drawer.FinishDrawing()
        svg = drawer.GetDrawingText().strip()
        return "data:image/svg+xml;utf8," + urllib.parse.quote(svg)
    except:
        return ""

def generate_svgs(df: pd.DataFrame):
    print('generating svg images...')
    svg_images = [
        mol_to_svg_uri(row["mol"])
        for _, row in df.iterrows()
    ]

    return pd.DataFrame({'SVG': svg_images })

def outlier_detection(features_df: pd.DataFrame):
    iforest = IsolationForest(random_state=42)
    prediction = iforest.fit_predict(features_df)
    return prediction

def analyze_data(df: pd.DataFrame, smiles_column: str, dim_red_method: str, fingerprint_type: str):
    # Remove missing values from SMILES column

    df_without_na = remove_missing_smiles(df, smiles_column)
    # Generate mols from SMILES
    df_with_mols = generate_mols(df_without_na, smiles_column)

    # Generate SVG images from mol objects
    df_with_svg = pd.concat([df_with_mols, generate_svgs(df_with_mols)], axis=1)

    # Generate Morgan fingerprints
    fingerprint_df = generate_fingerprints(df_with_mols, fingerprint_type)

    if dim_red_method == "PCA":
        # Perform PCA on fingerprints
        principal_df = perform_pca(fingerprint_df)

    elif dim_red_method == "UMAP":
        principal_df = perform_umap(fingerprint_df)

    # Concatenate PCA results with df containing other data
    final_df = pd.concat([df_with_svg, principal_df], axis=1)

    # Outlier detection
    print("Detecting outliers....")
    outlier_list = outlier_detection(fingerprint_df)
    print(f"{np.sum(outlier_list < 0, axis=0)} outliers detected")
    final_df["isoforest_outlier"] = outlier_list
    return final_df
