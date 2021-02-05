<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Character_Location extends Model
{
    protected $table = 'character_location';
    protected $fillable = [
        'character_id', 'location_id'
    ];
}
