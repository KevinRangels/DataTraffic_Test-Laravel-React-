<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fillable = [
        'id', 'name', 'type', 'dimension'
    ];

    public function characters() {
        return $this->belongsToMany('App\Character');
    }
}
