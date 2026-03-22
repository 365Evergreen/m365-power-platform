2026-03-22T17:52:30.497Z	Initializing build environment...
2026-03-22T17:52:32.442Z	Success: Finished initializing build environment
2026-03-22T17:52:33.337Z	Cloning repository...
2026-03-22T17:52:34.535Z	Detected the following tools from environment: npm@10.9.2, nodejs@22.16.0
2026-03-22T17:52:34.537Z	Restoring from dependencies cache
2026-03-22T17:52:34.539Z	Restoring from build output cache
2026-03-22T17:52:34.681Z	Installing project dependencies: npm clean-install --progress=false
2026-03-22T17:52:38.091Z	npm warn deprecated sourcemap-codec@1.4.8: Please use @jridgewell/sourcemap-codec instead
2026-03-22T17:52:41.271Z	npm warn deprecated source-map@0.8.0-beta.0: The work that was done in this beta branch won't be included in future versions
2026-03-22T17:52:41.443Z	npm warn deprecated glob@11.1.0: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
2026-03-22T17:52:48.763Z	
2026-03-22T17:52:48.764Z	added 735 packages, and audited 736 packages in 14s
2026-03-22T17:52:48.764Z	
2026-03-22T17:52:48.766Z	153 packages are looking for funding
2026-03-22T17:52:48.766Z	  run `npm fund` for details
2026-03-22T17:52:48.774Z	
2026-03-22T17:52:48.774Z	7 vulnerabilities (1 moderate, 6 high)
2026-03-22T17:52:48.774Z	
2026-03-22T17:52:48.774Z	To address issues that do not require attention, run:
2026-03-22T17:52:48.774Z	  npm audit fix
2026-03-22T17:52:48.775Z	
2026-03-22T17:52:48.775Z	To address all issues (including breaking changes), run:
2026-03-22T17:52:48.775Z	  npm audit fix --force
2026-03-22T17:52:48.775Z	
2026-03-22T17:52:48.775Z	Run `npm audit` for details.
2026-03-22T17:52:48.971Z	Executing user build command: npm run build
2026-03-22T17:52:49.218Z	
2026-03-22T17:52:49.219Z	> spark-template@0.0.0 build
2026-03-22T17:52:49.219Z	> tsc -b --noCheck && vite build
2026-03-22T17:52:49.219Z	
2026-03-22T17:52:52.820Z	[icon-proxy] Checking for exports in directory: /opt/buildhome/repo/node_modules/@phosphor-icons/react
2026-03-22T17:52:52.821Z	[icon-proxy] Found package file: /opt/buildhome/repo/node_modules/@phosphor-icons/react/dist/index.d.ts
2026-03-22T17:52:52.822Z	[icon-proxy] Loaded 1514 exports from /opt/buildhome/repo/node_modules/@phosphor-icons/react/dist/index.d.ts
2026-03-22T17:52:52.822Z	[icon-proxy] Checking for exports in directory: /opt/buildhome/repo/node_modules/@phosphor-icons/react
2026-03-22T17:52:52.822Z	[icon-proxy] Found package file: /opt/buildhome/repo/node_modules/@phosphor-icons/react/dist/index.d.ts
2026-03-22T17:52:52.823Z	[icon-proxy] Loaded 1514 exports from /opt/buildhome/repo/node_modules/@phosphor-icons/react/dist/index.d.ts
2026-03-22T17:52:52.834Z	vite v7.2.6 building client environment for production...
2026-03-22T17:52:52.908Z	transforming...
2026-03-22T17:52:55.135Z	Found 3 warnings while optimizing generated CSS:
2026-03-22T17:52:55.135Z	
2026-03-22T17:52:55.138Z	Issue #1:
2026-03-22T17:52:55.138Z	│   .container {
2026-03-22T17:52:55.138Z	│     width: 100%;
2026-03-22T17:52:55.138Z	│     @media (width >= (display-mode: standalone)) {
2026-03-22T17:52:55.138Z	┆                     ^-- Unexpected token ParenthesisBlock
2026-03-22T17:52:55.139Z	┆
2026-03-22T17:52:55.139Z	│       max-width: (display-mode: standalone);
2026-03-22T17:52:55.139Z	│     }
2026-03-22T17:52:55.139Z	
2026-03-22T17:52:55.139Z	Issue #2:
2026-03-22T17:52:55.139Z	│       max-width: (display-mode: standalone);
2026-03-22T17:52:55.139Z	│     }
2026-03-22T17:52:55.139Z	│     @media (width >= (pointer: coarse)) {
2026-03-22T17:52:55.140Z	┆                     ^-- Unexpected token ParenthesisBlock
2026-03-22T17:52:55.140Z	┆
2026-03-22T17:52:55.140Z	│       max-width: (pointer: coarse);
2026-03-22T17:52:55.140Z	│     }
2026-03-22T17:52:55.140Z	
2026-03-22T17:52:55.140Z	Issue #3:
2026-03-22T17:52:55.140Z	│       max-width: (pointer: coarse);
2026-03-22T17:52:55.140Z	│     }
2026-03-22T17:52:55.140Z	│     @media (width >= (pointer: fine)) {
2026-03-22T17:52:55.140Z	┆                     ^-- Unexpected token ParenthesisBlock
2026-03-22T17:52:55.140Z	┆
2026-03-22T17:52:55.140Z	│       max-width: (pointer: fine);
2026-03-22T17:52:55.140Z	│     }
2026-03-22T17:52:55.140Z	
2026-03-22T17:53:01.498Z	✓ 6955 modules transformed.
2026-03-22T17:53:01.770Z	rendering chunks...
2026-03-22T17:53:02.139Z	computing gzip size...
2026-03-22T17:53:02.177Z	dist/manifest.webmanifest                          0.50 kB
2026-03-22T17:53:02.179Z	dist/index.html                                    1.35 kB │ gzip:   0.58 kB
2026-03-22T17:53:02.179Z	dist/assets/index-DIKQBHJl.css                   348.56 kB │ gzip:  65.62 kB
2026-03-22T17:53:02.179Z	dist/assets/workbox-window.prod.es5-BIl4cyR9.js    5.76 kB │ gzip:   2.37 kB
2026-03-22T17:53:02.179Z	dist/assets/index-BFudsmNy.js                    583.80 kB │ gzip: 183.01 kB
2026-03-22T17:53:02.179Z	✓ built in 9.31s
2026-03-22T17:53:02.181Z	
2026-03-22T17:53:02.181Z	(!) Some chunks are larger than 500 kB after minification. Consider:
2026-03-22T17:53:02.181Z	- Using dynamic import() to code-split the application
2026-03-22T17:53:02.181Z	- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
2026-03-22T17:53:02.185Z	- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
2026-03-22T17:53:05.063Z	
2026-03-22T17:53:05.064Z	PWA v1.2.0
2026-03-22T17:53:05.064Z	mode      generateSW
2026-03-22T17:53:05.064Z	precache  10 entries (926.80 KiB)
2026-03-22T17:53:05.064Z	files generated
2026-03-22T17:53:05.064Z	  dist/sw.js
2026-03-22T17:53:05.064Z	  dist/workbox-1d305bb8.js
2026-03-22T17:53:05.217Z	Success: Build command completed
2026-03-22T17:53:05.348Z	Executing user deploy command: npx wrangler deploy
2026-03-22T17:53:06.865Z	npm warn exec The following package was not found and will be installed: wrangler@4.76.0
2026-03-22T17:53:15.339Z	
2026-03-22T17:53:15.340Z	 ⛅️ wrangler 4.76.0
2026-03-22T17:53:15.340Z	───────────────────
2026-03-22T17:53:15.381Z	
2026-03-22T17:53:15.381Z	Cloudflare collects anonymous telemetry about your usage of Wrangler. Learn more at https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler/telemetry.md
2026-03-22T17:53:15.381Z	
2026-03-22T17:53:15.431Z	✘ [ERROR] The Wrangler application detection logic has been run in the root of a workspace instead of targeting a specific project. Change your working directory to one of the applications in the workspace and try again.
2026-03-22T17:53:15.431Z	
2026-03-22T17:53:15.431Z	
2026-03-22T17:53:15.490Z	🪵  Logs were written to "/opt/buildhome/.config/.wrangler/logs/wrangler-2026-03-22_17-53-14_670.log"
2026-03-22T17:53:15.618Z	Failed: error occurred while running deploy command

---

Root cause

The deploy step runs `npx wrangler deploy` from the repository root. This project is a workspace root (see `workspaces` in `package.json`) and does not include a Worker app config (`wrangler.toml`) at root, so Wrangler 4 fails app detection.

Error from log:

- `The Wrangler application detection logic has been run in the root of a workspace instead of targeting a specific project.`

Fix (recommended for this repo)

This repo is a Cloudflare Pages style app (Vite `dist` + `functions/`), so do not run `wrangler deploy` in Cloudflare build settings.

Use these settings in Cloudflare:

- Build command: `npm run build`
- Build output directory: `dist`
- Deploy command: leave empty
- Functions directory: `functions`

Alternative CLI deploy (if needed)

- `npx wrangler pages deploy dist --project-name <your-pages-project-name>`

Do not use `npx wrangler deploy` unless you add and target a Worker-specific config (`wrangler.toml`) in an actual Worker app directory.