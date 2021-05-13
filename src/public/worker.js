console.log('Service Worker')
let medical_record

self.addEventListener('push', e => {
    const data = e.data.json()
    medical_record = data.medical_record
    console.log(data)
    self.registration.showNotification(data.title, {
        body: data.message,
        icon: 'https://dogeseed.com/doge.2214a63a.svg',
        image: 'https://dogeseed.com/doge.2214a63a.svg',
        badge: 'https://dogeseed.com/doge.2214a63a.svg',
        tag: 'Some tag',
        data: 'Some data',
        actions: [
            {
                action: 'open-link',
                title: 'See patients data'
            },
        ]
    });
})

self.addEventListener('notificationclick', function(event) {
    let url = medical_record
    event.notification.close(); // Android needs explicit close.
    event.waitUntil(
        clients.matchAll({type: 'window'}).then( windowClients => {
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                // If so, just focus it.
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});