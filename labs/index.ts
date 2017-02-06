export function run() {
    let l = window.location;
    let path = `${l.origin}${l.pathname}?run=labs/`;
    let labs = `    
  index
  ags-viewer&services=//sampleserver3.arcgisonline.com/ArcGIS/rest/services&serviceName=SanFrancisco/311Incidents&layers=0&debug=1&center=-122.49,37.738
  ags-viewer&services=//sampleserver3.arcgisonline.com/ArcGIS/rest/services&serviceName=Fire/Sheep&layers=0,1,2&debug=1&center=-117.9,34.35
  ags-viewer&services=//sampleserver3.arcgisonline.com/ArcGIS/rest/services&serviceName=HomelandSecurity/operations&layers=0,1,2&debug=1&center=-117.2,32.7
  ags-viewer&services=//sampleserver3.arcgisonline.com/ArcGIS/rest/services&serviceName=Hydrography/Watershed173811&layers=0,1&debug=1&center=-96.53,38.37
  ags-viewer&services=//sampleserver3.arcgisonline.com/ArcGIS/rest/services&serviceName=Petroleum/KSFields&layers=0&debug=1&center=-98.93,38.55
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
        .map(lab => `<div class='test'><a href='${path}${lab}&debug=1'>${lab}</a></div>`)
        .join("\n");


    let testDiv = document.createElement("div");
    document.body.appendChild(testDiv);

    testDiv.innerHTML = `<a href='${l.origin}${l.pathname}?run=tests/index'>tests</a>`;
};