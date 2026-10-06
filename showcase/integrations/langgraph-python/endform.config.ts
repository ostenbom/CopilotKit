import { defineEndformConfig } from "endform";

export default defineEndformConfig({
  // CI starts Next, LangGraph and Aimock outside Playwright's webServer.
  // Unbounded remote browsers overloaded the shared cold Next dev server
  // (94s navigation responses and 42s browser timeouts in the local trial).
  concurrentTestLimits: [{ scope: "within-suite-run", limit: 4 }],
  proxyNetworkHosts: ["<loopback>"],
});
