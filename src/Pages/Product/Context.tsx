import { createContext, useContext, useState } from "react";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
interface Context {
  Current: Record<string, string>;
  Update: (val: Record<string, string>) => void;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const RadioGroup = createContext({} as Context);

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export function useRadioGroup() {
  return useContext(RadioGroup);
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export function RadioGroupContext({ children }: { children: JSX.Element }) {
  const [curr, setCurr] = useState({});

  return (
    <RadioGroup.Provider value={{
      Current: curr,
      Update: setCurr,
    }}>
      {children}
    </RadioGroup.Provider>
  )
}
