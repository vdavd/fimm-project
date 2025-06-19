import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import type { Figure } from "react-plotly.js";
import { hexPalette30 } from "../constants";

interface DrawPlotProps {
  analyzedData: string;
  labelColumn: string;
  labelType: string;
}

interface PlotDataObject {
  pc1: number;
  pc2: number;
  label: number | string;
  svg: string;
}

const DrawPlot = ({ analyzedData, labelColumn, labelType }: DrawPlotProps) => {
  const [plotData, setPlotData] = useState<PlotDataObject[] | null>(null);
  const [traces, setTraces] = useState<Figure["data"] | null>(null);
  const [layout, setLayout] = useState<Figure["layout"]>({
    width: 960,
    height: 720,
    xaxis: { title: { text: "PC1", font: { size: 20 } } },
    yaxis: { title: { text: "PC2", font: { size: 20 } } },
    images: [],
  });
  //const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const isNumber = (value: unknown) => {
      return typeof value === "number";
    };

    const isString = (value: unknown) => {
      return typeof value === "string";
    };

    const parseData = (data: string) => {
      const objectData = JSON.parse(data);
      console.log(objectData);

      const pc1 = Object.values(objectData.PC1);
      const pc2 = Object.values(objectData.PC2);
      const label = Object.values(objectData[labelColumn]);
      const svg = Object.values(objectData.SVG);

      if (
        pc1.every((value) => isNumber(value)) &&
        pc2.every((value) => isNumber(value)) &&
        label.every((value) => isNumber(value) || isString(value)) &&
        svg.every((value) => isString(value))
      ) {
        const plotDataObjectList = pc1.map((_value, index) => {
          return {
            pc1: pc1[index],
            pc2: pc2[index],
            label: label[index],
            svg: svg[index],
          };
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
    console.log("1st useEffect");
  }, [analyzedData, labelColumn]);

  useEffect(() => {
    const generateTraces = () => {
      if (plotData && labelType === "categorical") {
        const labels = [...new Set(plotData.map((pd) => pd.label))];

        const labelsWithColor = Object.fromEntries(
          labels.map((key, i) => [key, hexPalette30[i]])
        );

        const colorSvgs = (plotData: PlotDataObject[]) => {
          const coloredPlotData = plotData.map((pd) => {
            const color = hexPalette30[labels.indexOf(pd.label)];
            const coloredSvg = pd.svg.replace(/000000/g, color.slice(-6));
            return {
              ...pd,
              svg: coloredSvg,
            };
          });

          return coloredPlotData;
        };

        const coloredPlotData = colorSvgs(plotData);

        const categorical_traces: Figure["data"] = labels.map((label) => {
          const group = coloredPlotData.filter((d) => d.label === label);
          return {
            x: group.map((d) => d.pc1),
            y: group.map((d) => d.pc2),
            mode: "markers",
            type: "scatter",
            name: label.toString(),
            marker: {
              color: labelsWithColor[label],
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
    console.log("2nd useEffect");
  }, [labelType, plotData, setTraces, labelColumn]);

  const handleRelayout = (event: Readonly<Plotly.PlotRelayoutEvent>) => {
    if (plotData) {
      const x0 = event["xaxis.range[0]"];
      const x1 = event["xaxis.range[1]"];
      const y0 = event["yaxis.range[0]"];
      const y1 = event["yaxis.range[1]"];

      if (
        x0 !== undefined &&
        y0 !== undefined &&
        x1 !== undefined &&
        y1 !== undefined
      ) {
        const zoomedData = plotData.filter(
          (pd) => pd.pc1 >= x0 && pd.pc1 <= x1 && pd.pc2 >= y0 && pd.pc2 <= y1
        );

        const newImages = zoomedData.map(
          (pd) =>
            ({
              source: pd.svg,
              x: pd.pc1,
              y: pd.pc2,
              sizex: 0.3,
              sizey: 0.4,
              xref: "x",
              yref: "y",
              xanchor: "center",
              yanchor: "middle",
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any) // plotly's types wouldn't accept properties that were necessary to plot the svg images...
        );

        setLayout({
          width: 960,
          height: 720,
          xaxis: {
            range: [x0, x1],
            title: { text: "PC1", font: { size: 20 } },
          },
          yaxis: {
            range: [y0, y1],
            title: { text: "PC2", font: { size: 20 } },
          },
          images: newImages,
        });
        //setZoomed(true);
      }
    }
  };

  const handleDoubleClick = () => {
    setLayout((prev) => ({
      ...prev,
      images: [],
    }));
    //setZoomed(false);
  };

  return (
    <div>
      {plotData && traces && (
        <Plot
          data={traces}
          layout={layout}
          onRelayout={handleRelayout}
          onDoubleClick={handleDoubleClick}
          useResizeHandler
        />
      )}
    </div>
  );
};

export default DrawPlot;
