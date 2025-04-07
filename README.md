<h3 align="center">YouTrack App – Test Practice Assignment</h3>

<div align="center">
</div>

---

<img width="1703" alt="image" src="https://github.com/user-attachments/assets/080f28ba-2404-44ed-ad1c-1518232329da" />



<p align="center"> A simple YouTrack app that displays available projects and provides a feature toggle with persistent backend state. Designed as a practical introduction to YouTrack app development.
    <br> 
</p>


## Table of Contents
- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Features](#features)
- [Built Using](#built_using)
- [Authors](#authors)

## About <a name="about"></a>
The app integrates a widget into YouTrack via the `MAIN_MENU_ITEM` extension point, lists all projects from the YouTrack instance, and includes a feature flag toggle that simulates a setting in an admin panel. The toggle's state is stored and retrieved via a custom backend endpoint.

## Getting Started <a name="getting_started"></a>
These instructions will help you run and test the project locally or deploy it to your YouTrack instance.

### Prerequisites

- A running instance of YouTrack
- A permanent token with sufficient permissions
- Node.js

## Usage <a name="usage"></a>

### 1. Clone the repository
```
git clone https://github.com/jakubstec/youtrack-app/
cd youtrack-app
```

### 2. Build the app
You can use the helper script to zip the app:
```
./build_app.sh
```
And upload zip file into running YouTrack instance

Or build and upload:
```
npm run build
npm run upload -- --host https://yourname.youtrack.cloud --token <your-perm-token>
```

You can find or generate your permanent token here (make sure it has required permissions):
```
https://yourname.youtrack.cloud/users/me?tab=account-security
```

### Development mode

If you're using Vite for local development, and your dev server runs on port `5173`:

- Comment out any code related to the YouTrack environment (e.g., `YTApp.register()`).
- Then run:

```
npm run dev
```

- And open:
```
http://localhost:5173/widgets/sample-widget/
```

## Features <a name="features"></a>

- MAIN_MENU_ITEM integration
- Project listing via YouTrack REST API
- Boolean toggle with persisted state
- Refresh projects button
- Ring UI components for consistent look and feel

## Built Using <a name="built_using"></a>

- React
- TypeScript
- Ring UI
- YouTrack App SDK

## Author <a name="authors"></a>

- [Jakub Steć](https://github.com/jakubstec)
