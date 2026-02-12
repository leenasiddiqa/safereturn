# SafeReturn (Prototype)

A simple React + Vite front-end prototype for a university Lost & Found portal. Data persists in localStorage only (no backend). Includes modules for Lost, Found, Claim & Verification, Donation & Important Documents, and Admin.

<<<<<<< HEAD
## 🚀 Features
=======
## Features
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4

- Report lost and found items with details (name, brand, category, description, location)
- Hidden identifiers (for lost items) for later claim verification
- Important document flag for found reports (IDs, CNIC, university cards)
- Basic matching to surface potential counterpart items
- Claims with simple auto-approval if hints match; admin finalization
- Auto-processing after 30 days: general items marked for donation; important docs for secure delivery
- Simple admin dashboard for reviewing claims and activity logs

<<<<<<< HEAD
## 🧰 Getting Started

**Prerequisites:** Node 18+ recommended.

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```
=======
## Getting started

Prerequisites: Node 18+ recommended.

Install dependencies and start the dev server:

```powershell
npm install
npm run dev
```

Then open the URL shown (typically http://localhost:5173).

Build for production:

```powershell
npm run build
npm run preview
```

## Notes

- This is a front-end only demo; no authentication or server storage.
- Admin actions are available to any user in this prototype.
- 30-day logic is simulated by logging items that have aged; donation/delivery are represented in logs and Donation page lists.
- You can clear browser storage to reset: Application > Local Storage > safereturn:v1.

## Next steps

- Hook up a backend (REST or Firebase) for persistence and auth (roles: User, Admin)
- Add real notifications to owners when matches or claim updates occur
- Stronger matching (fuzzy match, image support)
- Audit trail export and report generation
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
