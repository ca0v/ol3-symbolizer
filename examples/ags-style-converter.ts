/**
 * Render a style created from converting an ags symbol to an ol symbol
 */

import ol = require("openlayers");
import $ = require("jquery");
import Snapshot = require("ol3-fun/ol3-fun/snapshot");
import { getParameterByName } from "ol3-fun/index";
import { StyleConverter } from "../ol3-symbolizer/format/ol3-symbolizer";
import pointStyle = require("./styles/icon/png");
import { Format } from "../ol3-symbolizer/format/@types/formats";

const html = `
<div class='style-to-canvas'>
    <h3>Renders a feature on a canvas</h3>
    <div class="area">
        <label>256 x 256 Canvas</label>
        <div id='canvas-collection'></div>
    </div>
    <div class="area">
        <label>AGS Json Symbol</label>
        <textarea class='style'>
        </textarea>
        <button class="save">Save</button>
    </div>
</div>
`;

const css = `
<style>
    #map {
        display: none;
    }

    .style-to-canvas {
    }

    .style-to-canvas .area label {
        display: block;
        vertical-align: top;
    }

    .style-to-canvas .area {
        border: 1px solid black;
        padding: 20px;
        margin: 20px;
    }

    .style-to-canvas .area .style {
        width: 100%;
        height: 400px;
    }

    .style-to-canvas #canvas-collection canvas {
        font-family: sans serif;
        font-size: 20px;
        border: 1px solid black;
        padding: 20px;
        margin: 20px;
    }
    
</style>
`;

const svg = `
<div style='display:none'>
<svg xmlns="http://www.w3.org/2000/svg">
<symbol viewBox="5 0 20 15" id="lock">
    <title>lock</title>
    <path d="M10.9,11.6c-0.3-0.6-0.3-2.3,0-2.8c0.4-0.6,3.4,1.4,3.4,1.4c0.9,0.4,0.9-6.1,0-5.7
	c0,0-3.1,2.1-3.4,1.4c-0.3-0.7-0.3-2.1,0-2.8C11.2,2.5,15,2.4,15,2.4C15,1.7,12.1,1,10.9,1S8.4,1.1,6.8,1.8C5.2,2.4,3.9,3.4,2.7,4.6
	S0,8.2,0,8.9s1.5,2.8,3.7,3.7s3.3,1.1,4.5,1.3c1.1,0.1,2.6,0,3.9-0.3c1-0.2,2.9-0.7,2.9-1.1C15,12.3,11.2,12.2,10.9,11.6z M4.5,9.3
	C3.7,9.3,3,8.6,3,7.8s0.7-1.5,1.5-1.5S6,7,6,7.8S5.3,9.3,4.5,9.3z"
    />
</symbol>
<symbol viewBox="0 0 37 37" id="marker">
      <title>marker</title>
      <path d="M19.75 2.75 L32.47792206135786 7.022077938642145 L36.75 19.75 L32.47792206135786 32.47792206135786 L19.75 36.75 L7.022077938642145 32.47792206135786 L2.75 19.750000000000004 L7.022077938642141 7.022077938642145 L19.749999999999996 2.75 Z" /> </symbol>
</svg>
</div>
`;

function loadStyle(name: string) {
    type T = Format.Style[];
    let d = $.Deferred<T>();

    if ('[' === name[0]) {
        d.resolve(JSON.parse(name));
    } else {
        let mids = name.split(",").map(name => `../styles/${name}`);
        requirejs(mids, (...styles: T[]) => {
            let style = <T>[];
            styles.forEach(s => style = style.concat(s));
            d.resolve(style);
        });

    }
    return d;
}

function loadGeom(name: string) {
    type T = ol.geom.Geometry[];
    let mids = name.split(",").map(name => `../tests/geom/${name}`);
    let d = $.Deferred<T>();
    requirejs(mids, (...geoms: ol.geom.Geometry[]) => {
        d.resolve(geoms);
    });
    return d;
}

const styles = {
    point: pointStyle
};

const serializer = new StyleConverter();

class Renderer {

    canvas: HTMLCanvasElement;
    feature: ol.Feature;

    constructor(geom: ol.geom.Geometry) {
        this.feature = new ol.Feature(geom);
        this.canvas = this.createCanvas();
    }

    private createCanvas(size = 256) {
        let canvas = document.createElement("canvas");
        canvas.width = canvas.height = size;
        return canvas;
    }

    draw(styles: Format.Style[]) {
        let canvas = this.canvas;
        let feature = this.feature;
        let style = styles.map(style => serializer.fromJson(style));
        feature.setStyle(style);
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        Snapshot.render(canvas, feature);
    }

}

export function run() {

    $(html).appendTo("body");
    $(svg).appendTo("body");
    $(css).appendTo("head");
    $(".style").val(JSON.stringify({
        "type": "esriSFS",
        "style": "esriSFSForwardDiagonal",
        "color": [0, 255, 0, 255],
        "outline": {
            "type": "esriSLS",
            "style": "esriSLSSolid",
            "color": [0, 255, 0, 255],
            "width": 0.4
        }
    }, null, '\t'));

    let geom = getParameterByName("geom") || "polygon-with-holes";
    let style = getParameterByName("style");

    let save = () => {
        let style = JSON.stringify(JSON.parse($(".style").val() + ""));
        let loc = window.location;
        let url = `${loc.origin}${loc.pathname}?run=ol3-symbolizer/labs/ags-style-converter&geom=${geom}&style=${encodeURI(style)}`;
        history.replaceState({}, "Changes", url);
        return url;
    };

    style && loadStyle(style).then(styles => {
        loadGeom(geom).then(geoms => {
            let style = JSON.stringify(styles, null, ' ');
            $(".style").val(style);

            let renderers = geoms.map(g => new Renderer(g));
            renderers.forEach(r => $(r.canvas).appendTo("#canvas-collection"));

            setInterval(() => {
                try {
                    let style = JSON.parse($(".style").val() + "");
                    renderers.forEach(r => r.draw(style));
                    save();
                } catch (ex) {
                    // invalid json, try later
                }
            }, 2000);

        });
    });

}
