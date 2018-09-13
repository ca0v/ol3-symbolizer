import Ajax = require("../common/ajax");
import { defaults } from "ol3-fun/index";
import { CatalogInfo, FeatureServerInfo, MapServerInfo, FeatureLayerInfo } from "./@types/cataloginfo";

export class Catalog {
	private ajax: Ajax;

	constructor(url: string) {
		this.ajax = new Ajax(url);
	}

	about(data?: any) {
		let req = defaults(
			{
				f: "pjson"
			},
			data
		);

		return this.ajax.jsonp<CatalogInfo>(req);
	}

	aboutFolder(folder: string) {
		let ajax = new Ajax(`${this.ajax.url}/${folder}`);
		let req = {
			f: "pjson"
		};

		return ajax.jsonp<CatalogInfo>(req);
	}

	aboutFeatureServer(name: string) {
		let ajax = new Ajax(`${this.ajax.url}/${name}/FeatureServer`);
		let req = {
			f: "pjson"
		};
		return defaults(ajax.jsonp<FeatureServerInfo>(req), { url: ajax.url });
	}

	aboutMapServer(name: string) {
		let ajax = new Ajax(`${this.ajax.url}/${name}/MapServer`);
		let req = {
			f: "pjson"
		};
		return defaults(ajax.jsonp<MapServerInfo>(req), { url: ajax.url });
	}

	aboutLayer(layer: number) {
		let ajax = new Ajax(`${this.ajax.url}/${layer}`);
		let req = {
			f: "pjson"
		};
		return ajax.jsonp<FeatureLayerInfo>(req);
	}
}
