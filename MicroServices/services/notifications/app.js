const express = require('express');
const app = express();
app.use(express.json());

let notifications = [
    { id: 1, type: 'email', recipient: 'ana@microciudad.com', subject: 'Bienvenida', status: 'sent' },
    { id: 2, type: 'sms', recipient: '+1234567890', message: 'Tu pedido está listo', status: 'pending' }
];

app.get('/health', (req, res) => {
    res.json({
        service: 'notifications',
        status: 'healthy',
        timestamp: new Date().toISOString(),
        notifications_sent: notifications.filter(n => n.status === 'sent').length,
        notifications_pending: notifications.filter(n => n.status === 'pending').length,
        message: '📧 Servicio de notificaciones operativo'
    });
});

app.get('/notifications', (req, res) => {
    res.json({
        service: 'notifications',
        data: notifications,
        stats: {
            total: notifications.length,
            sent: notifications.filter(n => n.status === 'sent').length,
            pending: notifications.filter(n => n.status === 'pending').length,
            failed: notifications.filter(n => n.status === 'failed').length
        }
    });
});

app.post('/notifications', (req, res) => {
    const newNotification = {
        id: Math.max(...notifications.map(n => n.id)) + 1,
        ...req.body,
        status: 'pending',
        created_at: new Date().toISOString()
    };
    
    notifications.push(newNotification);
    
    // Simular envío asíncrono
    setTimeout(() => {
        const notification = notifications.find(n => n.id === newNotification.id);
        if (notification) {
            notification.status = Math.random() > 0.1 ? 'sent' : 'failed';
            notification.sent_at = new Date().toISOString();
        }
    }, 2000);
    
    res.status(201).json({
        service: 'notifications',
        data: newNotification,
        message: 'Notificación en cola de envío'
    });
});

app.listen(3000, () => {
    console.log('📧 Servicio de Notificaciones corriendo en puerto 3000');
});
