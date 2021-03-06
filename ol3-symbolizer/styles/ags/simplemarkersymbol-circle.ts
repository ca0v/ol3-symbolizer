import { ArcGisFeatureServerLayer } from "../../format/ags-symbolizer";

/**
 * 
 */
const styles: ArcGisFeatureServerLayer.Symbol[] =
    [{
        "color": [
            255,
            255,
            255,
            64
        ],
        "size": 12,
        "angle": 0,
        "xoffset": 0,
        "yoffset": 0,
        "type": "esriSMS",
        "style": "esriSMSCircle",
        "outline": {
            "color": [
                0,
                0,
                0,
                255
            ],
            "width": 1,
            "type": "esriSLS",
            "style": "esriSLSSolid"
        }
    }];

export = styles;
