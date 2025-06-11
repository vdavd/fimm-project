import { useEffect, useState } from "react";
import Plot from "react-plotly.js";

interface DrawPlotProps {
  analyzedData: string;
  labelColumn: string;
}

interface PlotDataValues {
  pc1: number[];
  pc2: number[];
  label: number[];
}
const DrawPlot = ({ analyzedData, labelColumn }: DrawPlotProps) => {
  const [plotData, setPlotData] = useState<PlotDataValues | null>(null);
  console.log(labelColumn);

  useEffect(() => {
    const isNumber = (value: unknown) => {
      return typeof value === "number";
    };

    const parseData = (data: string) => {
      const objectData = JSON.parse(data);
      const pc1 = Object.values(objectData.PC1);
      const pc2 = Object.values(objectData.PC2);
      const label = Object.values(objectData[labelColumn]);

      if (
        pc1.every((value) => isNumber(value)) &&
        pc2.every((value) => isNumber(value)) &&
        label.every((value) => isNumber(value))
      ) {
        return { pc1: pc1, pc2: pc2, label: label };
      }
      console.log("waduheeel");
      return null;
    };
    if (analyzedData) {
      const parsedData = parseData(analyzedData);
      if (parsedData != null) {
        setPlotData(parsedData);
      }
    }
  }, [analyzedData, labelColumn]);

  return (
    <div>
      {plotData && (
        <Plot
          data={[
            {
              x: plotData.pc1,
              y: plotData.pc2,
              type: "scatter",
              mode: "markers",
              marker: {
                color: plotData.label,
                colorbar: {},
              },
            },
          ]}
          layout={{ width: 640, height: 480, title: { text: "A Fancy Plot" } }}
        />
      )}
    </div>
  );
};

export default DrawPlot;
