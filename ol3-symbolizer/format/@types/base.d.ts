import { Style } from "ol/style";
/**
 * implemented by all style serializers
 */
export interface IConverter<T> {
  fromJson: (json: T) => Style;
  toJson(style: Style): T;
}
