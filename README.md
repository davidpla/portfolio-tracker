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
