import { defineEndformConfig } from "endform";

export default defineEndformConfig({
  // CI starts Next, LangGraph and Aimock outside Playwright's webServer.
  // Unbounded remote browsers overloaded the shared cold Next dev server
  // (94s navigation responses and 42s browser timeouts in the local trial).
  concurrentTestLimits: [
    { scope: "within-suite-run", limit: 4 },
    // Endform's distributed cases did not honor this describe's serial mode.
    // Enforce no overlap; native group retry/skip semantics are not replicated.
    { scope: "within-suite-run", label: "tag:@hitl-in-app-serial", limit: 1 },
  ],
  proxyNetworkHosts: ["<loopback>"],
});
