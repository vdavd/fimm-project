import { useState } from "react";
import type { FingerPrintTypeType } from "../types";
import SimilaritySearch from "./SimilaritySearch";
import SmilesColumnSelect from "./SmilesColumnSelect";
import FingerPrintTypeSelect from "./FingerPrintTypeSelect";

interface SimilaritySearchSettingsProps {
  parsedFile: string;
  columns: string[];
}

const SimilaritySearchSettings = ({
  parsedFile,
  columns,
}: SimilaritySearchSettingsProps) => {
  const [fingerPrintType, setFingerPrintType] =
    useState<FingerPrintTypeType>("Morgan");
  const [smilesColumn, setSmilesColumn] = useState("");
  return (
    <>
      <SmilesColumnSelect
        columns={columns}
        smilesColumn={smilesColumn}
        setSmilesColumn={setSmilesColumn}
      />
      <FingerPrintTypeSelect
        fingerPrintType={fingerPrintType}
        setFingerPrintType={setFingerPrintType}
      />
      <SimilaritySearch
        parsedFile={parsedFile}
        smilesColumn={smilesColumn}
        fingerprintType={fingerPrintType}
      />
    </>
  );
};

export default SimilaritySearchSettings;
