<?php
$host = getenv('MYSQL_HOST') ?: 'mysql';
$db = getenv('MYSQL_DATABASE') ?: 'mi_castillo';
$user = getenv('MYSQL_USER') ?: 'rey';
$pass = getenv('MYSQL_PASSWORD') ?: 'password_secreto';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo->query("SELECT * FROM usuarios ORDER BY created_at DESC");
    $usuarios = $stmt->fetchAll();
    
} catch(PDOException $e) {
    $usuarios = [];
    $error = $e->getMessage();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>👥 Usuarios del Castillo</title>
    <style>
        body { font-family: Arial; background: #2C3E50; color: white; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; }
        table { width: 100%; border-collapse: collapse; background: rgba(0,0,0,0.3); }
        th, td { padding: 10px; border: 1px solid #34495E; text-align: left; }
        th { background: #34495E; }
        .back { color: #3498DB; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <h1>👥 Gestión de Usuarios - Castillo Monolítico</h1>
        
        <?php if (isset($error)): ?>
            <p style="color: red;">Error: <?= $error ?></p>
        <?php endif; ?>
        
        <table>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Fecha</th>
            </tr>
            <?php foreach ($usuarios as $usuario): ?>
            <tr>
                <td><?= $usuario['id'] ?></td>
                <td><?= $usuario['nombre'] ?></td>
                <td><?= $usuario['email'] ?></td>
                <td><?= $usuario['rol'] ?></td>
                <td><?= $usuario['created_at'] ?></td>
            </tr>
            <?php endforeach; ?>
        </table>
        
        <p><a href="/" class="back">🏰 Volver al Castillo</a></p>
        
        <div style="margin-top: 30px; padding: 20px; background: rgba(0,0,0,0.3); border-radius: 8px;">
            <h3>🏗️ Características del Monolito:</h3>
            <ul>
                <li>✅ Todo en un solo lugar</li>
                <li>✅ Fácil de desarrollar inicialmente</li>
                <li>✅ Deployment simple</li>
                <li>⚠️ Difícil de escalar partes específicas</li>
                <li>⚠️ Un error puede tumbar todo</li>
            </ul>
        </div>
    </div>
</body>
</html>
