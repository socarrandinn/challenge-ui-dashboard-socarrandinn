export enum FILTER_TYPE_ENUM {
  RANGE = 'RANGE',
  FIXED_LIST = 'FIXED_LIST',
}
export type IFilterRowItem = {
  value: string;
  label: string;
};
export type IFilter = {
  label: string;
  field: string;
  key: string;
  placeholder?: string;
  type: FILTER_TYPE_ENUM;
  options?: any[];
  queryKey?: string;
  className?: string;
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
  value: string | string[] | null | undefined;
  title: string;
};

