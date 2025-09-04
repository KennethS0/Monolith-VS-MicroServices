const express = require('express');
const app = express();
app.use(express.json());

let products = [
    { id: 1, name: 'Docker Desktop', price: 99.99, stock: 50, category: 'software' },
    { id: 2, name: 'Kubernetes Cluster', price: 299.99, stock: 10, category: 'infrastructure' },
    { id: 3, name: 'Microservice License', price: 49.99, stock: 100, category: 'software' }
];

app.get('/health', (req, res) => {
    res.json({
        service: 'products',
        status: 'healthy',
        timestamp: new Date().toISOString(),
        inventory_count: products.length,
        message: '📦 Servicio de productos con inventario actualizado'
    });
});

app.get('/products', (req, res) => {
    res.json({
        service: 'products',
        data: products,
        total_value: products.reduce((sum, p) => sum + (p.price * p.stock), 0)
    });
});

app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ service: 'products', data: product });
});

app.post('/products', (req, res) => {
    const newProduct = {
        id: Math.max(...products.map(p => p.id)) + 1,
        ...req.body
    };
    products.push(newProduct);
    res.status(201).json({ service: 'products', data: newProduct });
});

app.listen(3000, () => {
    console.log('📦 Servicio de Productos corriendo en puerto 3000');
});
