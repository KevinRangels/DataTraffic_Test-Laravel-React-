<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Location;

class LocationsController extends Controller
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

    public function getAllLocations() {
        $locations = Location::with('characters')->get();
        return $this->sendResponse($locations->toArray(), 'Locaciones obtenidas con exito.');
    }

    public function getLocation($id)
    {
        $location = Location::with('characters')->where('id', $id)->get();
        return $this->sendResponse($location->toArray(), 'Locacion obtenida con exito.');
    }
}
