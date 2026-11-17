<?php


require_once __DIR__ . '/../service/CategoryService.php';
header('Content-Type: application/json');


$methode = $_SERVER['REQUEST_METHOD'];
$service = new CategoryService;

if ($methode == 'GET') {
    echo json_encode($service->listCate());
}

if ($methode == 'POST') {
    echo json_encode($service->ajoutCat());
}