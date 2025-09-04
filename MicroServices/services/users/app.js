const express = require('express');
const app = express();
app.use(express.json());

// Simulando base de datos en memoria
let users = [
    { id: 1, name: 'Ana DevOps', email: 'ana@microciudad.com', role: 'admin' },
    { id: 2, name: 'Carlos Container', email: 'carlos@microciudad.com', role: 'user' },
    { id: 3, name: 'María Micro', email: 'maria@microciudad.com', role: 'user' }
];

// Health check
app.get('/health', (req, res) => {
    res.json({
        service: 'users',
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        message: '👤 Servicio de usuarios funcionando perfectamente'
    });
});

// Listar usuarios
app.get('/users', (req, res) => {
    res.json({
        service: 'users',
        data: users,
        count: users.length
    });
});

// Obtener usuario por ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ service: 'users', data: user });
});

// Crear usuario
app.post('/users', (req, res) => {
    const newUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...req.body
    };
    users.push(newUser);
    res.status(201).json({ service: 'users', data: newUser });
});

app.listen(3000, () => {
    console.log('👤 Servicio de Usuarios corriendo en puerto 3000');
});
