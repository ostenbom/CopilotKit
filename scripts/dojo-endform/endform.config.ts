import { defineEndformConfig } from "endform";

export default defineEndformConfig({
  // The existing workflow starts Dojo and agents independently of webServer.
  proxyNetworkHosts: ["<loopback>"],
  // Repeated remote runs exposed timeouts/trace races only in this backend.
  // Bound its load while preserving all tests, projects, and existing retries.
  concurrentTestLimits:
    process.env.PLAYWRIGHT_SUITE === "langgraph-typescript"
      ? [{ scope: "within-suite-run", limit: 4 }]
      : [],
  // Upload tests resolve this image at runtime instead of importing it.
  additionalFiles: ["fixtures/test-image.png"],
});
