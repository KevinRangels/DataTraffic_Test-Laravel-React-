<?php

use Illuminate\Http\Request;


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(["middleware" => "apikey.validate"], function () {
    Route::get('get_characters_for_api', 'AdminController@getDataApiCharacters');
    Route::get('get_locations_for_api', 'AdminController@getDataApiLocations');
    Route::get('clear_register', 'AdminController@clearRegisters');
    Route::get('dashboard', 'AdminController@getDataDashboard');

    Route::get('characters', 'CharactersController@getAllCharacters');
    Route::get('character/{id}', 'CharactersController@getCharacter');
    Route::get('locations', 'LocationsController@getAllLocations');
    Route::get('location/{id}', 'LocationsController@getLocation');
    // Episode CRUD
    Route::get('episodes', 'EpisodesController@getAllEpisodes');
    Route::get('episode/{id}', 'EpisodesController@getEpisode');
    Route::post('episode', 'EpisodesController@storeEpisode');
    Route::post('episode/{id}', 'EpisodesController@editEpisode');
    Route::delete('episode/{id}', 'EpisodesController@deleteEpisode');
});


