export function run() {
    let l = window.location;
    let path = `${l.origin}${l.pathname}?run=ol3-symbolizer/labs/`;
    let labs = `    
  index
  ags-viewer
  ags-viewer&services=//maps.springfieldmo.gov/arcgis/rest/services&serviceType=MapServer&serviceName=Maps/Zoning&layers=6&center=-93.28,37.23
  ags-viewer&services=//sampleserver3.arcgisonline.com/ArcGIS/rest/services&serviceName=SanFrancisco/311Incidents&layers=0&center=-122.49,37.738
  ags-viewer&services=//sampleserver3.arcgisonline.com/ArcGIS/rest/services&serviceName=Fire/Sheep&layers=0,1,2&center=-117.9,34.35
  ags-viewer&services=//sampleserver3.arcgisonline.com/ArcGIS/rest/services&serviceName=HomelandSecurity/operations&layers=0,1,2&center=-117.2,32.7
  ags-viewer&services=//sampleserver3.arcgisonline.com/ArcGIS/rest/services&serviceName=Hydrography/Watershed173811&layers=0,1&center=-96.53,38.37
  ags-viewer&services=//sampleserver3.arcgisonline.com/ArcGIS/rest/services&serviceName=Petroleum/KSFields&layers=0&center=-98.93,38.55

  ags-viewer&services=//usgvl-shotgun02:6080/arcgis/rest/services&serviceName=Annotations/H840_ANNOTATIONS5&layers=3&center=-115.3,36.1&where=H8REGION=%27GREEN%27
  ags-viewer&services=//usgvl-shotgun02:6080/arcgis/rest/services&serviceName=Annotations/H840_ANNOTATIONS5&layers=3&center=-115.3,36.1&where=H8REGION%20IN(%27RED%27,%27GREEN%27)

  style-viewer

    style-viewer&geom=point&style=icon/png
    style-viewer&geom=point&style=icon/png,text/text
    style-viewer&geom=point&style=%5B%7B"image":%7B"imgSize":%5B45,45%5D,"rotation":0,"stroke":%7B"color":"rgba(255,25,0,0.8)","width":3%7D,"path":"M23%202%20L23%2023%20L43%2016.5%20L23%2023%20L35%2040%20L23%2023%20L11%2040%20L23%2023%20L3%2017%20L23%2023%20L23%202%20Z"%7D%7D%5D

    style-viewer&geom=point&style=%5B%7B"circle":%7B"fill":%7B"gradient":%7B"type":"linear(32,32,96,96)","stops":"rgba(0,255,0,0.1)%200%25;rgba(0,255,0,0.8)%20100%25"%7D%7D,"opacity":1,"stroke":%7B"color":"rgba(0,255,0,1)","width":1%7D,"radius":64%7D%7D,%7B"image":%7B"anchor":%5B16,48%5D,"size":%5B32,48%5D,"anchorXUnits":"pixels","anchorYUnits":"pixels","src":"http://openlayers.org/en/v3.20.1/examples/data/icon.png"%7D%7D,%7B"text":%7B"fill":%7B"color":"rgba(75,92,85,0.85)"%7D,"stroke":%7B"color":"rgba(255,255,255,1)","width":5%7D,"offset-x":0,"offset-y":16,"text":"fantasy%20light","font":"18px%20serif"%7D%7D%5D    

    style-viewer&geom=point&style=%5B%7B"image":%7B"imgSize":%5B13,21%5D,"fill":%7B"color":"rgba(0,0,0,0.5)"%7D,"path":"M6.3,0C6.3,0,0,0.1,0,7.5c0,3.8,6.3,12.6,6.3,12.6s6.3-8.8,6.3-12.7C12.6,0.1,6.3,0,6.3,0z%20M6.3,8.8%20c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5C8.8,7.7,7.7,8.8,6.3,8.8z"%7D%7D%5D

    style-viewer&geom=point&style=%5B%7B"image":%7B"imgSize":%5B15,15%5D,"anchor":%5B0,0.5%5D,"fill":%7B"color":"rgba(255,0,0,0.1)"%7D,"stroke":%7B"color":"rgba(255,0,0,1)","width":0.1%7D,"scale":8,"rotation":0.7,"img":"lock"%7D%7D,%7B"image":%7B"imgSize":%5B15,15%5D,"anchor":%5B100,0.5%5D,"anchorXUnits":"pixels","fill":%7B"color":"rgba(0,255,0,0.4)"%7D,"stroke":%7B"color":"rgba(255,0,0,1)","width":0.1%7D,"scale":1.5,"rotation":0.7,"img":"lock"%7D%7D,%7B"image":%7B"imgSize":%5B15,15%5D,"anchor":%5B-10,0%5D,"anchorXUnits":"pixels","anchorOrigin":"top-right","fill":%7B"color":"rgba(230,230,80,1)"%7D,"stroke":%7B"color":"rgba(0,0,0,1)","width":0.5%7D,"scale":2,"rotation":0.8,"img":"lock"%7D%7D%5D


    style-viewer&geom=multipoint&style=icon/png

    style-viewer&geom=polyline&style=stroke/dot

    style-viewer&geom=polygon&style=fill/diagonal
    style-viewer&geom=polygon&style=fill/horizontal,fill/vertical,stroke/dashdotdot
    style-viewer&geom=polygon&style=stroke/solid,text/text
    style-viewer&geom=polygon-with-holes&style=fill/cross,stroke/solid

    style-viewer&geom=multipolygon&style=stroke/solid,fill/horizontal,text/text

    style-viewer&geom=point&style=%5B%7B%22image%22:%7B%22imgSize%22:%5B15,15%5D,%22fill%22:%7B%22color%22:%22rgba(250,250,250,1)%22%7D,%22stroke%22:%7B%22color%22:%22rgba(0,0,0,1)%22,%22width%22:1%7D,%22path%22:%22M15,6.8182L15,8.5l-6.5-1l-0.3182,4.7727L11,14v1l-3.5-0.6818L4,15v-1l2.8182-1.7273L6.5,7.5L0,8.5V6.8182L6.5,4.5v-3c0,0,0-1.5,1-1.5s1,1.5,1,1.5v2.8182L15,6.8182z%22%7D%7D%5D
    `;

    let styles = document.createElement("style");
    document.head.appendChild(styles);

    styles.innerText += `
    #map {
        display: none;
    }
    .test {
        margin: 20px;
    }
    `;

    let labDiv = document.createElement("div");
    document.body.appendChild(labDiv);

    labDiv.innerHTML = labs
        .split(/ /)
        .map(v => v.trim())
        .filter(v => !!v)
        //.sort()
        .map(lab => `<div class='test'><a href='${path}${lab}'>${lab}</a></div>`)
        .join("\n");


    let testDiv = document.createElement("div");
    document.body.appendChild(testDiv);

    testDiv.innerHTML = `<a href='${l.origin}${l.pathname}?run=ol3-symbolizer/tests/index'>tests</a>`;
};