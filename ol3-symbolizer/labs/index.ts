export function run() {
    let l = window.location;
    let path = `${l.origin}${l.pathname}?run=ol3-symbolizer/labs/`;
    let labs = `    
  index
  ags-viewer
  ags-viewer&services=//sampleserver3.arcgisonline.com/ArcGIS/rest/services&serviceName=SanFrancisco/311Incidents&layers=0&center=-122.49,37.738
  ags-viewer&services=//sampleserver3.arcgisonline.com/ArcGIS/rest/services&serviceName=Fire/Sheep&layers=0,1,2&center=-117.9,34.35
  ags-viewer&services=//sampleserver3.arcgisonline.com/ArcGIS/rest/services&serviceName=HomelandSecurity/operations&layers=0,1,2&center=-117.2,32.7
  ags-viewer&services=//sampleserver3.arcgisonline.com/ArcGIS/rest/services&serviceName=Hydrography/Watershed173811&layers=0,1&center=-96.53,38.37
  ags-viewer&services=//sampleserver3.arcgisonline.com/ArcGIS/rest/services&serviceName=Petroleum/KSFields&layers=0&center=-98.93,38.55

  ags-viewer&services=//usgvl-shotgun02:6080/arcgis/rest/services&serviceName=Annotations/H840_ANNOTATIONS5&layers=3&center=-115.3,36.1&where=H8REGION=%27GREEN%27
  ags-viewer&services=//usgvl-shotgun02:6080/arcgis/rest/services&serviceName=Annotations/H840_ANNOTATIONS5&layers=3&center=-115.3,36.1&where=H8REGION%20IN(%27RED%27,%27GREEN%27)

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

    testDiv.innerHTML = `<a href='${l.origin}${l.pathname}?run=tests/index'>tests</a>`;
};