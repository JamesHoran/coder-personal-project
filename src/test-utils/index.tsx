import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider as JotaiProvider } from "jotai";

interface AllTheProvidersProps {
  children: React.ReactNode;
}

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  return <JotaiProvider>{children}</JotaiProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
