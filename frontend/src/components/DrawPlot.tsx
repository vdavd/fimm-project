import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import type { Figure } from "react-plotly.js";
import { colorPalette50, colorScale } from "../constants";
import { getColorFromScale } from "../util/colorUtil";

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
  const [parsedData, setParsedData] = useState<PlotDataObject[] | null>(null);
  const [plotData, setPlotData] = useState<PlotDataObject[] | null>(null);
  const [traces, setTraces] = useState<Figure["data"] | null>(null);
  const [layout, setLayout] = useState<Figure["layout"]>({
    width: 960,
    height: 720,
    xaxis: { title: { text: "PC1", font: { size: 20 } } },
    yaxis: { title: { text: "PC2", font: { size: 20 } } },
    images: [],
    hoverdistance: 20,
  });
  const [zoomedView, setZoomedView] = useState(false);

  useEffect(() => {
    const isNumber = (value: unknown) => {
      return typeof value === "number";
    };

    const isString = (value: unknown) => {
      return typeof value === "string";
    };

    const parseData = (data: string) => {
      const objectData = JSON.parse(data);

      const pc1 = Object.values(objectData.PC1);
      const pc2 = Object.values(objectData.PC2);
      const label = Object.values(objectData[labelColumn]).map((value) =>
        value === null ? "NA" : value
      );
      const svg = Object.values(objectData.SVG);

      if (
        pc1.every((value) => isNumber(value)) &&
        pc2.every((value) => isNumber(value)) &&
        label.every((value) => isNumber(value) || isString(value)) &&
        svg.every((value) => isString(value))
      ) {
        const parsedDataObjectList = pc1.map((_value, index) => {
          return {
            pc1: pc1[index],
            pc2: pc2[index],
            label: label[index],
            svg: svg[index],
          };
        });
        setParsedData(parsedDataObjectList);
      } else {
        console.log("Type checking didn't go through in parseData");
        return null;
      }
    };
    if (analyzedData) {
      const parsedPlotData = parseData(analyzedData);
      if (parsedPlotData != null) {
        setParsedData(parsedPlotData);
      }
    }
    console.log("1st useEffect");
  }, [analyzedData, labelColumn]);

  useEffect(() => {
    const generateTraces = () => {
      if (parsedData && labelType === "categorical") {
        // Find and sort categorical labels
        const labels = [...new Set(parsedData.map((pd) => pd.label))];
        labels.sort();

        // Check that number of labels isn't over 30
        if (labels.length > 30) {
          console.log(
            `Maximum of 30 categories supported. Your number of categories: ${labels.length}`
          );
          return;
        }

        // Create color palette for labels
        const labelsWithColor = Object.fromEntries(
          labels.map((key, i) => [key, colorPalette50[i]])
        );

        // Recolor the SVG images with respect to their label
        const colorSvgsCategorical = () => {
          const coloredPlotData = parsedData.map((pd) => {
            const color = colorPalette50[labels.indexOf(pd.label)];
            const coloredSvg = pd.svg.replace(/000000/g, color.slice(-6));
            return {
              ...pd,
              svg: coloredSvg,
            };
          });

          return coloredPlotData;
        };

        const coloredPlotData = colorSvgsCategorical();
        setPlotData(coloredPlotData);

        // Define and set the traces
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
              size: zoomedView ? 0.00001 : 8,
            },
          };
        });
        setTraces(categorical_traces);
      } else if (parsedData && labelType === "continuous") {
        // Get label values as numbers
        const labelsAsNumber = parsedData.map((d) => Number(d.label));

        // Get min and max of label values
        const minValue = Math.min(
          ...labelsAsNumber.filter((label) => !isNaN(label))
        );
        const maxValue = Math.max(
          ...labelsAsNumber.filter((label) => !isNaN(label))
        );

        console.log(minValue, maxValue);

        // Color the SVGs with respect to their label
        const colorSvgsContinuous = () => {
          const colorValues = labelsAsNumber.map((label) =>
            getColorFromScale(label, minValue, maxValue, colorScale)
          );

          const coloredPlotData = parsedData.map((pd, index) => {
            const color = colorValues[index];
            const coloredSvg = pd.svg.replace(/000000/g, color.slice(-6));
            return {
              ...pd,
              svg: coloredSvg,
            };
          });
          return coloredPlotData;
        };

        const coloredPlotData = colorSvgsContinuous();
        setPlotData(coloredPlotData);

        const continuous_traces: Figure["data"] = [
          {
            x: parsedData.map((d) => d.pc1),
            y: parsedData.map((d) => d.pc2),
            type: "scatter",
            mode: "markers",
            marker: {
              color: labelsAsNumber,
              colorscale: colorScale,
              cmin: Math.min(...labelsAsNumber),
              cmax: Math.max(...labelsAsNumber),
              colorbar: {},
              size: zoomedView ? 0.00001 : 8,
            },
            text: parsedData.map((d) => d.label.toString()),
          },
        ];

        setTraces(continuous_traces);
      }
    };

    generateTraces();
    console.log("2nd useEffect");
  }, [labelType, parsedData, setTraces, zoomedView]);

  const handleRelayout = (event: Readonly<Plotly.PlotRelayoutEvent>) => {
    console.log(event);
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

        if (zoomedData.length < 500) {
          const newImages = zoomedData.map(
            (pd) =>
              ({
                source: pd.svg,
                x: pd.pc1,
                y: pd.pc2,
                sizex: 0.375,
                sizey: 0.5,
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
            hoverdistance: 40,
          });
          setZoomedView(true);
        }
      }
    }
  };

  const handleDoubleClick = () => {
    console.log("handleDoubleclick fired");
    setLayout({
      width: 960,
      height: 720,
      xaxis: { title: { text: "PC1", font: { size: 20 } } },
      yaxis: { title: { text: "PC2", font: { size: 20 } } },
      images: [],
      hoverdistance: 20,
    });
    setZoomedView(false);
  };

  const handleHover = (event: Readonly<Plotly.PlotHoverEvent>) => {
    const x = event.points[0].x;
    const y = event.points[0].y;

    if (layout.images && zoomedView) {
      console.log("handlehover fired");
      const newImages = layout.images.map((image) => ({
        ...image,
        opacity: image.x === x && image.y === y ? 1.0 : 0.15,
      }));

      setLayout((prev) => ({
        ...prev,
        images: newImages,
      }));
    }
  };

  const handleUnhover = () => {
    if (layout.images && zoomedView) {
      console.log("handleUnhover fired");
      const newImages = layout.images.map((image) => ({
        ...image,
        opacity: 1.0,
      }));

      setLayout((prev) => ({
        ...prev,
        images: newImages,
      }));
    }
  };

  return (
    <div>
      {plotData && traces && (
        <Plot
          data={traces}
          layout={layout}
          onRelayout={handleRelayout}
          onDoubleClick={handleDoubleClick}
          onHover={handleHover}
          onUnhover={handleUnhover}
          useResizeHandler
        />
      )}
    </div>
  );
};

export default DrawPlot;
