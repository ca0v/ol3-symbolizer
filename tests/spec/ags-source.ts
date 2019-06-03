import ol = require("openlayers");
import $ = require("jquery");
import { describe, it, should, shouldEqual, stringify } from "ol3-fun/tests/base";
import { ArcGisVectorSourceFactory } from "../../ol3-symbolizer/ags/ags-source";
import { mockDataZones, mockDataEmpty } from "../data/tile1";
import { debounce } from "ol3-fun/ol3-fun/common";

define("/mock/arcgis/rest/services/mockServiceName/FeatureServer/3?f=pjson&callback=define", () => {
	return {
		currentVersion: 10.51,
		id: 3,
		name: "Areas",
		parentLayerId: -1,
		defaultVisibility: true,
		minScale: 0,
		maxScale: 0,
		type: "Feature Layer",
		geometryType: "esriGeometryPolygon",
		description: "",
		copyrightText: "",
		editFieldsInfo: {
			creationDateField: "created_date",
			creatorField: "created_user",
			editDateField: "last_edited_date",
			editorField: "last_edited_user"
		},
		ownershipBasedAccessControlForFeatures: null,
		syncCanReturnChanges: false,
		relationships: [],
		isDataVersioned: false,
		supportsRollbackOnFailureParameter: true,
		archivingInfo: {
			supportsQueryWithHistoricMoment: false,
			startArchivingMoment: -1
		},
		supportsStatistics: true,
		supportsAdvancedQueries: true,
		supportsValidateSQL: true,
		supportsCalculate: true,
		advancedQueryCapabilities: {
			supportsPagination: true,
			supportsTrueCurve: true,
			supportsQueryWithDistance: true,
			supportsReturningQueryExtent: true,
			supportsStatistics: true,
			supportsOrderBy: true,
			supportsDistinct: true,
			supportsSqlExpression: true
		},
		extent: {
			xmin: -121.33638497899994,
			ymin: 36.13652435100005,
			xmax: -114.87537102399995,
			ymax: 38.60559867000006,
			spatialReference: {
				wkid: 4326,
				latestWkid: 4326
			}
		},
		drawingInfo: {
			renderer: {
				type: "uniqueValue",
				field1: "H8REGION",
				field2: null,
				field3: null,
				defaultSymbol: {
					type: "esriSFS",
					style: "esriSFSSolid",
					color: [201, 242, 208, 255],
					outline: {
						type: "esriSLS",
						style: "esriSLSSolid",
						color: [110, 110, 110, 255],
						width: 0.4
					}
				},
				defaultLabel: "<all other values>",
				uniqueValueInfos: [
					{
						symbol: {
							type: "esriSFS",
							style: "esriSFSSolid",
							color: [179, 244, 252, 255],
							outline: {
								type: "esriSLS",
								style: "esriSLSSolid",
								color: [110, 110, 110, 255],
								width: 0.4
							}
						},
						value: "<Null>",
						label: "<Null>",
						description: ""
					},
					{
						symbol: {
							type: "esriSFS",
							style: "esriSFSSolid",
							color: [252, 220, 204, 255],
							outline: {
								type: "esriSLS",
								style: "esriSLSSolid",
								color: [115, 38, 0, 255],
								width: 0.4
							}
						},
						value: "",
						label: "",
						description: ""
					},
					{
						symbol: {
							type: "esriSFS",
							style: "esriSFSSolid",
							color: [220, 215, 252, 255],
							outline: {
								type: "esriSLS",
								style: "esriSLSSolid",
								color: [110, 110, 110, 255],
								width: 0.4
							}
						},
						value: "Construction Zone",
						label: "Construction Zone",
						description: ""
					},
					{
						symbol: {
							type: "esriSFS",
							style: "esriSFSSolid",
							color: [255, 255, 115, 255],
							outline: {
								type: "esriSLS",
								style: "esriSLSSolid",
								color: [115, 0, 0, 255],
								width: 0.4
							}
						},
						value: "Demolition",
						label: "Demolition",
						description: ""
					},
					{
						symbol: {
							type: "esriSFS",
							style: "esriSFSSolid",
							color: [211, 255, 190, 255],
							outline: {
								type: "esriSLS",
								style: "esriSLSSolid",
								color: [0, 0, 0, 255],
								width: 0.4
							}
						},
						value: "GREEN",
						label: "GREEN",
						description: ""
					}
				],
				fieldDelimiter: ","
			},
			transparency: 0,
			labelingInfo: null
		},
		hasM: false,
		hasZ: false,
		allowGeometryUpdates: true,
		allowTrueCurvesUpdates: false,
		onlyAllowTrueCurveUpdatesByTrueCurveClients: true,
		hasAttachments: false,
		supportsApplyEditsWithGlobalIds: false,
		htmlPopupType: "esriServerHTMLPopupTypeAsHTMLText",
		objectIdField: "OBJECTID",
		globalIdField: "",
		displayField: "H8MONIKER",
		typeIdField: "H8REGION",
		subtypeField: "",
		fields: [
			{
				name: "OBJECTID",
				type: "esriFieldTypeOID",
				alias: "OBJECTID",
				domain: null,
				editable: false,
				nullable: false
			},
			{
				name: "H8KEY",
				type: "esriFieldTypeInteger",
				alias: "Hansen Key",
				domain: null,
				editable: true,
				nullable: true
			},
			{
				name: "RuleID",
				type: "esriFieldTypeInteger",
				alias: "RuleID",
				domain: null,
				editable: true,
				nullable: true
			},
			{
				name: "H8EXPDATE",
				type: "esriFieldTypeDate",
				alias: "Expiration",
				domain: null,
				editable: true,
				nullable: true,
				length: 8
			},
			{
				name: "H8MONIKER",
				type: "esriFieldTypeString",
				alias: "H8MONIKER",
				domain: null,
				editable: true,
				nullable: true,
				length: 50
			},
			{
				name: "H8DESCRIPTION",
				type: "esriFieldTypeString",
				alias: "H8DESCRIPTION",
				domain: null,
				editable: true,
				nullable: true,
				length: 50
			},
			{
				name: "H8STATUS",
				type: "esriFieldTypeSmallInteger",
				alias: "H8STATUS",
				domain: null,
				editable: true,
				nullable: true
			},
			{
				name: "H8SUBTYPE",
				type: "esriFieldTypeString",
				alias: "H8SUBTYPE",
				domain: null,
				editable: true,
				nullable: true,
				length: 50
			},
			{
				name: "H8COMMENT",
				type: "esriFieldTypeString",
				alias: "H8COMMENT",
				domain: null,
				editable: true,
				nullable: true,
				length: 256
			},
			{
				name: "H8REGION",
				type: "esriFieldTypeString",
				alias: "H8REGION",
				domain: null,
				editable: true,
				nullable: true,
				length: 50
			},
			{
				name: "H8FLAG",
				type: "esriFieldTypeInteger",
				alias: "Flags",
				domain: null,
				editable: true,
				nullable: true
			},
			{
				name: "created_user",
				type: "esriFieldTypeString",
				alias: "created_user",
				domain: null,
				editable: false,
				nullable: true,
				length: 255
			},
			{
				name: "created_date",
				type: "esriFieldTypeDate",
				alias: "created_date",
				domain: null,
				editable: false,
				nullable: true,
				length: 8
			},
			{
				name: "last_edited_user",
				type: "esriFieldTypeString",
				alias: "last_edited_user",
				domain: null,
				editable: false,
				nullable: true,
				length: 255
			},
			{
				name: "last_edited_date",
				type: "esriFieldTypeDate",
				alias: "last_edited_date",
				domain: null,
				editable: false,
				nullable: true,
				length: 8
			},
			{
				name: "STATUS",
				type: "esriFieldTypeSmallInteger",
				alias: "STATUS",
				domain: {
					type: "codedValue",
					name: "AnnotationStatus",
					codedValues: [
						{
							name: "Placed",
							code: 0
						},
						{
							name: "Unplaced",
							code: 1
						},
						{
							name: "Expired",
							code: 2
						}
					],
					mergePolicy: "esriMPTDefaultValue",
					splitPolicy: "esriSPTDuplicate"
				},
				editable: true,
				nullable: true
			},
			{
				name: "EXPIRED",
				type: "esriFieldTypeSmallInteger",
				alias: "EXPIRED",
				domain: {
					type: "range",
					name: "ExpireDaysType",
					range: [1, 120],
					mergePolicy: "esriMPTDefaultValue",
					splitPolicy: "esriSPTDefaultValue"
				},
				editable: true,
				nullable: true
			},
			{
				name: "H8MONIK2",
				type: "esriFieldTypeString",
				alias: "H8MONIK2",
				domain: null,
				editable: true,
				nullable: true,
				length: 160
			}
		],
		indexes: [
			{
				name: "R35_pk",
				fields: "OBJECTID",
				isAscending: true,
				isUnique: true,
				description: ""
			},
			{
				name: "S30_idx",
				fields: "SHAPE",
				isAscending: true,
				isUnique: true,
				description: ""
			}
		],
		dateFieldsTimeReference: {
			timeZone: "UTC",
			respectsDaylightSaving: false
		},
		types: [
			{
				id: null,
				name: "<Null>",
				domains: {
					STATUS: { type: "inherited" },
					EXPIRED: { type: "inherited" }
				},
				templates: [
					{
						name: "<Null>",
						description: "",
						prototype: {
							attributes: {
								EXPIRED: null,
								H8MONIK2: null,
								H8KEY: null,
								RuleID: null,
								H8EXPDATE: null,
								H8MONIKER: null,
								H8DESCRIPTION: null,
								H8STATUS: null,
								H8SUBTYPE: null,
								H8COMMENT: null,
								H8REGION: null,
								H8FLAG: null,
								STATUS: null
							}
						},
						drawingTool: "esriFeatureEditToolPolygon"
					}
				]
			},
			{
				id: "",
				name: "",
				domains: {
					STATUS: { type: "inherited" },
					EXPIRED: { type: "inherited" }
				},
				templates: [
					{
						name: "",
						description: "",
						prototype: {
							attributes: {
								EXPIRED: null,
								H8MONIK2: null,
								H8KEY: null,
								RuleID: null,
								H8EXPDATE: null,
								H8MONIKER: null,
								H8DESCRIPTION: null,
								H8STATUS: null,
								H8SUBTYPE: null,
								H8COMMENT: null,
								H8REGION: "",
								H8FLAG: null,
								STATUS: null
							}
						},
						drawingTool: "esriFeatureEditToolPolygon"
					}
				]
			},
			{
				id: "Construction Zone",
				name: "Construction Zone",
				domains: {
					STATUS: { type: "inherited" },
					EXPIRED: { type: "inherited" }
				},
				templates: [
					{
						name: "Construction Zone",
						description: "",
						prototype: {
							attributes: {
								EXPIRED: null,
								H8MONIK2: null,
								H8KEY: null,
								RuleID: null,
								H8EXPDATE: null,
								H8MONIKER: null,
								H8DESCRIPTION: null,
								H8STATUS: null,
								H8SUBTYPE: null,
								H8COMMENT: null,
								H8REGION: "Construction Zone",
								H8FLAG: null,
								STATUS: null
							}
						},
						drawingTool: "esriFeatureEditToolPolygon"
					}
				]
			},
			{
				id: "Demolition",
				name: "Demolition",
				domains: {
					STATUS: { type: "inherited" },
					EXPIRED: { type: "inherited" }
				},
				templates: [
					{
						name: "Demolition",
						description: "",
						prototype: {
							attributes: {
								EXPIRED: null,
								H8MONIK2: null,
								H8KEY: null,
								RuleID: null,
								H8EXPDATE: null,
								H8MONIKER: null,
								H8DESCRIPTION: null,
								H8STATUS: null,
								H8SUBTYPE: null,
								H8COMMENT: null,
								H8REGION: "Demolition",
								H8FLAG: null,
								STATUS: null
							}
						},
						drawingTool: "esriFeatureEditToolPolygon"
					}
				]
			},
			{
				id: "GREEN",
				name: "GREEN",
				domains: {
					STATUS: { type: "inherited" },
					EXPIRED: { type: "inherited" }
				},
				templates: [
					{
						name: "GREEN",
						description: "",
						prototype: {
							attributes: {
								EXPIRED: null,
								H8MONIK2: null,
								H8KEY: null,
								RuleID: null,
								H8EXPDATE: null,
								H8MONIKER: null,
								H8DESCRIPTION: null,
								H8STATUS: null,
								H8SUBTYPE: null,
								H8COMMENT: null,
								H8REGION: "GREEN",
								H8FLAG: null,
								STATUS: null
							}
						},
						drawingTool: "esriFeatureEditToolPolygon"
					}
				]
			}
		],
		templates: [],
		maxRecordCount: 1000,
		supportedQueryFormats: "JSON, AMF, geoJSON",
		capabilities: "Query,Create,Update,Delete,Uploads,Editing",
		useStandardizedQueries: true
	};
});

// 1st attempt at mocking $.ajax -- to be moved to ol-fun if it works
function mock(args: { respond: (data: any) => any }) {
	let original = $.ajax;

	$.ajax = (url: string | JQuery.AjaxSettings, settings?: JQuery.AjaxSettings) => {
		if (typeof url !== "string") {
			settings = url;
		}
		let response = args.respond({ url, settings });
		let d = $.Deferred();
		d.resolve(response);
		(<any>settings.success)(response);
		return <JQuery.jqXHR>d.promise();
	};

	return () => {
		$.ajax = original;
	};
}

describe("ags-source tests", () => {
	it("ArcGisVectorSourceFactory", done => {
		// attempting to create a mock map
		let source = new ol.source.TileDebug({
			projection: "EPSG:3857",
			tileGrid: ol.tilegrid.createXYZ({
				tileSize: 256
			})
		});

		let map = new ol.Map({
			target: "map",
			layers: [
				new ol.layer.Tile({
					source: source
				})
			],
			view: new ol.View({
				center: [-12826838, 4326274],
				zoom: 5,
				projection: "EPSG:3857"
			})
		});

		// setup a mock response
		let unmock = mock({
			respond: data => {
				switch (data.url.url) {
					case `/mock/arcgis/rest/services/mockServiceName/FeatureServer/3/query?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=%7B%22xmin%22%3A-14294335.785554241%2C%22ymin%22%3A2504688.542848654%2C%22xmax%22%3A-11789647.242705585%2C%22ymax%22%3A5009377.08569731%7D&geometryType=esriGeometryEnvelope&resultType=tile&where=H8REGION%20IN%20('GREEN')&inSR=3857&outSR=3857&outFields=*`:
						return mockDataZones;
					case `/mock/arcgis/rest/services/mockServiceName/FeatureServer/3/query?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=%7B%22xmin%22%3A-14294335.785554241%2C%22ymin%22%3A5009377.085697312%2C%22xmax%22%3A-11789647.242705585%2C%22ymax%22%3A7514065.628545968%7D&geometryType=esriGeometryEnvelope&resultType=tile&where=H8REGION%20IN%20('GREEN')&inSR=3857&outSR=3857&outFields=*`:
						return mockDataEmpty;
					case `/mock/arcgis/rest/services/mockServiceName/FeatureServer/3/query?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=%7B%22xmin%22%3A-11789647.242705585%2C%22ymin%22%3A2504688.542848654%2C%22xmax%22%3A-9284958.69985693%2C%22ymax%22%3A5009377.08569731%7D&geometryType=esriGeometryEnvelope&resultType=tile&where=H8REGION%20IN%20('GREEN')&inSR=3857&outSR=3857&outFields=*`:
						return mockDataEmpty;
					case `/mock/arcgis/rest/services/mockServiceName/FeatureServer/3/query?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=%7B%22xmin%22%3A-11789647.242705585%2C%22ymin%22%3A5009377.085697312%2C%22xmax%22%3A-9284958.69985693%2C%22ymax%22%3A7514065.628545968%7D&geometryType=esriGeometryEnvelope&resultType=tile&where=H8REGION%20IN%20('GREEN')&inSR=3857&outSR=3857&outFields=*`:
						return mockDataZones;
					default:
						console.log(`unexpected request: ${data.url.url}`);
						return mockDataEmpty;
				}
			}
		});

		ArcGisVectorSourceFactory.create({
			services: "/mock/arcgis/rest/services",
			serviceName: "mockServiceName",
			serviceType: "FeatureServer",
			map: map,
			layers: [3],
			where: "H8REGION IN ('GREEN')"
			// etc
		}).done(layers => {
			layers.forEach(l => {
				let source = l.getSource();
				source.on(
					"change",
					debounce(() => {
						let features = source.getFeatures(); //.filter(f => f.get("H8REGION") === "GREEN");
						shouldEqual(3, features.length);
						let ids = new Set(features.map(f => f.get("OBJECTID")));
						shouldEqual(3, ids.size);
						unmock();
						done();
					})
				);
			});
			layers.forEach(l => map.addLayer(l));
		});
	});
});
