# Example App to track users portfolio

This repository contains 2 projects to implment an App portfolio tracker.
To start clone in your local this repository with:
```
git clone git@github.com:davidpla/portfolio-tracker.git
cd portfolio-tracker
```

## Backend (Node 22):
Simple node app that provides endpoints with hardcoded data using express.

To start the backend app, you need to have installed Node and type the followind commands:

```
cd backend
npm ci
npm run dev
```

The application uses the port 4001 by default: http://localhost:4001

### Example of endpoints calls
* http://localhost:4001/portfolio/chart?user_id=user_1
* http://localhost:4001/portfolio?user_id=user_1&asset_type=crypto


## Frontend (React 19 + Vite):

React 19 + Vite app that display a UI to see users portfolio.

To start the frontend app, you need to have installed Node and type the followind commands:

```
cd frontend
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


----

# Example App to Track Users' Portfolio

This repository contains two projects that implement a portfolio tracker application.
To get started, clone this repository locally:

```bash
git clone git@github.com:davidpla/portfolio-tracker.git
cd portfolio-tracker
```

---

## Backend (Node.js 22)

A simple Node.js app using Express that provides endpoints with hardcoded data to feed the Frontend app.

### Getting Started

Make sure you have Node.js installed. Then run the following commands:

```bash
cd backend
npm ci
npm run dev
```

The backend runs on port `4001` by default: [http://localhost:4001](http://localhost:4001)

### Example Endpoints

* [http://localhost:4001/portfolio/chart?user\_id=user\_1](http://localhost:4001/portfolio/chart?user_id=user_1)
* [http://localhost:4001/portfolio?user\_id=user\_1\&asset\_type=crypto](http://localhost:4001/portfolio?user_id=user_1&asset_type=crypto)

---

## Frontend (React 19 + Vite)

A React 19 + Vite app that provides a user interface for viewing portfolio data.

### Getting Started

Make sure you have Node.js installed. Then run the following commands:

```bash
cd frontend
npm ci
npm run dev
```

The frontend runs on port `4000` by default: [http://localhost:4000](http://localhost:4000)

### Application Features

* Users can enter a User ID in the top-right input to fetch data. (User IDs `user_1` and `user_2` have available data.)

  * Debouncing is applied to avoid multiple fetches.
* The left panel shows a pie chart of the selected user's total holdings.

  * This chart updates only when a new User ID is submitted.
* The right panel displays a table of all assets for the selected User ID.

  * A filter allows selection by asset type. When used, the app fetches new data for this component.
* The UI is responsive for both wide and narrow screens.
* Inline and toast messages handle errors gracefully.
* Loading indicators are shown for slower network connections.

---

### Considerations

* Pagination can be added if a large amount of data is expected.
* The asset type filter currently fetches new data, but could be optimized to filter existing data since pagination is not implemented.
* If the backend becomes a bottleneck, memoization or caching could be introduced for asset-type queries.
