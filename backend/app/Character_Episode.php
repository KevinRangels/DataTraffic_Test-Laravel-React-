<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Character_Episode extends Model
{
    protected $table = 'character_episode';
    protected $fillable = [
        'character_id', 'episode_id'
    ];
}
