# Changelog

## [2.0.0](https://github.com/quic-pro/quic-dashboard/releases/tag/2.0.0) (2023-02-21)

### Changed

- feat: add widget and swap page
- feat(mvts-layout): show a message during section preparation
- feat(popup-notifications): add button to close all notifications
- feat: move settings to a separate component
- feat: add number input component
- perf(mvts-methods): simplify the logic
- feat(connect-wallet): add information and link to documentation
- feat(mvts-account-codes): highlight selected code
- feat(settings): add notification close timeout setting
- feat(mvts): add blank pages

### Fixed

- fix(dashboard-header): hide balance if the chain is not supported
- fix(main-page): highlight the company name on a white background
- fix(connect-wallet): open documentation in a new tab
- fix(dashboard-layout): don't redirect to homepage during network change
- fix(popup-notifications): change the logic for closing notifications
- revert: fix(dashboard-layout): don't redirect to homepage during network change
- fix(main-page): hide company name on small screens
- fix(dashboard-header): show loader while requesting balance
- fix(mvts): remove unnecessary requests to the smart contract
- fix(drop-down): add modes dropdown menu

### Refactors

- refactor: simplify theme switching logic
- refactor!: change project structure
- refactor: shorten import paths
- refactor!: change feature exports and rename utilities and hooks
- refactor(notification-hooks): remove repeated code
- refactor(mvts)!: move logic to features folder
- refactor(mvts-settings)!: move each command to a separate component
- refactor(mvts-methods): move inputs to base component
- refactor: shorten import paths
- refactor(mvts): improve styles
- refactor(mvts-pool-codes): simplify the logic
- refactor(mvts): remove unnecessary getCodeStatus utility

### Chores

- chore: update dependencies
- chore: bump version to 2.0.0

### Styles

- style: rename mvts utils

## [1.0.0](https://github.com/quic-pro/quic-dashboard/releases/tag/1.0.0) (2023-02-08)

### Changed

- improvement: use @mvts/resolver-js new version
- feat: add checking current wallet network
- feat(chains): change the list of supported chains
- feat: add chain icons
- feat(sidebar): add menu
- perf: use global state instead of passing parameter multiple times
- feat(routing): add all pages
- feat(routing): add 404 error handling
- add colors to tailwind.config
- Add font for all page in style.css
- feat: add popup notification system
- change icons & style of menu
- feat(mvts): add a layout to automatically switch to the desired network
- feat: add content to mvts shop page
- feat: add routing for messenger and mvts marketplace pages
- feat(mvts-account): add content
- feat(mvts-settings): add content
- feat: collapse methods with parameters
- feat(mvts-shop): change the method of withdrawing codes
- feat(mvts-shop): add filter reset button
- feat (page account): style fix
- feat (page account): change button style
- refactor: move part of the logic of working with the root router into hooks
- feat (page settings): change style
- feat (page settings): change button style
- feat(page settings): fix sip uri
- feat(page settings): fix input style
- feat(page settings): fix style pool mode
- feat(base page): add margin to description
- feat(page shop): change filter buttons style
- feat(page shop): add check to filter button
- feat(page shop): change list style
- feat(page settings): change button apply position
- feat(account info): add switch theme

### Fixed

- fix: fix redux errors
- fix: display big numbers correctly
- fix(number management page): display the information of the selected code
- fix(dashboard-layout): require authorization to view the dashboard
- fix(dropdown): click handling
- fix(dropdown): align position to right
- fix(networklist): display icon for bnb smart chain
- fix(environment): disable sourcemap generation for production and enable for other builds
- fix: correctly determine the build mode
- fix: delete notifications when time expires
- fix: replace the text of the notice about minting the code
- fix(sidebar): hide unnecessary elements on a collapsed panel
- fix(mvts-settings): change parameter name to set router method
- fix(mvts-shop): hide empty lists of codes
- fix(dashboard-sidebar): adapt to small screens
- fix(mvts-hooks): update result when parameters change
- fix(mvts-shop): add funds transfer when minting

### Refactors

- refactor: change wallet connection style
- refactor(layout): add layout
- refactor: change the architecture
- refactor(dashboard-layout): add account info
- refactor: rename util roundBalance to roundBigNumber
- refactor: move the logic of getting account codes into a hook
- refactor: move part of the logic of working with the root router into hooks
- refactor(mvts-hooks): move the common logic into a separate function
- refactor(mvts-account): move the common logic into a separate function
- refactor(mvts-settings): move the common logic into a separate function
- refactor: apply new smart contract interface

### Docs

- docs: add environment variable table
- docs: add changelog

### Chores

- chore(eslint): set up eslint
- chore(husky): set up husky
- chore(tailwindcss): set up with postcss
- chore: add recoil
- chore: update dependencies
- chore: fix postcss config
- chore: update dependencies
- chore: bump version to 1.0.0

### Styles

- style: fix eslint errors
- style: add missing commas and semicolons
- style: replace single quotes with double quotes in jsx components
- style: fix indents

## [0.1.0](https://github.com/quic-pro/quic-dashboard/releases/tag/0.1.0) (2022-11-29)

### Changed

- add files
- Added web3
- Added wallet connection
- Changed account info
- Update tailwind.config.js
- Removed banner
- Added page for swap
- Added master layout
- add style for login
- Applied master layout in routing.
- Rename company
- Added balance display in the header
- change style of page
- change colors
- Added mvts-resolver-js
- change banner
- change datepicker
- new changes
- first changes in menu
- 1st version of menu
- Added initialize contracts
- add about account
- Added buy page
- Added buy page
- Update BuyPage.tsx
- Update BuyPage.tsx
- Added MyNumberPage
- Added button renew subscription
- Removed link "My Nodes"
- Update BuyPage.tsx
- Added NumberManagementPage
- Added logic in number management page
- Update NumberManagementPage.tsx
- Update NumberManagementPage.tsx
- add style for my number
- style for shop
- add style
- Update NumberManagementPage.tsx
- Added fefresh button
- Added fefresh button
- Update MyNumberPage.tsx
- style refresh button
- sstyle for management number

### Fixed

- Fixed mistakes
- Fixed animation
- Fixed navigate to login page
- Fixed dependencies for swap modal
- Rename company
- fix filter button
- Fixed sidebar
- Fixed error message
- Fixed availableForBuyNumbers
- Fixed different mistakes
- Minor design fixes
- fix my number page
- fix swap page
- fix buy page
- fix buy page
- fix search
- fix notification
- fix notification
- fix menu
- recolor icons

### Docs

- Delete README.md
- Add readme
- Update README.md

### Chores

- Initial commit
- Add first files and write files in public folder
- Update package.json
- Create yarn.lock
- Updated env and dependency versions
- Test mvts-resolver-js
