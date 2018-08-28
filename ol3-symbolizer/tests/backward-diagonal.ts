import ol = require("openlayers");
import { StyleConverter } from "../format/ags-symbolizer";
import { StyleConverter as InverseConverter } from "../format/ol3-symbolizer";
import { FeatureLayerInfo } from "../ags/@types/cataloginfo";

/**
 * Converts an AGS symbol encoded as a backward diagonal to an openlayer style
 */

let agsZones = <FeatureLayerInfo><any>{
    "currentVersion": 10.31,
    "id": 6,
    "name": "Overlay Zones",
    "type": "Feature Layer",
    "description": "",
    "geometryType": "esriGeometryPolygon",
    "copyrightText": "",
    "parentLayer": null,
    "subLayers": [],
    "minScale": 0,
    "maxScale": 0,
    "drawingInfo": {
        "renderer": {
            "type": "uniqueValue",
            "field1": "PLANZONE",
            "field2": null,
            "field3": null,
            "fieldDelimiter": ", ",
            "defaultSymbol": null,
            "defaultLabel": null,
            "uniqueValueInfos": [
                {
                    "symbol": {
                        "type": "esriSFS",
                        "style": "esriSFSForwardDiagonal",
                        "color": [
                            0,
                            255,
                            0,
                            255
                        ],
                        "outline": {
                            "type": "esriSLS",
                            "style": "esriSLSSolid",
                            "color": [
                                0,
                                255,
                                0,
                                255
                            ],
                            "width": 0.4
                        }
                    },
                    "value": "AO-1",
                    "label": "AO-1",
                    "description": ""
                },
                {
                    "symbol": {
                        "type": "esriSFS",
                        "style": "esriSFSBackwardDiagonal",
                        "color": [
                            0,
                            129,
                            254,
                            255
                        ],
                        "outline": {
                            "type": "esriSLS",
                            "style": "esriSLSSolid",
                            "color": [
                                0,
                                129,
                                254,
                                255
                            ],
                            "width": 0.4
                        }
                    },
                    "value": "AO-2",
                    "label": "AO-2",
                    "description": ""
                },
                {
                    "symbol": {
                        "type": "esriPFS",
                        "url": "78ff6f6cb8ad6ca6d96eed86217d46ca",
                        "imageData": "iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAyRJREFUaIG1WkGSAyEIJFX+JP9/Ut6SvaxVhkDTDYZTZkREBBqcrJfZ2/7pafYwQJu34rsxl+Wv9F/nSy/UP3cM8DJ7P80ep0wvJ1JSMSLiXYhR3VDEz8h8mj3OTfo1IoOxOi40qJ6o4lasMRWjb7mnHnCD6okid0dyog13KIxBvxBiVniRW53zz/hk5Veecr6HMYgUrDZQyVW8QZ170mLiJovBbMEbLqd4E1p3KYqwp8bAQKTcOc7Ec5VRX2bvFTEzJzDFKQVjWUNG4yti7gS96pJdF64SlueHMOEVysBY2XCmIOs9asIKNxgBZiWIXbBS8IZ3lEBfbagqnyp+ZozJ7tncDxxEGSqawDwr9aKSQJis6Q2fwgTjFiwuMnMYUjP7h4uiQI+K7qjEUoqGjCp3jvRA8ymYYF2SPfWuARhP+apkKoUYJZUkwcTWTYIwkT0zqZztRjrdBJJJnWCkrFp7KjDCyIyIkbtYS01qzypW1D40w+mw2FYBGI13ryymhTuiECYyQVXcsAlkgrEKb9pNqIsw8YlkMTcGSBbCRQkmJlUPcudOhcLqkbpopXingL4hO+PPZFI4yCqIbrYrBdmkox6E1NFPTgXJmmTRCnOhi7LVhoqf0yyK9NpFyf4Nrw0rnPtF/agU7hl9nKCSKDqB7+d1ugnmSjGb2+omvKI3jHGrhdry9ljqop1KhlFYqYD22KRIaN9so/eTyieSMWkCwq9LVSqe0sQALK7u39TXJcY1bt58T07M80AcREoqbslkxsk9KFWqVVZXwJnh72TdqpuI9GnXolNoUGV31klhgom5bt0ZvWNld5IdDRPd01GTgid0B7PHvZzy44ufzKblW8aqNlXJCrNoR1G0yOQbxE2i/+mk3qJN4gitqxYB1L8sGEW6c9SMiWrTEAd/ETdKtvuFYdMk0/keEPGrMckahOVLkwxSUF1M6f5Zt1WLj69KBgWvH+9mx5udCVMfUx1950Qnm7gZv2EWvfm568bGfXevyAizKJsIuteGjOxMhtpO0ZUM8+6XN2kMwX4QKTyNCRXcWWLkSBe/XjjLq8id8vhN/wHAM/YoQRgDtgAAAABJRU5ErkJggg==",
                        "contentType": "image/png",
                        "outline": {
                            "type": "esriSLS",
                            "style": "esriSLSSolid",
                            "color": [
                                255,
                                0,
                                0,
                                255
                            ],
                            "width": 1
                        },
                        "width": 42,
                        "height": 42,
                        "angle": 0,
                        "xoffset": 0,
                        "yoffset": 0,
                        "xscale": 1,
                        "yscale": 1
                    },
                    "value": "AO-3",
                    "label": "AO-3",
                    "description": ""
                },
                {
                    "symbol": {
                        "type": "esriSFS",
                        "style": "esriSFSForwardDiagonal",
                        "color": [
                            0,
                            208,
                            219,
                            255
                        ],
                        "outline": {
                            "type": "esriSLS",
                            "style": "esriSLSSolid",
                            "color": [
                                0,
                                112,
                                255,
                                255
                            ],
                            "width": 1
                        }
                    },
                    "value": "L",
                    "label": "L",
                    "description": ""
                },
                {
                    "symbol": {
                        "type": "esriSFS",
                        "style": "esriSFSBackwardDiagonal",
                        "color": [
                            0,
                            208,
                            219,
                            255
                        ],
                        "outline": {
                            "type": "esriSLS",
                            "style": "esriSLSSolid",
                            "color": [
                                115,
                                255,
                                223,
                                255
                            ],
                            "width": 1
                        }
                    },
                    "value": "UCD 1",
                    "label": "UC",
                    "description": ""
                },
                {
                    "symbol": {
                        "type": "esriSFS",
                        "style": "esriSFSBackwardDiagonal",
                        "color": [
                            0,
                            208,
                            219,
                            255
                        ],
                        "outline": {
                            "type": "esriSLS",
                            "style": "esriSLSSolid",
                            "color": [
                                115,
                                255,
                                223,
                                255
                            ],
                            "width": 1
                        }
                    },
                    "value": "UCD 1 E",
                    "label": "UC",
                    "description": ""
                },
                {
                    "symbol": {
                        "type": "esriSFS",
                        "style": "esriSFSBackwardDiagonal",
                        "color": [
                            0,
                            208,
                            219,
                            255
                        ],
                        "outline": {
                            "type": "esriSLS",
                            "style": "esriSLSSolid",
                            "color": [
                                115,
                                255,
                                223,
                                255
                            ],
                            "width": 1
                        }
                    },
                    "value": "UCD 1 W",
                    "label": "UC",
                    "description": ""
                },
                {
                    "symbol": {
                        "type": "esriSFS",
                        "style": "esriSFSBackwardDiagonal",
                        "color": [
                            0,
                            208,
                            219,
                            255
                        ],
                        "outline": {
                            "type": "esriSLS",
                            "style": "esriSLSSolid",
                            "color": [
                                115,
                                255,
                                223,
                                255
                            ],
                            "width": 1
                        }
                    },
                    "value": "UCD 2",
                    "label": "UC",
                    "description": ""
                },
                {
                    "symbol": {
                        "type": "esriSFS",
                        "style": "esriSFSBackwardDiagonal",
                        "color": [
                            0,
                            208,
                            219,
                            255
                        ],
                        "outline": {
                            "type": "esriSLS",
                            "style": "esriSLSSolid",
                            "color": [
                                115,
                                255,
                                223,
                                255
                            ],
                            "width": 1
                        }
                    },
                    "value": "UCD 2 A",
                    "label": "UC",
                    "description": ""
                },
                {
                    "symbol": {
                        "type": "esriSFS",
                        "style": "esriSFSBackwardDiagonal",
                        "color": [
                            0,
                            208,
                            219,
                            255
                        ],
                        "outline": {
                            "type": "esriSLS",
                            "style": "esriSLSSolid",
                            "color": [
                                115,
                                255,
                                223,
                                255
                            ],
                            "width": 1
                        }
                    },
                    "value": "UCD 2 B",
                    "label": "UC",
                    "description": ""
                },
                {
                    "symbol": {
                        "type": "esriSFS",
                        "style": "esriSFSBackwardDiagonal",
                        "color": [
                            0,
                            208,
                            219,
                            255
                        ],
                        "outline": {
                            "type": "esriSLS",
                            "style": "esriSLSSolid",
                            "color": [
                                115,
                                255,
                                223,
                                255
                            ],
                            "width": 1
                        }
                    },
                    "value": "UCD 2 C",
                    "label": "UC",
                    "description": ""
                },
                {
                    "symbol": {
                        "type": "esriSFS",
                        "style": "esriSFSBackwardDiagonal",
                        "color": [
                            0,
                            208,
                            219,
                            255
                        ],
                        "outline": {
                            "type": "esriSLS",
                            "style": "esriSLSSolid",
                            "color": [
                                115,
                                255,
                                223,
                                255
                            ],
                            "width": 1
                        }
                    },
                    "value": "UCD 2 D",
                    "label": "UC",
                    "description": ""
                },
                {
                    "symbol": {
                        "type": "esriSFS",
                        "style": "esriSFSBackwardDiagonal",
                        "color": [
                            0,
                            208,
                            219,
                            255
                        ],
                        "outline": {
                            "type": "esriSLS",
                            "style": "esriSLSSolid",
                            "color": [
                                115,
                                255,
                                223,
                                255
                            ],
                            "width": 1
                        }
                    },
                    "value": "UCD 2 E",
                    "label": "UC",
                    "description": ""
                },
                {
                    "symbol": {
                        "type": "esriSFS",
                        "style": "esriSFSBackwardDiagonal",
                        "color": [
                            0,
                            208,
                            219,
                            255
                        ],
                        "outline": {
                            "type": "esriSLS",
                            "style": "esriSLSSolid",
                            "color": [
                                115,
                                255,
                                223,
                                255
                            ],
                            "width": 1
                        }
                    },
                    "value": "UCD 2 F",
                    "label": "UC",
                    "description": ""
                },
                {
                    "symbol": {
                        "type": "esriSFS",
                        "style": "esriSFSBackwardDiagonal",
                        "color": [
                            0,
                            208,
                            219,
                            255
                        ],
                        "outline": {
                            "type": "esriSLS",
                            "style": "esriSLSSolid",
                            "color": [
                                115,
                                255,
                                223,
                                255
                            ],
                            "width": 1
                        }
                    },
                    "value": "UCD 3",
                    "label": "UC",
                    "description": ""
                },
                {
                    "symbol": {
                        "type": "esriSFS",
                        "style": "esriSFSBackwardDiagonal",
                        "color": [
                            0,
                            208,
                            219,
                            255
                        ],
                        "outline": {
                            "type": "esriSLS",
                            "style": "esriSLSSolid",
                            "color": [
                                115,
                                255,
                                223,
                                255
                            ],
                            "width": 1
                        }
                    },
                    "value": "UCD 3 A",
                    "label": "UC",
                    "description": ""
                },
                {
                    "symbol": {
                        "type": "esriSFS",
                        "style": "esriSFSBackwardDiagonal",
                        "color": [
                            0,
                            208,
                            219,
                            255
                        ],
                        "outline": {
                            "type": "esriSLS",
                            "style": "esriSLSSolid",
                            "color": [
                                115,
                                255,
                                223,
                                255
                            ],
                            "width": 1
                        }
                    },
                    "value": "UCD 3 B",
                    "label": "UC",
                    "description": ""
                },
                {
                    "symbol": {
                        "type": "esriSFS",
                        "style": "esriSFSBackwardDiagonal",
                        "color": [
                            0,
                            208,
                            219,
                            255
                        ],
                        "outline": {
                            "type": "esriSLS",
                            "style": "esriSLSSolid",
                            "color": [
                                115,
                                255,
                                223,
                                255
                            ],
                            "width": 1
                        }
                    },
                    "value": "UCD 3 C",
                    "label": "UC",
                    "description": ""
                },
                {
                    "symbol": {
                        "type": "esriSFS",
                        "style": "esriSFSBackwardDiagonal",
                        "color": [
                            0,
                            208,
                            219,
                            255
                        ],
                        "outline": {
                            "type": "esriSLS",
                            "style": "esriSLSSolid",
                            "color": [
                                115,
                                255,
                                223,
                                255
                            ],
                            "width": 1
                        }
                    },
                    "value": "UCD 4",
                    "label": "UC",
                    "description": ""
                },
                {
                    "symbol": {
                        "type": "esriSFS",
                        "style": "esriSFSForwardDiagonal",
                        "color": [
                            0,
                            208,
                            219,
                            255
                        ],
                        "outline": {
                            "type": "esriSLS",
                            "style": "esriSLSSolid",
                            "color": [
                                0,
                                230,
                                169,
                                255
                            ],
                            "width": 1
                        }
                    },
                    "value": "UN",
                    "label": "UN",
                    "description": ""
                }
            ]
        },
        "transparency": 0,
        "labelingInfo": null
    },
    "defaultVisibility": true,
    "extent": {
        "xmin": 1374524.3392499983,
        "ymin": 494286.04200000316,
        "xmax": 1418161.7010000013,
        "ymax": 525857.6349999979,
        "spatialReference": {
            "wkid": 102697,
            "latestWkid": 102697
        }
    },
    "hasAttachments": false,
    "htmlPopupType": "esriServerHTMLPopupTypeNone",
    "displayField": "PLANZONE",
    "typeIdField": null,
    "fields": [
        {
            "name": "OBJECTID",
            "type": "esriFieldTypeOID",
            "alias": "OBJECTID",
            "domain": null
        },
        {
            "name": "PLANZONE",
            "type": "esriFieldTypeString",
            "alias": "Overlay Zoning District",
            "length": 8,
            "domain": {
                "type": "codedValue",
                "name": "ZoningDistricts_3",
                "codedValues": [
                    {
                        "name": "Single-Family Residential",
                        "code": "R-SF"
                    },
                    {
                        "name": "Townhouse Residential",
                        "code": "R-TH"
                    },
                    {
                        "name": "Low-Density Multi-Family Residential",
                        "code": "R-LD"
                    },
                    {
                        "name": "Medium-Density Multi-Family Residential",
                        "code": "R-MD"
                    },
                    {
                        "name": "High-Density Multi-Family Residential",
                        "code": "R-HD"
                    },
                    {
                        "name": "Manufactured Home Community",
                        "code": "R-MHC"
                    },
                    {
                        "name": "Government and Institutional",
                        "code": "GI"
                    },
                    {
                        "name": "Planned Development",
                        "code": "PD"
                    },
                    {
                        "name": "Limited Business",
                        "code": "LB"
                    },
                    {
                        "name": "General Retail",
                        "code": "GR"
                    },
                    {
                        "name": "Highway Commercial",
                        "code": "HC"
                    },
                    {
                        "name": "Commercial Service",
                        "code": "CS"
                    },
                    {
                        "name": "Center City",
                        "code": "CC"
                    },
                    {
                        "name": "Restricted Industrial",
                        "code": "RI"
                    },
                    {
                        "name": "Light Industrial",
                        "code": "LI"
                    },
                    {
                        "name": "General Manufacturing",
                        "code": "GM"
                    },
                    {
                        "name": "Heavy Manufacturing",
                        "code": "HM"
                    },
                    {
                        "name": "Industrial Commercial",
                        "code": "IC"
                    },
                    {
                        "name": "University Combining",
                        "code": "UN"
                    },
                    {
                        "name": "Urban Conservation",
                        "code": "UC"
                    },
                    {
                        "name": "Landmarks",
                        "code": "L"
                    },
                    {
                        "name": "Airport Overlay District-1",
                        "code": "AO-1"
                    },
                    {
                        "name": "Airport Overlay District-2",
                        "code": "AO-2"
                    },
                    {
                        "name": "Airport Overlay District-3",
                        "code": "AO-3"
                    },
                    {
                        "name": "Office (O-1)",
                        "code": "O-1"
                    },
                    {
                        "name": "Office (O-2)",
                        "code": "O-2"
                    },
                    {
                        "name": "Agriculture",
                        "code": "CNTY-A-1"
                    },
                    {
                        "name": "Agriculture-Residence",
                        "code": "CNTY-A-R"
                    },
                    {
                        "name": "Suburban Residence",
                        "code": "CNTY-R-1"
                    },
                    {
                        "name": "One and Two Family Residence",
                        "code": "CNTY-R-2"
                    },
                    {
                        "name": "Multi-Family Residence (R-3)",
                        "code": "CNTY-R-3"
                    },
                    {
                        "name": "Multi-Family Residence (R-4)",
                        "code": "CNTY-R-4"
                    },
                    {
                        "name": "Professional Office",
                        "code": "CNTY-O-1"
                    },
                    {
                        "name": "General Office",
                        "code": "CNTY-O-2"
                    },
                    {
                        "name": "Neighborhood Commercial",
                        "code": "CNTY-C-1"
                    },
                    {
                        "name": "General Commercial",
                        "code": "CNTY-C-2"
                    },
                    {
                        "name": "Rural Commercial",
                        "code": "CNTY-C-3"
                    },
                    {
                        "name": "Light Manufacturing or Industrial",
                        "code": "CNTY-M-1"
                    },
                    {
                        "name": "General Manufacturing or Industrial",
                        "code": "CNTY-M-2"
                    },
                    {
                        "name": "Plot Assignment District",
                        "code": "CNTY-PAD"
                    },
                    {
                        "name": "No Designation",
                        "code": "NONE"
                    },
                    {
                        "name": "Conditional Overlay District",
                        "code": "COD"
                    },
                    {
                        "name": "Manufactured Home Park or Subdivision",
                        "code": "CNTY-MH1"
                    },
                    {
                        "name": "Commercial Street Zone 1",
                        "code": "COM-1"
                    },
                    {
                        "name": "Commercial Street Zone 2",
                        "code": "COM-2"
                    }
                ]
            }
        },
        {
            "name": "Shape",
            "type": "esriFieldTypeGeometry",
            "alias": "Shape",
            "domain": null
        },
        {
            "name": "SHAPE_STArea__",
            "type": "esriFieldTypeDouble",
            "alias": "SHAPE_STArea__",
            "domain": null
        },
        {
            "name": "SHAPE_STLength__",
            "type": "esriFieldTypeDouble",
            "alias": "SHAPE_STLength__",
            "domain": null
        },
        {
            "name": "Shape.STArea()",
            "type": "esriFieldTypeDouble",
            "alias": "Shape.STArea()",
            "domain": null
        },
        {
            "name": "Shape.STLength()",
            "type": "esriFieldTypeDouble",
            "alias": "Shape.STLength()",
            "domain": null
        }
    ],
    "relationships": [],
    "canModifyLayer": false,
    "canScaleSymbols": false,
    "hasLabels": false,
    "capabilities": "Map,Query,Data",
    "maxRecordCount": 1000,
    "supportsStatistics": true,
    "supportsAdvancedQueries": true,
    "supportedQueryFormats": "JSON, AMF",
    "ownershipBasedAccessControlForFeatures": {
        "allowOthersToQuery": true
    },
    "advancedQueryCapabilities": {
        "useStandardizedQueries": false,
        "supportsStatistics": true,
        "supportsOrderBy": true,
        "supportsDistinct": true,
        "supportsPagination": false,
        "supportsTrueCurve": true,
        "supportsReturningQueryExtent": true,
        "supportsQueryWithDistance": true
    }
};

/**
"symbol": {
    "type": "esriSFS",
    "style": "esriSFSForwardDiagonal",
    "color": [0,255,0,255],
    "outline": {
        "type": "esriSLS",
        "style": "esriSLSSolid",
        "color": [0,255,0,255],
        "width": 0.4
    }
},

=> 

{
	"fill": {
		"pattern": {
			"color": "rgba(0,129,254,1)",
			"orientation": "backward",
			"spacing": 3,
			"repitition": "repeat"
		}
	},
	"stroke": {
		"color": "rgba(0,129,254,1)",
		"width": 0.5333333333333333
	}
}
 */
function convertBackwardDiagonal() {
    let converter = new StyleConverter();
    let inverse = new InverseConverter();

    let sfsBackwardDiagonals = agsZones.drawingInfo.renderer.uniqueValueInfos
        .filter(vi => vi.symbol.type === "esriSFS" && vi.symbol.style === "esriSFSBackwardDiagonal");

    sfsBackwardDiagonals.forEach(symbolInfo => {
        console.log(`testing: ${symbolInfo.label}='${symbolInfo.value}'`);

        let sy = symbolInfo.symbol;

        let olStyle = converter.fromJson(sy);
        let style = inverse.toJson(olStyle);
        console.assert(style.fill.pattern.orientation === "backward", "backward orientation");
        sy.color && console.assert(!!style.fill.pattern.color, "color defined");
        if (sy.outline) {
            switch (sy.outline.type) {
                case "esriSLS":
                    console.assert(3 * style.stroke.width === 4 * sy.outline.width);
                    break;
            }
        }
    });

}

export function run() {
    convertBackwardDiagonal();
}