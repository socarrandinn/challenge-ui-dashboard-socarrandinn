import { Icon, IconProps } from '@tabler/icons-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export interface IMenu {
  title: string,
  url: string,
  icon?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>
  isActive?: boolean
  items?: IMenu[]
}