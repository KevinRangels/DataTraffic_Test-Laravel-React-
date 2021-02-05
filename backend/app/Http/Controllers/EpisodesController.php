<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Episode;
use App\Character_Episode;


class EpisodesController extends Controller
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

    public function sendError($error, $errorMessages = [], $code = 404)
    {
        $response = [
            'success' => false,
            'message' => $error,
        ];

        if (!empty($errorMessages)) {
            $response['data'] = $errorMessages;
        }
        return response()->json($response, $code);
    }
    public function getAllEpisodes()
    {
        $episode = Episode::with('characters')->get();
        return $this->sendResponse($episode->toArray(), 'Episodes obtenido con exito.');
    }

    public function getEpisode($id)
    {
        $episode = Episode::with('characters')->where('id', $id)->get();
        return $this->sendResponse($episode->toArray(), 'Episode obtenido con exito.');
    }

    public function storeEpisode(Request $request)
    {
        // $validator = Validator::make($input, [
        //     'technology_id' => 'required',
        //     'name' => 'required',
        //     'description' => 'required',
        //     'contribution' => 'required',
        //     'link' => 'required',
        //     'img_url' => 'required'
        // ]);
        // if ($validator->fails()) {
        //     return $this->sendError('Validation Error.', $validator->errors());
        // }
        
        // $characterEpisode = new Character_Episode();
        // dd($characterEpisode);

          $episode = new Episode();
          $episode->name = $request->get('name');
          $episode->air_date = $request->get('air_date');
          $episode->episode = $request->get('episode');
          
          $episode->save();
         // Save Technologies
         $characters = $request->get('characters');
         $characters = explode(",", $characters);
         foreach ($characters as $key => $value) {
           $characterEpisode = new Character_Episode();
           $characterEpisode->character_id = $value;
           $characterEpisode->episode_id = $episode->id;
           $characterEpisode->save();
        }

        return $this->sendResponse($episode->toArray(), 'Episode created successfully.');
    }

    public function editEpisode($id, Request $request)
    {
        // $input = $request->all();

        // $validator = Validator::make($input, [
        //     // 'technology_id' => 'required',
        //     'name' => 'required',
        //     'description' => 'required',
        //     'contribution' => 'required'
        // ]);

        // if ($validator->fails()) {
        //     return $this->sendError('Validation Error.', $validator->errors());
        // }

        $episode = Episode::findOrFail($id);
        // Save Technologies
        Character_Episode::where('episode_id', $episode->id)->delete();
        $characters = $request->get('characters');
        $characters = explode(",", $characters);
        foreach ($characters as $key => $value) {
           $characterEpisode = new Character_Episode();
           $characterEpisode->character_id = $value;
           $characterEpisode->episode_id = $episode->id;
           $characterEpisode->save();
        }
        // Update Episode
        $episode->update($request->all());
        $episode->request = $request->all();

        return $this->sendResponse($episode->toArray(), 'Episode actualizado con exito.');
    }

    public function deleteEpisode($id)
    {
        $episode = Episode::findOrFail($id);
        Character_Episode::where('episode_id', $episode->id)->delete();
        $episode->delete();
        return $this->sendResponse($episode->toArray(), 'Episode deleted successfully.');
    }
}
