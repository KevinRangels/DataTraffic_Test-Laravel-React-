<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Character;

class CharactersController extends Controller
{
    public function sendResponse($result, $message)
    {
        $response = [
            'success' => true,
            'data'    => $result,
            'message' => $message,
        ];

        return response()->json($response, 200);
    }

    public function getAllCharacters() {
        $characters = Character::with('locations')->get();
        return $this->sendResponse($characters->toArray(), 'Personajes obtenido con exito.');
    }

    public function getCharacter($id)
    {
        $character = Character::with('locations')->where('id', $id)->get();
        return $this->sendResponse($character->toArray(), 'Personaje obtenido con exito.');
    }
}
