// without this ts will show warning when using this library

declare module "react-world-flags" {
  import * as React from "react";

  interface FlagProps {
    code: string;
    style?: React.CSSProperties;
  }

  const Flag: React.FC<FlagProps>;

  export default Flag;
}
