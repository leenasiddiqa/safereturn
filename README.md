# SafeReturn (Prototype)

A simple React + Vite front-end prototype for a university Lost & Found portal. Data persists in localStorage only (no backend). Includes modules for Lost, Found, Claim & Verification, Donation & Important Documents, and Admin.

## 🚀 Features

- Report lost and found items with details (name, brand, category, description, location)
- Hidden identifiers (for lost items) for later claim verification
- Important document flag for found reports (IDs, CNIC, university cards)
- Basic matching to surface potential counterpart items
- Claims with simple auto-approval if hints match; admin finalization
- Auto-processing after 30 days: general items marked for donation; important docs for secure delivery
- Simple admin dashboard for reviewing claims and activity logs

## 🧰 Getting Started

**Prerequisites:** Node 18+ recommended.

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```
