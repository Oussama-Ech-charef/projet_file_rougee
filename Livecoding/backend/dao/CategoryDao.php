<?php
require_once __DIR__ . '/../classes/Category.php';


class CategoryDao {
    private static $datafile = __DIR__ . '/../data/category.json' ;
    public function afficherTous(){
        $content = file_get_contents(self::$datafile);
        $data = json_decode($content, true);
        $categoryes = [];

        foreach ($data as $item) {
            $categoryes[] = new Category($item['id'], $item['nom'], $item['desc']);
        }
        return $categoryes;
    }


    public function ajouter($nom, $desc) {
        $data = [];
        $categoryes = $this->afficherTous();
        $id = count($categoryes) + 1;
        $categoryes[] = new Category($id, $nom,$desc);

        if ($nom == "" || $desc == "") {
            throw new Exception('inpute is empty');
        }

         foreach ($categoryes as $item) {
            $data [] = [
                "id" => $item->getId(),
                "nom" => $item->getNom(),
                "desc" => $item->getDesc()

            ];
        }
        file_put_contents(self::$datafile, json_encode($data, JSON_PRETTY_PRINT));

    }

    
}