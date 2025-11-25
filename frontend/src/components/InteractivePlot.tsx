import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import type { PlotParams } from "react-plotly.js";
import type { Image } from "plotly.js";
import { colorPalette50, colorScale } from "../constants";
import { generateOutlineCircleSVG, getColorFromScale } from "../util/svgUtil";
import { Box, Paper, Slider, Typography, Zoom } from "@mui/material";
import type { DimRedMethodType } from "../types";
import type { PlotDataObject } from "../types";
import MoleculeInfo from "./MoleculeInfo";

interface InteractivePlotProps {
  analyzedData: string;
  labelColumn: string;
  smilesColumn: string;
  labelType: string;
  highlightedSmiles: string[];
  dimRedMethod: DimRedMethodType;
  removeOutliers: boolean;
}

const InteractivePlot = ({
  analyzedData,
  labelColumn,
  smilesColumn,
  labelType,
  highlightedSmiles,
  dimRedMethod,
  removeOutliers,
}: InteractivePlotProps) => {
  const [parsedData, setParsedData] = useState<PlotDataObject[] | null>(null);
  const [plotData, setPlotData] = useState<PlotDataObject[] | null>(null);
  const [traces, setTraces] = useState<PlotParams["data"] | null>(null);
  const [layout, setLayout] = useState<PlotParams["layout"]>({
    height: undefined,
    width: undefined,
    margin: { l: 50, r: 50, t: 50, b: 50 },
    xaxis: {
      title: {
        text: dimRedMethod === "PCA" ? "PC1" : "UMAP1",
        font: { size: 20 },
      },
    },
    yaxis: {
      title: {
        text: dimRedMethod === "PCA" ? "PC2" : "UMAP2",
        font: { size: 20 },
      },
    },
    images: [],
    hoverdistance: 20,
    legend: {
      title: {
        text: labelColumn,
      },
    },
  });
  const [zoomedView, setZoomedView] = useState(false);
  const [moleculeSize, setMoleculeSize] = useState(0.5);
  const [selectedMolecule, setSelectedMolecule] =
    useState<PlotDataObject | null>(null);
  const [plotReady, setPlotReady] = useState(false);

  useEffect(() => {
    const isNumber = (value: unknown) => {
      return typeof value === "number";
    };

    const isString = (value: unknown) => {
      return typeof value === "string";
    };

    const isBoolean = (value: unknown) => {
      return typeof value === "boolean";
    };

    const parseData = (data: string) => {
      const objectData = JSON.parse(data);

      const id = Object.values(objectData.molSimToolId).map((id) => String(id));
      const smiles = Object.values(objectData[smilesColumn]);
      const pc1 = Object.values(objectData.PC1);
      const pc2 = Object.values(objectData.PC2);
      const label = Object.values(objectData[labelColumn]).map((value) =>
        value === null ? "NA" : value
      );
      const svg = Object.values(objectData.SVG);

      if (
        id.every((value) => isString(value)) &&
        smiles.every((value) => isString(value)) &&
        pc1.every((value) => isNumber(value)) &&
        pc2.every((value) => isNumber(value)) &&
        label.every(
          (value) => isNumber(value) || isString(value) || isBoolean(value)
        ) &&
        svg.every((value) => isString(value))
      ) {
        const parsedDataObjectList = pc1.map((_value, index) => {
          return {
            id: id[index],
            smiles: smiles[index],
            pc1: pc1[index],
            pc2: pc2[index],
            label: label[index],
            svg: svg[index],
            color: "#000000",
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
  }, [analyzedData, labelColumn]);

  // Set x and y axis titles when analyzed data changes
  useEffect(() => {
    setLayout((prev) => ({
      ...prev,
      xaxis: {
        title: {
          text: dimRedMethod === "PCA" ? "PC1" : "UMAP1",
          font: { size: 20 },
        },
      },
      yaxis: {
        title: {
          text: dimRedMethod === "PCA" ? "PC2" : "UMAP2",
          font: { size: 20 },
        },
      },
    }));
  }, [analyzedData]);

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
              color: color,
            };
          });

          return coloredPlotData;
        };

        const traceData = colorSvgsCategorical();

        setPlotData(traceData);

        const highlightedData = traceData.filter((d) =>
          highlightedSmiles.includes(d.id)
        );
        const highlightedTraces: PlotParams["data"] = [
          {
            x: highlightedData.map((d) => d.pc1),
            y: highlightedData.map((d) => d.pc2),
            type: "scatter",
            mode: "markers",
            marker: {
              size: zoomedView ? 0.00001 : 18,
              color: "rgba(0,0,0,0)",
              line: {
                width: 2,
                color: "red",
              },
            },
            showlegend: false,
            hoverinfo: "skip",
          },
        ];

        // Define and set the traces
        const categorical_traces: PlotParams["data"] = labels.map((label) => {
          const group = traceData.filter((d) => d.label === label);
          return {
            x: group.map((d) => d.pc1),
            y: group.map((d) => d.pc2),
            mode: "markers",
            type: "scatter",
            name: label.toString(),
            marker: {
              color: labelsWithColor[label.toString()],
              size: 8,
              opacity: zoomedView ? 0 : 1,
            },
            showlegend: true,
            hoverinfo: "none",
          };
        });
        setTraces(categorical_traces.concat(highlightedTraces));
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
              color: color,
            };
          });
          return coloredPlotData;
        };

        const traceData = colorSvgsContinuous();

        setPlotData(traceData);

        const continuous_traces: PlotParams["data"] = [
          {
            x: traceData.map((d) => d.pc1),
            y: traceData.map((d) => d.pc2),
            type: "scatter",
            mode: "markers",
            marker: {
              color: labelsAsNumber,
              colorscale: colorScale,
              cmin: Math.min(...labelsAsNumber),
              cmax: Math.max(...labelsAsNumber),
              colorbar: {
                title: { text: labelColumn, font: { size: 16 }, side: "right" },
              },
              size: zoomedView ? 0.00001 : 8,
            },
            showlegend: false,
            hoverinfo: "none",
          },
        ];

        const highlightedData = traceData.filter((d) =>
          highlightedSmiles.includes(d.id)
        );
        const highlightedTraces: PlotParams["data"] = [
          {
            x: highlightedData.map((d) => d.pc1),
            y: highlightedData.map((d) => d.pc2),
            type: "scatter",
            mode: "markers",
            marker: {
              size: zoomedView ? 0.00001 : 18,
              color: "rgba(0,0,0,0)",
              line: {
                width: 2,
                color: "red",
              },
            },
            showlegend: false,
            hoverinfo: "skip",
          },
        ];

        setTraces(continuous_traces.concat(highlightedTraces));
      }
    };

    generateTraces();
  }, [
    labelType,
    parsedData,
    setTraces,
    zoomedView,
    labelColumn,
    highlightedSmiles,
    removeOutliers,
  ]);

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

        if (zoomedData.length < 250) {
          // only display molecules if less than 250 are in view
          const molecularImages: Partial<Image>[] = zoomedData.map((pd) => ({
            source: pd.svg,
            x: pd.pc1,
            y: pd.pc2,
            sizex: moleculeSize * 0.75,
            sizey: moleculeSize,
            xref: "x",
            yref: "y",
            xanchor: "center",
            yanchor: "middle",
          }));

          const svgCircles: Partial<Image>[] = zoomedData
            .filter((d) => highlightedSmiles.includes(d.id))
            .map((pd) => ({
              source: generateOutlineCircleSVG(pd.color),
              x: pd.pc1,
              y: pd.pc2,
              sizex: moleculeSize * 0.75,
              sizey: moleculeSize,
              xref: "x",
              yref: "y",
              xanchor: "center",
              yanchor: "middle",
              layer: "below",
            }));

          const newImages = molecularImages.concat(svgCircles);

          setLayout((prev) => ({
            ...prev,
            images: newImages,
            hoverdistance: 50,
          }));
          setZoomedView(true);
        }
      }
    }
  };

  const handleDoubleClick = () => {
    setLayout((prev) => ({
      ...prev,
      images: [],
      hoverdistance: 20,
    }));
    setZoomedView(false);
    setMoleculeSize(0.5);
  };

  const handleHover = (event: Readonly<Plotly.PlotHoverEvent>) => {
    const x = event.points[0].x;
    const y = event.points[0].y;

    if (layout.images && zoomedView) {
      const newImages = layout.images.map((image) => ({
        ...image,
        opacity: image.x === x && image.y === y ? 1.0 : 0.15,
      }));

      setLayout((prev) => ({
        ...prev,
        images: newImages,
        layer: "above",
      }));
    }
  };

  const handleUnhover = () => {
    if (layout.images && zoomedView) {
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

  const handleMoleculeSizeChange = (_event: Event, newValue: number) => {
    setMoleculeSize(newValue);
    if (layout.images) {
      const newImages = layout.images.map((image) => ({
        ...image,
        sizex: newValue * 0.75,
        sizey: newValue,
      }));

      setLayout((prev) => ({
        ...prev,
        images: newImages,
      }));
    }
  };

  const handleClick = (event: Readonly<Plotly.PlotMouseEvent>) => {
    const x = event.points[0].x;
    const y = event.points[0].y;

    if (parsedData) {
      const clickedMolecule = parsedData.filter(
        (pd) => pd.pc1 === x && pd.pc2 === y
      );
      if (clickedMolecule.length > 0) {
        setSelectedMolecule(clickedMolecule[0]);
      }
    }
  };

  return (
    <>
      {plotData && traces && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              height: "105vh",
            }}
          >
            <Zoom in={plotReady} timeout={500}>
              <Paper
                elevation={10}
                sx={{
                  width: "75%",
                  height: "90%",
                  px: 4,
                  py: 3,
                  my: 2,
                  mr: 1.5,
                  borderRadius: 3,
                }}
              >
                <Box sx={{ width: 350 }}>
                  <Typography>Molecule size</Typography>
                  <Slider
                    value={moleculeSize}
                    defaultValue={0.5}
                    min={0.02}
                    max={2.0}
                    step={0.005}
                    onChange={handleMoleculeSizeChange}
                    disabled={!zoomedView}
                  />
                </Box>
                <Plot
                  data={traces}
                  layout={layout}
                  onRelayout={handleRelayout}
                  onDoubleClick={handleDoubleClick}
                  onHover={handleHover}
                  onUnhover={handleUnhover}
                  onClick={handleClick}
                  useResizeHandler
                  style={{ width: "100%", height: "85%" }}
                  config={{
                    responsive: true,
                    modeBarButtonsToRemove: [
                      "select2d",
                      "lasso2d",
                      "autoScale2d",
                      "resetScale2d",
                    ],
                  }}
                  onInitialized={() => setPlotReady(true)}
                  onUpdate={() => setPlotReady(true)}
                />
              </Paper>
            </Zoom>

            <MoleculeInfo
              selectedMolecule={selectedMolecule}
              labelColumn={labelColumn}
              plotReady={plotReady}
            />
          </Box>
        </>
      )}
    </>
  );
};

export default InteractivePlot;
