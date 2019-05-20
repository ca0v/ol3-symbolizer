/**
 * See https://openlayers.org/en/latest/examples/vector-esri.html
 * Ultimately this will only query for features it does not already have
 * It will make use the map SRS and the resulttype="tile" and exceededTransferLimit
 * See https://github.com/ca0v/ol3-lab/issues/4
 */

import $ = require("jquery");
import ol = require("openlayers");
import AgsCatalog = require("./ags-catalog");
import Symbolizer = require("../format/ags-symbolizer");
import { defaults } from "ol3-fun/index";

const esrijsonFormat = new ol.format.EsriJSON();

function asParam(options: any) {
    return Object
        .keys(options)
        .map(k => `${k}=${options[k]}`)
        .join("&");
}

export interface IOptions extends olx.source.VectorOptions {
    services: string;
    serviceName: string;
    serviceType: "FeatureServer" | "MapServer";
    map: ol.Map;
    layers: number[];
    tileSize?: number;
    where?: string;
    uidFieldName?: string;
};

const DEFAULT_OPTIONS = <IOptions>{
    tileSize: 512,
    where: "1=1",
};

export class ArcGisVectorSourceFactory {

    static create(options: IOptions) {

        let d = $.Deferred<ol.layer.Vector[]>();

        options = defaults(options, DEFAULT_OPTIONS);

        let srs = options.map.getView()
            .getProjection()
            .getCode()
            .split(":")
            .pop();


        let all = options.layers.map(layerId => {

            let d = $.Deferred<ol.layer.Vector>();

            let tileGrid = ol.tilegrid.createXYZ({
                tileSize: options.tileSize
            });

            let strategy = ol.loadingstrategy.tile(tileGrid);

            let loader = (extent: ol.Extent, resolution: number, projection: ol.proj.Projection) => {

                // current loading strategy isn't being clever enough?  Getting duplicates.
                // see ol.source.Vector.prototype.loadFeatures (it keeps history of extents)

                let box = {
                    xmin: extent[0],
                    ymin: extent[1],
                    xmax: extent[2],
                    ymax: extent[3]
                };

                let params = {
                    f: "json",
                    returnGeometry: true,
                    spatialRel: "esriSpatialRelIntersects",
                    geometry: encodeURIComponent(JSON.stringify(box)),
                    geometryType: "esriGeometryEnvelope",
                    resultType: "tile",
                    where: encodeURIComponent(options.where),
                    inSR: srs,
                    outSR: srs,
                    outFields: "*",
                }

                let query = `${options.services}/${options.serviceName}/${options.serviceType}/${layerId}/query?${asParam(params)}`;

                $.ajax({
                    url: query,
                    dataType: 'jsonp',
                    success: (response: {
                        error: any;
                        fields: Array<{
                            alias: string;
                            name: string;
                            type: string;
                        }>;
                    }) => {
                        if (response.error) {
                            console.warn(response.error.message + '\n' +
                                response.error.details.join('\n'));
                        } else {
                            // dataProjection will be read from document
                            var features = esrijsonFormat.readFeatures(response, {
                                featureProjection: projection,
                                dataProjection: projection
                            });
                            // if we've defined a primary key we can ignore duplicates
                            if (!options.uidFieldName && response.fields) {
                                let oidField = response.fields.filter(f => f.type === "esriFieldTypeOID")[0];
                                if (oidField) {
                                    options.uidFieldName = oidField.name;
                                }
                            }
                            if (options.uidFieldName) {
                                features = features.filter(f => !source.getFeatures().some(f => f.get(options.uidFieldName)));
                            }
                            // anything left to add?
                            if (features.length > 0) {
                                source.addFeatures(features);
                            }
                        }
                    }
                });
            };

            let source = new ol.source.Vector({
                strategy: strategy,
                loader: loader,
                wrapX: false
            });

            let catalog = new AgsCatalog.Catalog(`${options.services}/${options.serviceName}/${options.serviceType}`);
            let converter = new Symbolizer.StyleConverter();

            catalog.aboutLayer(layerId).then(layerInfo => {

                let layer = new ol.layer.Vector({
                    title: layerInfo.name,
                    source: source
                })

                let styleMap = converter.fromRenderer(<any>layerInfo.drawingInfo.renderer, { url: "for icons?" });
                layer.setStyle((feature: ol.Feature, resolution: number) => {
                    if (styleMap instanceof ol.style.Style) {
                        return styleMap;
                    } else {
                        return styleMap(feature);
                    }
                });

                d.resolve(layer);
            });

            return d;
        });

        $.when.apply($, all).then((...args: Array<ol.layer.Vector>) => d.resolve(args));

        return d;
    }

}
