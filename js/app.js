// ShoreSquad App JS
// Placeholder for interactive features

document.addEventListener('DOMContentLoaded', () => {
                // Cleanup Impact logic
                const IMPACT_GOAL = 100;
                function getImpactTotal() {
                    let total = 0;
                    try {
                        total = Number(localStorage.getItem('shoreSquadImpact')) || 0;
                    } catch (e) { total = 0; }
                    return total;
                }
                function setImpactTotal(val) {
                    localStorage.setItem('shoreSquadImpact', String(val));
                }
                function renderImpact() {
                    const bar = document.getElementById('impact-progress-bar');
                    const label = document.getElementById('impact-progress-label');
                    const celebration = document.getElementById('impact-celebration');
                    let total = getImpactTotal();
                    let percent = Math.min(100, (total / IMPACT_GOAL) * 100);
                    if (bar) {
                        bar.style.width = percent + '%';
                    }
                    if (label) {
                        label.textContent = `${total.toFixed(1)} / ${IMPACT_GOAL} kg`;
                    }
                    if (celebration) {
                        if (total >= IMPACT_GOAL) {
                            celebration.textContent = '🎉 Cleanup goal reached! Amazing work, ShoreSquad!';
                            celebration.style.display = 'block';
                        } else {
                            celebration.textContent = '';
                            celebration.style.display = 'none';
                        }
                    }
                }
                // Initial render
                renderImpact();
                // Form logic
                const impactForm = document.getElementById('impact-form');
                if (impactForm) {
                    impactForm.addEventListener('submit', function(e) {
                        e.preventDefault();
                        const input = document.getElementById('trash-weight');
                        let val = parseFloat(input.value);
                        if (isNaN(val) || val <= 0) {
                            input.value = '';
                            input.placeholder = 'Enter a valid number';
                            return;
                        }
                        let total = getImpactTotal();
                        total += val;
                        setImpactTotal(total);
                        input.value = '';
                        renderImpact();
                    });
                }
            // Volunteers list logic
            function renderVolunteers() {
                const listDiv = document.getElementById('volunteer-list');
                const countSpan = document.getElementById('volunteer-count');
                if (!listDiv || !countSpan) return;
                let registrations = [];
                try {
                    registrations = JSON.parse(localStorage.getItem('shoreSquadRegs')) || [];
                } catch (e) { registrations = []; }
                let total = 0;
                listDiv.innerHTML = '';
                registrations.forEach((reg, idx) => {
                    const groupSize = Number(reg.group) || 1;
                    total += groupSize;
                    const card = document.createElement('div');
                    card.className = 'volunteer-card' + (idx % 2 === 1 ? ' alt' : '');
                    card.innerHTML = `
                        <span class="volunteer-name">${escapeHTML(reg.name)}</span>
                        <span class="volunteer-group">👥 ${groupSize}</span>
                        <span class="volunteer-date">${formatDate(reg.date)}</span>
                    `;
                    listDiv.appendChild(card);
                });
                countSpan.textContent = total;
            }

            // Escape HTML utility
            function escapeHTML(str) {
                return String(str).replace(/[&<>'"]/g, function(tag) {
                    const chars = {'&':'&amp;','<':'&lt;','>':'&gt;','\'':'&#39;','"':'&quot;'};
                    return chars[tag] || tag;
                });
            }

            // Format date utility
            function formatDate(dateStr) {
                if (!dateStr) return '';
                const d = new Date(dateStr);
                if (isNaN(d)) return dateStr;
                return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
            }

            // Initial render
            renderVolunteers();

            // Re-render after registration
            const regForm = document.getElementById('registration-form');
            if (regForm) {
                regForm.addEventListener('submit', function() {
                    setTimeout(renderVolunteers, 100); // allow localStorage update
                });
            }
        // Registration form logic
        const regForm = document.getElementById('registration-form');
        if (regForm) {
            regForm.addEventListener('submit', function(e) {
                e.preventDefault();
                // Get form values
                const name = document.getElementById('reg-name').value.trim();
                const email = document.getElementById('reg-email').value.trim();
                const group = document.getElementById('reg-group').value.trim();
                const date = document.getElementById('reg-date').value;
                const successDiv = document.getElementById('reg-success');

                // Validate
                if (!name || !email || !group || !date) {
                    showRegSuccess('Please fill in all fields.', true);
                    return;
                }
                if (!validateEmail(email)) {
                    showRegSuccess('Please enter a valid email address.', true);
                    return;
                }
                if (isNaN(group) || Number(group) < 1 || Number(group) > 99) {
                    showRegSuccess('Group size must be between 1 and 99.', true);
                    return;
                }

                // Store in localStorage
                const regData = { name, email, group: Number(group), date };
                let registrations = [];
                try {
                    registrations = JSON.parse(localStorage.getItem('shoreSquadRegs')) || [];
                } catch (e) { registrations = []; }
                registrations.push(regData);
                localStorage.setItem('shoreSquadRegs', JSON.stringify(registrations));

                // Show success
                regForm.reset();
                showRegSuccess("You're signed up! See you at the cleanup event 🌍");
            });
        }

        function showRegSuccess(msg, isError) {
            const div = document.getElementById('reg-success');
            if (div) {
                div.textContent = msg;
                div.style.display = 'block';
                div.style.background = isError ? 'var(--highlight)' : 'var(--accent)';
            }
        }

        function validateEmail(email) {
            // Simple email regex
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
    // Example: Show a welcome message
    const crewList = document.getElementById('crew-list');
    if (crewList) {
        crewList.innerHTML = '<p>Invite your friends to join your next cleanup!</p>';
    }

    // Fetch and display weather for Pasir Ris
    const weatherDiv = document.getElementById('weather');
    if (weatherDiv) {
        fetchWeather();
    }

    function fetchWeather() {
        // Insert your OpenWeather API key below
        const apiKey = 'YOUR_OPENWEATHER_API_KEY';
        const lat = 1.381497;
        const lon = 103.955574;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        // Show loading state
        updateWeatherUI({ loading: true });

        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                updateWeatherUI({
                    temp: Math.round(data.main.temp),
                    wind: Math.round(data.wind.speed),
                    humidity: data.main.humidity,
                    sky: data.weather[0].description,
                    error: null
                });
                updateWeatherAlert(data.weather[0]);
            })
            .catch(err => {
                updateWeatherUI({ error: 'Weather data unavailable. Please try again later.' });
                updateWeatherAlert(null, true);
            });
    }

    // Weather alert logic
    function updateWeatherAlert(weatherObj, error) {
        const alertDiv = document.getElementById('weather-alert');
        if (!alertDiv) return;
        let msg = '', type = '';
        if (error || !weatherObj) {
            alertDiv.style.display = 'none';
            alertDiv.className = 'weather-alert';
            return;
        }
        const main = (weatherObj.main || '').toLowerCase();
        const desc = (weatherObj.description || '').toLowerCase();
        if (main.includes('thunderstorm') || desc.includes('thunderstorm') || main.includes('heavy rain') || desc.includes('heavy rain')) {
            msg = '⚠ Unsafe weather conditions — Cleanup may be postponed';
            type = 'red';
        } else if (main.includes('rain') || desc.includes('rain') || main.includes('cloud') || desc.includes('cloud')) {
            if (main.includes('light') || desc.includes('light') || main.includes('cloud') || desc.includes('cloud')) {
                msg = '🌧 Bring ponchos + avoid deep water areas.';
                type = 'yellow';
            } else {
                msg = '⚠ Unsafe weather conditions — Cleanup may be postponed';
                type = 'red';
            }
        } else if (main.includes('clear') || desc.includes('clear') || main.includes('sun') || desc.includes('sun')) {
            msg = '☀ Perfect cleanup weather — stay hydrated!';
            type = 'green';
        }
        if (msg && type) {
            alertDiv.textContent = msg;
            alertDiv.className = `weather-alert show ${type}`;
            alertDiv.style.display = 'block';
        } else {
            alertDiv.style.display = 'none';
            alertDiv.className = 'weather-alert';
        }
    }

    function updateWeatherUI({ temp, wind, humidity, sky, error, loading }) {
        // Update temperature
        const tempEl = document.getElementById('weather-temp');
        const windEl = document.getElementById('weather-wind');
        const humidityEl = document.getElementById('weather-humidity');
        const skyEl = document.getElementById('weather-sky');

        if (loading) {
            if (tempEl) tempEl.textContent = '--';
            if (windEl) windEl.textContent = '--';
            if (humidityEl) humidityEl.textContent = '--';
            if (skyEl) skyEl.textContent = '--';
            setWeatherError('Loading weather...');
            return;
        }

        if (error) {
            if (tempEl) tempEl.textContent = '--';
            if (windEl) windEl.textContent = '--';
            if (humidityEl) humidityEl.textContent = '--';
            if (skyEl) skyEl.textContent = '--';
            setWeatherError(error);
            return;
        }

        if (tempEl) tempEl.textContent = temp !== undefined ? temp : '--';
        if (windEl) windEl.textContent = wind !== undefined ? wind : '--';
        if (humidityEl) humidityEl.textContent = humidity !== undefined ? humidity : '--';
        if (skyEl) skyEl.textContent = sky ? capitalizeFirst(sky) : '--';
        setWeatherError('');
    }

    function setWeatherError(msg) {
        let errEl = document.getElementById('weather-error');
        if (!errEl) {
            errEl = document.createElement('div');
            errEl.id = 'weather-error';
            errEl.style.color = '#fff';
            errEl.style.background = 'rgba(255,111,97,0.85)';
            errEl.style.borderRadius = '6px';
            errEl.style.margin = '0.5em 0 0 0';
            errEl.style.padding = '0.4em 0.8em';
            errEl.style.fontWeight = 'bold';
            errEl.style.fontSize = '1em';
            weatherDiv.appendChild(errEl);
        }
        errEl.textContent = msg;
        errEl.style.display = msg ? 'block' : 'none';
    }

    function capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
});