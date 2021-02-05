<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
    protected $fillable = [
        'id', 'name', 'air_date', 'episode'
    ];

    public function characters() {
        return $this->belongsToMany('App\Character');
    }
}
