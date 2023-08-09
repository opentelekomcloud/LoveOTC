declare global {
  interface Document {
    documentMode?: unknown;
  }

  interface Window {
    MSStream?: unknown;
  }
}

const documentMode = "documentMode" in document ? document.documentMode : null;

export const IS_APPLE: boolean = /Mac|iPod|iPhone|iPad/.test(
  navigator.platform
);

export const IS_FIREFOX: boolean = /^(?!.*Seamonkey)(?=.*Firefox).*/i.test(
  navigator.userAgent
);

export const CAN_USE_BEFORE_INPUT: boolean =
  "InputEvent" in window && !documentMode
    ? "getTargetRanges" in new window.InputEvent("input")
    : false;

export const IS_SAFARI: boolean = /Version\/[\d.]+.*Safari/.test(
  navigator.userAgent
);

export const IS_IOS: boolean =
  /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// Keep these in case we need to use them in the future.
// export const IS_WINDOWS: boolean = CAN_USE_DOM && /Win/.test(navigator.platform);
// export const IS_CHROME: boolean = CAN_USE_DOM && /^(?=.*Chrome).*/i.test(navigator.userAgent);
// export const canUseTextInputEvent: boolean = CAN_USE_DOM && 'TextEvent' in window && !documentMode;
