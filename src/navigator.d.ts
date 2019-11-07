// Type declarations for Clipboard API
// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
interface XR {

}

interface NavigatorXR {
  // Only available in a secure context.
  readonly xr?: XR;
}

interface Navigator extends NavigatorXR {}