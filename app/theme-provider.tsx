"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export const ThemeProvider = (props: ThemeProviderProps): React.JSX.Element => {
  return NextThemesProvider(props) as React.JSX.Element;
};

//! This is the code john used, since it show ts warning message i used the above method.  got this from issues from.
// 'use client'

// import { ThemeProvider as NextThemesProvider } from 'next-themes';
// import { type ThemeProviderProps } from 'next-themes/dist/types';

// export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
//   return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
// }
