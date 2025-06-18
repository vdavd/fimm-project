import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import type { Figure } from "react-plotly.js";

interface DrawPlotProps {
  analyzedData: string;
  labelColumn: string;
  labelType: string;
}

interface PlotDataObject {
  pc1: number;
  pc2: number;
  label: number | string;
}

const DrawPlot = ({ analyzedData, labelColumn, labelType }: DrawPlotProps) => {
  const [plotData, setPlotData] = useState<PlotDataObject[] | null>(null);
  const [traces, setTraces] = useState<Figure["data"] | null>(null);

  useEffect(() => {
    const isNumber = (value: unknown) => {
      return typeof value === "number";
    };

    const isNumberOrString = (value: unknown) => {
      return typeof value === "number" || typeof value === "string";
    };

    const parseData = (data: string) => {
      const objectData = JSON.parse(data);
      console.log(objectData);

      const pc1 = Object.values(objectData.PC1);
      const pc2 = Object.values(objectData.PC2);
      const label = Object.values(objectData[labelColumn]);

      if (
        pc1.every((value) => isNumber(value)) &&
        pc2.every((value) => isNumber(value)) &&
        label.every((value) => isNumberOrString(value))
      ) {
        const plotDataObjectList = pc1.map((_value, index) => {
          return { pc1: pc1[index], pc2: pc2[index], label: label[index] };
        });
        setPlotData(plotDataObjectList);
      } else {
        console.log("Type checking didn't go through in parseData");
        return null;
      }
    };
    if (analyzedData) {
      const parsedData = parseData(analyzedData);
      if (parsedData != null) {
        setPlotData(parsedData);
      }
    }
  }, [analyzedData, labelColumn]);

  useEffect(() => {
    const generateTraces = () => {
      if (plotData && labelType === "categorical") {
        const labels = Array.from(new Set(plotData.map((d) => d.label)));
        const categorical_traces: Figure["data"] = labels.map((label) => {
          const group = plotData.filter((d) => d.label === label);
          return {
            x: group.map((d) => d.pc1),
            y: group.map((d) => d.pc2),
            mode: "markers",
            type: "scatter",
            name: label.toString(),
            marker: {
              color: label,
              size: 8,
            },
          };
        });
        setTraces(categorical_traces);
      } else if (plotData && labelType === "continuous") {
        const continuous_traces: Figure["data"] = [
          {
            x: plotData.map((d) => d.pc1),
            y: plotData.map((d) => d.pc2),
            type: "scatter",
            mode: "markers",
            marker: {
              color: plotData.map((d) => d.label),
              colorbar: {},
              size: 8,
            },
            text: plotData.map((d) => d.label.toString()),
          },
        ];

        setTraces(continuous_traces);
      }
    };

    generateTraces();
  }, [labelType, plotData, setTraces]);

  return (
    <div>
      {plotData && traces && (
        <Plot
          data={traces}
          layout={{
            width: 960,
            height: 720,
            xaxis: { title: { text: "PC1", font: { size: 20 } } },
            yaxis: { title: { text: "PC2", font: { size: 20 } } },
            images: plotData.map((pd) => ({
              source:
                "https://upload.wikimedia.org/wikipedia/commons/4/4f/Benzene_200.svg",
              x: pd.pc1,
              y: pd.pc2,
              xref: "x",
              yref: "y",
              sizex: 0.3,
              sizey: 0.4,
              xanchor: "center",
              yanchor: "middle",
            })),
          }}
        />
      )}
    </div>
  );
};

export default DrawPlot;
