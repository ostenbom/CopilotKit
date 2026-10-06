# Endform adapter for the external Dojo suite

The Dojo workflow checks out AG-UI at a pinned commit, then applies this adapter.
All 15 matrix entries remain: each has a different frontend/agent environment,
so none is an obsolete redundant shard. Test bodies, Chromium project, retries,
timeouts, fixture data, and application services remain unchanged.

`dependencies.patch` adds Endform 0.81.3 to the standalone suite's authored npm
lock without upgrading Playwright 1.54.1. This package is excluded from AG-UI's
pnpm workspace; `npm ci --ignore-scripts` installs its locked dependencies while
omitting its browser-download postinstall on the remote runner path.

`configure.mjs` fails if the pinned configuration no longer matches. It preserves
the existing config except for explicit parallelism, failure traces, the existing
localhost URL as a fallback, and setup/teardown process ownership. Endform invokes
global setup in a child process which cannot exit while Aimock is listening. The
workflow instead starts the existing `aimock-standalone.ts` with the same fixture
registration, port 5555, and 5ms latency, using the same background-action lifecycle
as application services. Native baseline setup is untouched. Its extra browser
clears a fresh context which is closed and never reused by the tests.

Loopback HTTP proxying reaches the CI-local application, agents, and Aimock,
including diagnostic requests from Node. Only the runtime upload image needs
explicit additional-file transfer; golden event traces are imported modules.
