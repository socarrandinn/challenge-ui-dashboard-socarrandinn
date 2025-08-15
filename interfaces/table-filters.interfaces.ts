export enum FILTER_TYPE_ENUM {
  RANGE = "RANGE",
  FIXED_LIST = "FIXED_LIST",
}
export type IFilterRowItem = {
  value: string;
  label: string;
};
export type IFilter = {
  key: string;
  type: FILTER_TYPE_ENUM;
  options?: any[];
  defaultValue?: any;
  className?: string;
  placeholder?: string;
};
export type FilterValue = string | string[] | undefined;
export type RangeFilter =
  | {
      from: number;
      to: number;
    }
  | undefined;

export type FilterProps = {
  filter: IFilter;
  title: string;
};
