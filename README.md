# Example App to track users portfolio

This repository contains 2 projects to implment an App portfolio tracker.

## Backend:
Simple node app that provides endpoints with hardcoded data using express.

to start it you need to have installed Node and type the followind commands:

```
npm ci
npm run dev
```

The application uses the port 4001 by default: http://localhost:4001

### Example of endpoints calls
http://localhost:4001/portfolio/chart?user_id=user_1
http://localhost:4001/portfolio?user_id=user_1&asset_type=crypto



## React + ViteFrontend:

React 19 + Vite app that display a UI to review users portfolio.

To start it you need to have installed Node and type the followind commands:

```
npm ci
npm run dev
```
The application uses the port 4000 by default: http://localhost:4000.

### Application features:
- The app allows to inidcate a User ID in the top-right input text in order to fetch their data. IDs 1 and 2 have data.
    - Debounced applied to avoid multiple fetches to the Backend.
- The panel displays a pie chart with the total holdings of the selected user. This panel is refreshed only when a new User ID is searched.
- The rught panel displays a table with all assets of the selected User ID. 
    - There is a selector that allows to filter the Assets by Type. When this selector is used, the app triggers fetchs new data for this component.
- The UI is responsive with wide/narrow screen modes.
- Error hangling with inline and toaster messages.
- Loading message for slow network speeds.


### Consideration
- Pagination can be added if we expect to much data to be received.
- The Asset type selector may filter the current data without triggering another query to the backend since no pagination is implemented.
- If the backed had a lot of load we could implement some memoization for asset type queries (cache).