import { Popover, PopoverSurface, PopoverTrigger, ToolbarButton } from "@fluentui/react-components";
import { ColorPicker } from "./ColorPicker";

interface IColorPicker {
  disabled: boolean;
  ariaLabel: string;
  color: string;
  onChange: (hex: string) => void;
  icon: JSX.Element;
}

export function LexColorPicker({ disabled, ariaLabel, color: color, onChange, icon }: IColorPicker) {
  return (
    <Popover trapFocus withArrow>
      <PopoverTrigger>
        <ToolbarButton
          disabled={disabled}
          icon={icon}
          title={ariaLabel}
          aria-label={ariaLabel}
        />
      </PopoverTrigger>

      <PopoverSurface>
        <ColorPicker
          color={color}
          onChange={onChange}
        />
      </PopoverSurface>
    </Popover>
  );
}
