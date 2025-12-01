# ShoreSquad

ShoreSquad is a web app that helps you rally your crew, track weather, and join or organize beach cleanups with ease. It features a live map, real-time weather alerts, volunteer signups, impact tracking, and a history of past cleanups—all in a fun, mobile-friendly interface.

## Features
- **Interactive Map:** See the next cleanup location and pin on a live map.
- **Live Weather Alerts:** Get real-time weather for Pasir Ris, Singapore, with safety alerts and recommendations.
- **Volunteer Signups:** Register yourself or your group for upcoming cleanups. See who else is joining!
- **Impact Tracker:** Log trash collected and watch your progress toward the community goal.
- **Past Cleanups:** View and log previous cleanup events, including location, date, trash collected, and volunteers.

## How to Run Locally
1. Clone or download this repository.
2. Open the `ShoreSquad` folder in VS Code.
3. Right-click `index.html` and select **Open with Live Server** (install the Live Server extension if needed).
4. The app will open in your browser at `http://localhost:5500` (or similar).

## How Weather & Storage Work
- **Weather:** Uses the OpenWeather API to fetch live weather for Pasir Ris. Alerts are shown for unsafe or ideal conditions.
- **Storage:** All signups, impact data, and past cleanups are saved in your browser's `localStorage` for persistence across sessions.

## Tech Stack
- HTML5, CSS3 (responsive, accessible, modern UI)
- JavaScript (ES6+)
- OpenWeather API (for weather data)
- localStorage (for persistent data)

## Credits
- Map: Google Maps Embed
- Weather: [OpenWeather](https://openweathermap.org/)
- Live Chat: Tawk.to
- UI: Custom, inspired by eco-action and youth engagement

## Future Feature Ideas
- User authentication and profiles
- Social sharing and event invites
- Admin dashboard for event organizers
- Export data to CSV/Excel
- Push notifications for weather or event changes

---

Made with 🌊 by the ShoreSquad team. Join us and make a difference!
