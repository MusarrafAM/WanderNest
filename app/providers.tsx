"use client";
import { ThemeProvider } from "./theme-provider";

// this Providers component will wrap our navbar and main html(all pages) in the root layout.tsx
// so whatever we wrap the children with also be wrap with the main children in the root layout children.
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
export default Providers;
