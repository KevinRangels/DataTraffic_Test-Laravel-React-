<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use App\Character;
use App\Location;
use App\Episode;
use App\Character_Location;
use GuzzleHttp\Client;
use DB;

class AdminController extends Controller
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

    public function getDataApiCharacters() {
        Schema::disableForeignKeyConstraints();
        DB::table('characters')->truncate();
        DB::table('character_location')->truncate();
        Schema::enableForeignKeyConstraints();

        $client = new Client([
            'base_uri' => 'https://rickandmortyapi.com/api/',
            'timeout'  => 9.0,
        ]);
        for ($i=1; $i < 5; $i++) { 
            $url = 'character?page='.$i;
            $response = $client->request('GET', $url);
    
            $response = $response->getBody()->getContents();
            $response = json_decode($response);
    
            foreach ($response->results as $key => $value) {
              $character = new Character();
              $character->name = $value->name;
              $character->status = $value->status;
              $character->species = $value->species;
              $character->type = $value->type;
              $character->gender = $value->gender;
              $character->image = $value->image;
              $character->save();

              //   Save Relations with Location
              if ($value->location->url !== "") {
                $getIdLocation = explode("https://rickandmortyapi.com/api/location/", $value->location->url);
                $getIdLocation = $getIdLocation[1];
                $idLocation = intval($getIdLocation);
              } else {
                $idLocation = 0;
              }
              
              $characterLocation = new Character_Location();
              $characterLocation->character_id = $character->id;
              $characterLocation->location_id = $idLocation;
              $characterLocation->save();
            }
        }

        return $this->sendResponse([], 'Characters Save');

    }

    public function getDataApiLocations() {
        Schema::disableForeignKeyConstraints();
        DB::table('locations')->truncate();
        Schema::enableForeignKeyConstraints();
        $client = new Client([
            'base_uri' => 'https://rickandmortyapi.com/api/',
            'timeout'  =>  9.0,
        ]);
        $character = new Location();
        $character->id = 0;
        $character->name = "unknown";
        $character->type = "unknown";
        $character->dimension = "unknown";
        $character->save();
        for ($i=1; $i < 7; $i++) { 
            $url = 'location?page='.$i;
            $response = $client->request('GET', $url);
    
            $response = $response->getBody()->getContents();
            $response = json_decode($response);
    
            foreach ($response->results as $key => $value) {
              $character = new Location();
              $character->name = $value->name;
              $character->type = $value->type;
              $character->dimension = $value->dimension;
              $character->save();
            }
        }

        return $this->sendResponse([], 'Location Save');

    }
    public function clearRegisters() {
        Schema::disableForeignKeyConstraints();
        DB::table('characters')->truncate();
        DB::table('locations')->truncate();
        DB::table('character_location')->truncate();
        Schema::enableForeignKeyConstraints();

        return $this->sendResponse([], 'Registers clear');
    }

    public function getDataDashboard() {
        $locations = Location::count();
        $episodes = Episode::count();
        $characters = Character::count();
        $obj = new \stdClass();
        $obj->locations = $locations;
        $obj->episodes = $episodes;
        $obj->characters = $characters;

        return $this->sendResponse($obj, 'Dashboard data');
    }

}
