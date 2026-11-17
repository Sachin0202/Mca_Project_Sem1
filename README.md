# Smart Web Server Log Management System (LogMonitor)
> **MCA Final-Year Academic Project**  
> An enterprise-grade, modern, responsive Web Server Log Management & Incident Analytics Dashboard built with **React.js, Vite, and Recharts**.

---

## 📌 Project Overview

**LogMonitor** is a web-based server observability and log intelligence dashboard designed for systems administrators, DevOps engineers, and security analysts to monitor, parse, visualize, and debug web server access logs (Apache, Nginx, Spring Boot).

### Key Capabilities:
- **Real-Time Traffic Monitoring**: Track incoming server transactions, success/failure proportions, and throughput.
- **HTTP Error Diagnostics**: Deep-dive analytics into 4xx client errors (404, 401, 403) and 5xx backend server exceptions (500, 502, 503).
- **Interactive Log Explorer**: Full-text searching, multi-criteria filtering (status code, severity, method), sorting, pagination, and modal stack-trace inspection.
- **System Anomaly & Incident Alerts**: Proactive threshold alerting, anomaly rules, resolve/reopen lifecycle, and alert deletion.
- **Log File Ingestion & Parsing**: Drag-and-drop simulated parser for offline `.log` and `.txt` files with progress bar and batch history.
- **Telemetry & Audit Reports**: Daily, weekly, and monthly trend reports with direct CSV export and PDF preview print generation.
- **Administrator User Management**: Role-based access control (RBAC), user account management modal (Add, Edit, Delete).
- **System Configuration**: Alerting thresholds, retention policies, polling rates, and appearance preferences.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 18 (Functional Components, React Hooks)
- **Build Tool**: Vite 5 (Lightning-fast HMR and optimized production bundles)
- **Styling**: Pure Custom CSS3 (CSS Variables, Flexbox, CSS Grid — **No Bootstrap, No Tailwind**)
- **Routing**: React Router DOM v6
- **Data Visualization**: Recharts (Interactive Area Charts, Donut Charts, Bar Charts, Line Charts)
- **Icons**: Lucide React
- **HTTP Client**: Axios (configured with baseURL `http://localhost:8080/api` ready for Spring Boot)

---

## 📂 Project Directory Structure

```
log_management/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx                     # Application bootstrap & CSS imports
    ├── App.jsx                      # Route definitions
    │
    ├── assets/                      # Static logos & brand assets
    │
    ├── components/                  # Reusable UI component library
    │   ├── Sidebar.jsx              # Collapsible dark navy sidebar with Lucide icons
    │   ├── Navbar.jsx               # Top bar with toggle, live date, notifications & profile
    │   ├── StatCard.jsx             # Metric card with icons, large numbers & % trend
    │   ├── ChartCard.jsx            # Card container for Recharts with custom tooltips
    │   ├── DataTable.jsx            # Generic paginated, sortable data table
    │   ├── SearchBar.jsx            # Debounced search input with clear button
    │   ├── Modal.jsx                # Accessible modal dialog with backdrop blur
    │   └── StatusBadge.jsx          # Semantic badges for severity, methods & HTTP codes
    │
    ├── data/                        # Realistic server log datasets
    │   ├── dashboardData.js         # Summary KPIs, hourly/weekly trends & status breakdowns
    │   ├── logsData.js              # 30+ comprehensive HTTP log records with payloads
    │   ├── alertsData.js            # Active & resolved security incident alerts
    │   └── usersData.js             # Administrator operators & role permissions
    │
    ├── layouts/
    │   └── MainLayout.jsx           # Master layout integrating Sidebar, Navbar & modals
    │
    ├── pages/                       # 8 Complete Academic Project Pages
    │   ├── Dashboard.jsx            # Overview telemetry, charts, top errors & system status
    │   ├── Logs.jsx                 # Full log table, search, filters & stack trace modal
    │   ├── ErrorAnalysis.jsx        # 4xx vs 5xx timeline, distribution & root-cause mitigation
    │   ├── Alerts.jsx               # Active incident queue, resolve action & rule creator
    │   ├── LogUpload.jsx            # Drag-and-drop file upload, progress bar & batch history
    │   ├── Reports.jsx              # Audit summaries, KPI bar & functional CSV export
    │   ├── Users.jsx                # RBAC user management, Add/Edit/Delete modals
    │   └── Settings.jsx             # Profile settings, alert thresholds & retention rules
    │
    ├── services/
    │   └── api.js                   # Axios client & future Spring Boot integration layer
    │
    └── styles/
        ├── global.css               # Design system, CSS variables, typography & resets
        ├── components.css           # Navigation, sidebar, cards, tables & modal styling
        ├── dashboard.css            # Grid layouts, metrics, upload zone & switch toggles
        └── responsive.css           # Media queries for desktop, tablet, and mobile
```

---

## 🚀 How to Run the Application

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### 2. Install Dependencies (if not already installed)
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:3000
```

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## 🔌 Future Backend Integration (Spring Boot & MySQL)

The frontend is built according to professional decoupled architecture principles:
1. All HTTP requests are centralized in `src/services/api.js`.
2. The Axios client is initialized with:
   ```javascript
   baseURL: 'http://localhost:8080/api'
   ```
3. To attach a real Spring Boot + MySQL backend:
   - Change `USE_MOCK = false` in `src/services/api.js` (or leave as fallback).
   - Expose the matching REST controller endpoints (`/api/dashboard/summary`, `/api/logs`, `/api/alerts`, `/api/users`, etc.).
   - The frontend automatically sends JWT tokens via the Axios request interceptor (`Authorization: Bearer <token>`).

---

## 🎓 Academic Project Highlights (For Viva & Presentation)

1. **Enterprise UI/UX Design**: Uses a clean dark-navy sidebar with white/slate cards, color-coded HTTP statuses, and fluid micro-interactions.
2. **Dynamic Data Filtering & Sorting**: Instant multi-condition querying on the frontend without UI locking.
3. **Realistic Telemetry Simulation**: Complete HTTP traces including User-Agents, IP Geolocation, payloads, and Spring Boot exception stack traces (`NullPointerException`, `HikariCP Pool Timeout`).
4. **Complete Responsive Layout**: Tested across mobile screens, tablets, and full-resolution desktop monitors.
