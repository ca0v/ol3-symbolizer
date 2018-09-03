import ol = require("openlayers");
import { doif, getParameterByName, html as asHtml } from "ol3-fun/index";
import { ArcGisVectorSourceFactory } from "../ol3-symbolizer/ags/ags-source";

function parse<T>(v: string, type: T): T {
    if (typeof type === "string") return <any>v;
    if (typeof type === "number") return <any>parseFloat(v);
    if (typeof type === "boolean") return <any>(v === "1" || v === "true");
    if (Array.isArray(type)) {
        return <any>(v.split(",").map(v => parse(v, (<any>type)[0])));
    }
    throw `unknown type: ${type}`;
}

const html = `
<div class='popup'>
    <div class='popup-container'>
    </div>
</div>
`;

const css = `
<style name="popup" type="text/css">
    html, body, .map {
        width: 100%;
        height: 100%;
        padding: 0;
        overflow: hidden;
        margin: 0;    
    }
</style>
`;

const css_popup = `
.popup-container {
    position: absolute;
    top: 1em;
    right: 0.5em;
    width: 10em;
    bottom: 1em;
    z-index: 1;
    pointer-events: none;
}

.ol-popup {
    color: white;
    background-color: rgba(77,77,77,0.7);
    min-width: 200px;
}

.ol-popup:after {
    border-top-color: rgba(77,77,77,0.7);
}

`;

let center = {
    fire: [-117.754430386, 34.2606862490001],
    wichita: [-97.4, 37.8],
    vegas: [-115.235, 36.173]
}

export function run() {

    let target = document.getElementsByClassName("map")[0];
    target.appendChild(asHtml(html));
    document.head.appendChild(asHtml(css));

    let options = {
        srs: 'EPSG:4326',
        center: <[number, number]>center.vegas,
        zoom: 10,
        services: "//sampleserver3.arcgisonline.com/ArcGIS/rest/services",
        serviceName: "SanFrancisco/311Incidents",
        serviceType: "FeatureServer",
        where: "1=1",
        filter: <{ [name: string]: any }>{},
        layers: [0]
    }

    {
        let opts = <any>options;
        Object.keys(opts).forEach(k => {
            doif(getParameterByName(k), v => {
                let value = parse(v, opts[k]);
                if (value !== undefined) opts[k] = value;
            });
        });
    }

    let map = new ol.Map({
        target: "map",
        keyboardEventTarget: document,
        loadTilesWhileAnimating: true,
        loadTilesWhileInteracting: true,
        controls: ol.control.defaults({ attribution: false }),
        view: new ol.View({
            projection: options.srs,
            center: options.center,
            zoom: options.zoom
        }),
        layers: [
            new ol.layer.Tile(<any>{
                title: "OSM",
                type: 'base',
                opacity: 0.8,
                visible: true,
                source: new ol.source.OSM()
            })]
    });

    ArcGisVectorSourceFactory.create(<any>{
        tileSize: 256,
        map: map,
        services: options.services,
        serviceName: options.serviceName,
        serviceType: options.serviceType,
        where: options.where,
        layers: options.layers.reverse()
    }).then(agsLayers => {
        agsLayers.forEach(agsLayer => map.addLayer(agsLayer));
    });


    return map;

}