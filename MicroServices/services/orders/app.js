const express = require('express');
const app = express();
app.use(express.json());

let orders = [
    { id: 1, userId: 1, productId: 1, quantity: 2, status: 'completed', total: 199.98 },
    { id: 2, userId: 2, productId: 2, quantity: 1, status: 'pending', total: 299.99 }
];

// Función para comunicarse con otros servicios
async function callService(serviceUrl, path) {
    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(`${serviceUrl}${path}`);
        return await response.json();
    } catch (error) {
        return { error: 'Servicio no disponible', details: error.message };
    }
}

app.get('/health', (req, res) => {
    res.json({
        service: 'orders',
        status: 'healthy',
        timestamp: new Date().toISOString(),
        orders_count: orders.length,
        message: '🛒 Servicio de pedidos procesando órdenes'
    });
});

app.get('/orders', async (req, res) => {
    // Enriquecer órdenes con datos de usuarios y productos
    const enrichedOrders = [];
    
    for (let order of orders) {
        const user = await callService(process.env.USER_SERVICE_URL, `/users/${order.userId}`);
        const product = await callService(process.env.PRODUCT_SERVICE_URL, `/products/${order.productId}`);
        
        enrichedOrders.push({
            ...order,
            user_info: user.data || 'Usuario no disponible',
            product_info: product.data || 'Producto no disponible'
        });
    }
    
    res.json({
        service: 'orders',
        data: enrichedOrders,
        message: 'Órdenes enriquecidas con datos de otros servicios'
    });
});

app.post('/orders', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    
    // Verificar que el usuario existe
    const user = await callService(process.env.USER_SERVICE_URL, `/users/${userId}`);
    if (user.error) {
        return res.status(400).json({ error: 'Usuario no válido' });
    }
    
    // Verificar que el producto existe
    const product = await callService(process.env.PRODUCT_SERVICE_URL, `/products/${productId}`);
    if (product.error) {
        return res.status(400).json({ error: 'Producto no válido' });
    }
    
    const newOrder = {
        id: Math.max(...orders.map(o => o.id)) + 1,
        userId,
        productId,
        quantity,
        status: 'pending',
        total: product.data.price * quantity,
        created_at: new Date().toISOString()
    };
    
    orders.push(newOrder);
    
    res.status(201).json({
        service: 'orders',
        data: newOrder,
        message: 'Orden creada exitosamente'
    });
});

app.listen(3000, () => {
    console.log('🛒 Servicio de Pedidos corriendo en puerto 3000');
});
