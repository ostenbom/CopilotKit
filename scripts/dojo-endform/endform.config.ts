import { defineEndformConfig } from "endform";

export default defineEndformConfig({
  // The existing workflow starts Dojo and agents independently of webServer.
  proxyNetworkHosts: ["<loopback>"],
  // Upload tests resolve this image at runtime instead of importing it.
  additionalFiles: ["fixtures/test-image.png"],
});
