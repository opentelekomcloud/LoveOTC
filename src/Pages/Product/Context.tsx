import { isEqual } from "lodash-es";
import { createContext, useContext, useEffect, useState } from "react";
import { IComboItem } from "../Admin/Product/Combo";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
interface Context {
  /** Current Selected Combination */
  Current: Record<string, string>;
  Update: (val: Record<string, string>) => void;

  Combo?: IComboItem;
  SetAll: (val: IComboItem[]) => void;
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
 * @version 0.3.0
 */
export function RadioGroupContext({ children }: { children: React.ReactNode }) {
  const [curr, setCurr] = useState({});
  const [combo, setCombo] = useState<IComboItem>();
  const [all, setAll] = useState<IComboItem[]>([]);

  useEffect(() => {
    const combo = all.find(x => isEqual(x.Combo, curr));
    setCombo(combo);
  }, [curr, all]);

  return (
    <RadioGroup.Provider value={{
      Current: curr,
      Update: setCurr,
      Combo: combo,
      SetAll: setAll
    }}>
      {children}
    </RadioGroup.Provider>
  )
}
