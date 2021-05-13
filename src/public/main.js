const PUBLIC_VAPID_KEY = 'BPokh3SbDex6NBXqXVl2a-8pAtm2g1tZUDzzBq0AYNdA7PZZF6SeNUNwhNBdtPE2d0aGf8rF3NWsg5twRjpKYLA'

function urlBase64ToUint8Array(base64String){
    const padding = '='.repeat((4 - base64String.lenght % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/-/g, '/');
    
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; i++){
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

async function clientArrived(){
    console.log("Working!")
    await fetch('/client',{
        method: 'POST'
    });
}


const subscription = async() => {
    
    // Service Worker
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    console.log('New Service Worker!');

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
    });

    console.log(subscription)

    await fetch('/subscription', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log('Subscribed!')
}

subscription();