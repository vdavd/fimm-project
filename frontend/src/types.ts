export type LabelType = "categorical" | "continuous" | "";
export type DimRedMethodType = "PCA" | "UMAP";
export type FingerPrintTypeType = "Morgan" | "Topological" | "MACCS";

export interface FileUploadParams {
  smilesColumn: string;
  dimRedMethod: string;
  fingerprintType: FingerPrintTypeType;
  removeOutliers: string;
}

export interface PlotDataObject {
  id: string;
  smiles: string;
  pc1: number;
  pc2: number;
  label: number | string;
  svg: string;
  color: string;
}

type LabeledValue<T> = {
  value: T;
  label: string;
};

export interface MoleculeProperties {
  cid: string;
  formula: LabeledValue<string>;
  molWeight: LabeledValue<number>;
  LogP: LabeledValue<number>;
  hba: LabeledValue<number>;
  hbd: LabeledValue<number>;
  rtb: LabeledValue<number>;
  psa: LabeledValue<number>;
}
