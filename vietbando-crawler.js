async function getData({id, level}) {
var request = fetch("http://maps.vietbando.com/maps/ajaxpro/AJLocationSearch,Vietbando.Web.Library.ashx", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9,vi;q=0.8",
    "cache-control": "no-cache",
    "content-type": "text/plain; charset=UTF-8",
    "pragma": "no-cache",
    "x-ajaxpro-method": "GetAHGeometry"
  },
  "referrer": "http://maps.vietbando.com/maps/?t=1&st=0&sk=Th%E1%BB%8B+X%C3%A3+Sa+Pa,+T%E1%BB%89nh+L%C3%A0o+Cai&l=12&kv=22.3632844,103.924140",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"ID\": " + id +",\"level\":"+level+",\"type\":\"P\",\"left\":-180,\"top\":72.7900882731902,\"right\":179.912109375,\"bottom\":-52.7495937267411}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});

var response = await request;
var data = await response.json();
let coords = []; for (let i = 0; i < data.value[0][0].length - 1; i += 2) {coords.push([data.value[0][0][i], data.value[0][0][i + 1]])}
var geojson = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
         
        ],
        "type": "Polygon"
      }
    }
  ]
}

geojson.features[0].geometry.coordinates.push(coords);
  console.log('Crawling', id);
  return geojson;
}

async function getChild(parentId, filename) {
  var request = fetch("http://maps.vietbando.com/maps/ajaxpro/AJLocationSearch,Vietbando.Web.Library.ashx", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9,vi;q=0.8",
    "cache-control": "no-cache",
    "content-type": "text/plain; charset=UTF-8",
    "pragma": "no-cache",
    "x-ajaxpro-method": "GetChild"
  },
  "referrer": "http://maps.vietbando.com/maps/?t=1&st=0&sk=Th%E1%BB%8B+X%C3%A3+Sa+Pa,+T%E1%BB%89nh+L%C3%A0o+Cai&l=12&kv=22.3632844,103.924140",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"ParentID\":"+parentId+"}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});
  var response = await request;
  var data = await response.text();
  data = '[[' + data.split("]],[[")[1].replace(')}', '');
  var listphuong = JSON.parse(data); // response 
  let result = {}; 
  let promises = [];
  listphuong.forEach(
    item => {
      let pros = async () => {
        result[item[1]] = await getData({id: item[0], level: 27}); 
        result[item[1]].props = {ma: item[0], ten: item[1]}
      }
      promises.push(pros());
    }
  )
  var data = {
      "type": "FeatureCollection",
      "features": []
    }
  
  await Promise.all(promises);
  Object.keys(result).forEach(key => {
    data.features.push({
      ...result[key].features[0], 
      ...{properties: {...result[key].props}}
    })
  })
  console.log(JSON.stringify(data))
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
  var dlAnchorElem = document.getElementById('downloadAnchorElem');
  dlAnchorElem.setAttribute("href",     dataStr     );
  dlAnchorElem.setAttribute("download", filename);
  dlAnchorElem.click();
}
