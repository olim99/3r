const apiInput = document.getElementById('apiInput');
const loadButton = document.getElementById('loadButton');
const kartochki = document.getElementById('kartochki');

document.addEventListener('DOMContentLoaded', () => {
    fetch('./users.json')
        .then(res => {
            if (!res.ok) {
                throw new Error(`Failed to load users.json: ${res.status} ${res.statusText}`);
            }
            return res.json();
        })
        .then(data => {
            console.log('Loaded users from users.json:', data);
            renderCards(data);
        })
        .catch(error => {
            console.error('Error loading users.json:', error.message);
        });
});

loadButton.addEventListener('click', () => {
    const apiUrl = apiInput.value.trim();
    if (!apiUrl) {
        alert('Please enter a valid API URL');
        return;
    }

    console.log('Fetching data from:', apiUrl);

    fetch(apiUrl)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
            }
            return res.json();
        })
        .then(data => {
            console.log('API response:', data);
            renderCards(data, true);
        })
        .catch(error => {
            console.error('Error fetching API:', error.message);
            alert(`Failed to load data. Error: ${error.message}`);
        });
});


function renderCards(users, clear = false) {
    if (clear) {
        kartochki.innerHTML = '';
    }

    users.forEach(user => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${user?.name ?? 'No name'}</h3>
            <p><strong>Username:</strong> ${user?.username ?? 'No username'}</p>
            <p><strong>Email:</strong> ${user?.email ?? 'No email'}</p>
            <p><strong>Phone:</strong> ${user?.phone ?? 'No phone'}</p>
            <p><strong>Website:</strong> <a href="http://${user?.website}" target="_blank">${user?.website ?? 'No website'}</a></p>
            <p><strong>Company:</strong> ${user?.company?.name ?? 'No company'}</p>
            <p><strong>Catchphrase:</strong> "${user?.company?.catchPhrase ?? 'No catchphrase'}"</p>
            <p><strong>Address:</strong> ${user?.address?.street ?? 'No street'}, ${user?.address?.suite ?? ''}, ${user?.address?.city ?? 'No city'}, ${user?.address?.zipcode ?? 'No zipcode'}</p>
        `;
        kartochki.appendChild(card);
    });
}
