import { krpanoAPI } from "../../core";
//
// 📱 useDevice
// Lấy thông tin device (mobile, desktop, VR)
// Get device information (mobile, desktop, VR)

export function useDevice() {
  const isMobile = () => krpanoAPI.get("device.mobile") === true;
  const isDesktop = () => krpanoAPI.get("device.desktop") === true;
  const isVR = () => krpanoAPI.get("device.webvr") === true;

  return { isMobile, isDesktop, isVR };
}