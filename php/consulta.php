<?php

require_once 'conexao.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'sucesso' => false,
        'erro' => 'Envie os dados via formulario (POST).'
    ]);
    exit;
}
$email = trim($_POST['email'] ?? '');

if ($email === '') {
    http_response_code(422);
    echo json_encode([
        'sucesso' => false,
        'erro' => 'O campo "email" é obrigatorio.'
    ]);
    exit;
}

try {
    $pdo->exec('USE `' . DB_NAME . '`');

    $stmt = $pdo->prepare('SELECT id, nome, email, endereco FROM `cadastros` WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);

    $cadastro = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$cadastro) {
        http_response_code(404);
        echo json_encode([
            'sucesso' => false,
            'erro' => 'Cadastro não encontrado'
        ]);
        exit;
    }

    echo json_encode([
        'sucesso' => true,
        'cadastro' => [
            'id' => (int) $cadastro['id'],
            'nome' => $cadastro['nome'],
            'email' => $cadastro['email'],
            'endereco' => $cadastro['endereco']
        ]
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'sucesso' => false,
        'erro' => $e->getMessage()
    ]);
}