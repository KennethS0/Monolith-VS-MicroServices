<?php
$host = getenv('MYSQL_HOST') ?: 'mysql';
$db = getenv('MYSQL_DATABASE') ?: 'mi_castillo';
$user = getenv('MYSQL_USER') ?: 'rey';
$pass = getenv('MYSQL_PASSWORD') ?: 'password_secreto';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Contar visitantes (funcionalidad del castillo)
    $stmt = $pdo->prepare("INSERT INTO visitantes (ip, timestamp) VALUES (?, NOW())");
    $stmt->execute([$_SERVER['REMOTE_ADDR']]);
    
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM visitantes");
    $total_visitantes = $stmt->fetch()['total'];
    
} catch(PDOException $e) {
    $total_visitantes = "Error conectando al castillo";
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>🏰 El Castillo Monolítico</title>
    <style>
        body { 
            font-family: Arial; 
            background: linear-gradient(45deg, #8B4513, #D2691E);
            color: white; 
            text-align: center; 
            padding: 50px;
        }
        .castillo { 
            background: rgba(0,0,0,0.7); 
            padding: 30px; 
            border-radius: 15px; 
            margin: 20px auto; 
            max-width: 600px;
        }
        .funcionalidad {
            background: rgba(255,255,255,0.1);
            margin: 10px;
            padding: 15px;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <div class="castillo">
        <h1>🏰 Bienvenido al Castillo Monolítico</h1>
        <p><strong>Arquitectura:</strong> Todo-en-Uno (LAMP Stack)</p>
        
        <div class="funcionalidad">
            <h3>👑 Funcionalidades del Castillo</h3>
            <p>🚪 Portal Web: ¡Activo!</p>
            <p>🧮 Lógica de Negocio: ¡Funcionando!</p>
            <p>🗄️ Base de Datos: ¡Conectada!</p>
            <p>📊 Contador de Visitantes: <?= $total_visitantes ?></p>
        </div>
        
        <div class="funcionalidad">
            <h3>📈 Panel de Control del Reino</h3>
            <p><a href="/usuarios.php" style="color: #FFD700;">👥 Gestión de Usuarios</a></p>
            <p><a href="/productos.php" style="color: #FFD700;">📦 Inventario Real</a></p>
            <p><a href="/reportes.php" style="color: #FFD700;">📊 Reportes del Reino</a></p>
        </div>
        
        <p><em>"Un castillo, mil funcionalidades. ¿Para qué más?" - El Rey Monolito</em></p>
    </div>
</body>
</html>
