const { Router } = require('express');
const router = Router();


const webpush = require('../webpush');
let pushSubscription;

router.post('/client', async (req, res) => {
    res.status(200).json();

    const payload = JSON.stringify({
        title: 'Client Arrived!',
        message: 'Doctor is Gibran',
        medical_record: 'https://www.youtube.com/watch?v=Ab6E2BsuLJ0&ab_channel=7clouds'
    });

    try {
        await webpush.sendNotification(pushSubscription, payload)
    }catch(error){
        console.log(error)
    }

});

router.post('/subscription', async (req, res) => {
    pushSubscription = req.body
    res.status(200).json();

    // const payload = JSON.stringify({
    //     title: 'My Custom Notification',
    //     message: 'Hello World'
    // });

    // try {
    //     await webpush.sendNotification(pushSubscription, payload)
    // }catch(error){
    //     console.log(error)
    // }

});

module.exports = router;