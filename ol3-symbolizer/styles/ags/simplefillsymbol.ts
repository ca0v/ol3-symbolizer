import { ArcGisFeatureServerLayer } from "../../format/@types/ArcGisFeatureServerLayer";

let symbol = () => (<ArcGisFeatureServerLayer.Symbol>{
    "color": [
        0,
        0,
        0,
        64
    ],
    "outline": {
        "color": [
            0,
            0,
            0,
            255
        ],
        "width": 1.5,
        "type": "esriSLS",
        "style": "esriSLSDashDotDot"
    },
    "type": "esriSFS",
    "style": "esriSFSBackwardDiagonal"
});

let styles = "BackwardDiagonal,Cross,DiagonalCross,ForwardDiagonal,Horizontal,Solid,Vertical".split(",");
let symbols = styles.map(style => {
    let result = symbol();
    result.style = <any>`esriSFS${style}`;
    return result;
});

export = symbols;