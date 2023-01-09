import { StaticImageData } from '../types/image';

export interface IEvents {
  onMouseEnter?: (event: React.MouseEvent<HTMLTextAreaElement | HTMLInputElement | HTMLDivElement | HTMLButtonElement | HTMLLIElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLTextAreaElement | HTMLInputElement | HTMLDivElement | HTMLButtonElement | HTMLLIElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLLIElement> | React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLTextAreaElement | HTMLInputElement | HTMLDivElement | HTMLButtonElement | HTMLLIElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement | HTMLDivElement | HTMLButtonElement | HTMLLIElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement | HTMLDivElement | HTMLButtonElement | HTMLLIElement>) => void;
}

export type Laptop = string | number;
export type Desktop = string | number;
export type SmallLaptop = string | number;
export type Tablet = string | number;
export type SmallTablet = string | number;
export type Mobile = string | number;
export type SmallMobile = string | number;

export type TResponsiveStyle = [Laptop?, Desktop?, SmallLaptop?, Tablet?, SmallTablet?, Mobile?, SmallMobile?];

export interface IText {
  className?: string;
  fontSizes?: [Laptop?, Desktop?, SmallLaptop?, Tablet?, SmallTablet?, Mobile?, SmallMobile?];
  fontSize?: string | number;
  maxWidths?: [Laptop?, Desktop?, SmallLaptop?, Tablet?, SmallTablet?, Mobile?, SmallMobile?];
  maxWidth?: string | number;
  color?: string;
  fontWeight?: string;
  lineHeight?: number;
  linkColor?: string;
  hasLineLink?: boolean;
  alignText?: 'center' | 'left' | 'right';
  w?: string;
  isBreaking?: boolean;
  isWordBreaking?: boolean;
  textIndent?: string;
}

export interface ICommonStyleProps {
  m?: string;
  w?: string;
  h?: string;
  isActive?: boolean;
  style?: any;
  minW?: string;
  maxW?: string;
  bgColor?: string;
  className?: string;
}

export interface IResponsiveSize {
  universal: { w: any; h: any };
  desktop?: { w: any; h: any };
  smallLaptop?: { w: any; h: any };
  landscapeTablet?: { w: any; h: any };
  tablet: { w: any; h: any };
  mobile: { w: any; h: any };
  smallTablet?: { w: any; h: any };
  smallMobile?: { w: any; h: any };
}
export interface ISpan extends IEvents, IText, ICommonStyleProps {
  checked?: boolean;
  meta?: any;
  isUsedOnDashboard?: boolean;
  tooltip?: string;
}
export interface IParagraph extends IEvents, IText {
  maxWidth?: string;
  style?: {};
  tooltip?: string;
}

export interface IHeading extends IEvents, IText {
  tooltip?: string;
  variant?: 'h1' | 'h2';
  mb?: string;
  m?: string;
  style?: any;
  placeholder?: string;
  bgColor?: string;
}
export interface IContainer extends IEvents {
  className?: string;
  id?: string;
  w?: string | number;
  h?: string | number;
  maxW?: string;
  minW?: string;
  size?: number | string | any;
  style?: any;
  isActive?: boolean | {};
  textColor?: string;
  textHoverColor?: string;
  bc?: string;
  position?: [string, string, string, string, string, string];
  responsiveSize?: IResponsiveSize;
  wrapperMode?: boolean;
  m?: string;
  bg?: string | StaticImageData;
  bgColor?: string;
  boxShadow?: string;
  mt?: string;
  mb?: string;
  noCenter?: boolean;
  error?: boolean;
  direction?: string;
  tooltip?: string;
}
export interface IButton extends IEvents {
  variant: 'primary_fill' | 'primary_outline' | 'secondary_fill' | 'secondary_outline' | 'tertiary_simple';
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  w?: string;
  disabled?: boolean;
  onSubmit?: any;
  form?: string;
}
