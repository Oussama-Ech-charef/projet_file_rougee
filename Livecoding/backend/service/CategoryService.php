<?php

require_once __DIR__ . '/../dao/CategoryDao.php';
require_once 'BeseSerevice.php';

class CategoryService extends BeseSerevice {
    private CategoryDao $gestion;


    public function __construct()
    {
        $this->gestion = new CategoryDao();
    }


    public function listCate() {

        $data = [];

        $categories = $this->gestion->afficherTous();

        foreach ($categories as $item) {
            $data [] = [
                "id" => $item->getId(),
                "nom" => $item->getNom(),
                "desc" => $item->getDesc()

            ];
        }

        return $data;

    }


    public function ajoutCat() {
        $input = json_decode(file_get_contents('php://input'), true);


        try {
            $this->gestion->ajouter($input['nom'], $input['desc']);
            return ['success' => true];
        } catch (Exception $e) {
            return ['success' => false, 'message' => $e->getMessage()];

        }
    }


}