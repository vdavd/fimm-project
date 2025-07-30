export type LabelType = "categorical" | "continuous" | "";
export type DimRedMethodType = "PCA" | "UMAP";
export type FingerPrintTypeType = "Morgan" | "Topological" | "MACCS";

export interface PlotDataObject {
  id: string;
  smiles: string;
  pc1: number;
  pc2: number;
  label: number | string;
  svg: string;
  color: string;
  outlier: boolean;
}

export interface MoleculeProperties {
  formula: string;
  molWeight: number;
  LogP: number;
  hba: number;
  hbd: number;
  rtb: number;
  psa: number;
}
