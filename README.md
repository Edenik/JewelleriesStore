<!-- security-notice -->
> [!WARNING]
> **This repository is archived and no longer maintained. Its dependencies have known, unpatched security vulnerabilities.**
> Do not deploy this code or use it as the base of a new project without upgrading its dependencies first.
> It is built on Angular 9; the Angular advisories below have no fix for Angular 19 or older, so an upgrade to a supported Angular version is required.

Known vulnerabilities (all rated high, as of November 2026):

| Advisory | Package | Issue | Fixed in |
|---|---|---|---|
| [GHSA-62vg-58rm-qff7](https://github.com/advisories/GHSA-62vg-58rm-qff7) | @angular/router | Denial of service via unmatched empty-path outlet route matching (SSR) | 20.3.33 / 21.2.25 / 22.2.1 (none for <= 19) |
| [GHSA-jj27-h5hq-8x99](https://github.com/advisories/GHSA-jj27-h5hq-8x99) | @angular/compiler, @angular/core | Cross-site scripting (XSS) via event-handler attributes in i18n | 20.3.27 / 21.2.19 / 22.0.1 (none for <= 19) |
| [GHSA-jhpw-976m-542j](https://github.com/advisories/GHSA-jhpw-976m-542j) | @angular/common | HttpTransferCache cache-key ambiguity: cross-request response reuse | 20.3.27 / 21.2.19 / 22.0.2 (none for <= 19) |
| [GHSA-2883-xcg3-v3hh](https://github.com/advisories/GHSA-2883-xcg3-v3hh) | js-yaml | maxTotalMergeKeys does not limit CPU use for empty merge sources | 3.15.2 / 4.3.2 |
| [GHSA-5p4m-2wfm-xmqj](https://github.com/advisories/GHSA-5p4m-2wfm-xmqj) | js-yaml | Quadratic CPU consumption in !!omap resolution | 3.15.1 / 4.3.1 |
| [GHSA-w27v-7q3p-w38r](https://github.com/advisories/GHSA-w27v-7q3p-w38r) | svgo | removeScripts bypass via namespace and control characters | 2.8.4 / 3.3.5 / 4.1.0 |
| [GHSA-2p49-hgcm-8545](https://github.com/advisories/GHSA-2p49-hgcm-8545) | svgo | removeScripts leaves some executable scripts intact | 2.8.3 / 3.3.4 / 4.0.2 |
| [GHSA-73wf-gq98-2v4g](https://github.com/advisories/GHSA-73wf-gq98-2v4g) | browserslist | Crash / prototype write via untrusted browserslist-stats.json | 4.28.7 |
| [GHSA-3jxr-9vmj-r5cp](https://github.com/advisories/GHSA-3jxr-9vmj-r5cp) | brace-expansion | Denial of service via exponential-time expansion | 1.1.16 / 2.1.2 / 5.0.7 |
| [GHSA-2x7j-588g-ccc2](https://github.com/advisories/GHSA-2x7j-588g-ccc2) | nodemailer (functions/) | Remote denial of service: quadratic time in addressparser | 9.1.0 |
| [GHSA-j5f4-cc29-5x44](https://github.com/advisories/GHSA-j5f4-cc29-5x44) | adm-zip | Extraction keeps SUID/SGID bits from untrusted ZIPs (local privilege escalation) | 0.6.1 |
<!-- security-notice -->

# Jewelleries Store
Live Demo: https://jewellerystore-47b3d.web.app/

This project get data from JewelleriesApi by https://leibish.com,
And using Firebase database as back-end.
This project also using Firebase for hosting, authenticate, and functions.

You can use this tutorials to create firebase auth and database - 
Firebase CRUD - https://angular-templates.io/tutorials/about/angular-crud-with-firebase
Firebase Auth - https://angular-templates.io/tutorials/about/firebase-authentication-with-angular

Then add your Firebase config keys to enviroments.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.1.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
