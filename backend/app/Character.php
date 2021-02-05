<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Character extends Model
{
    protected $fillable = [
        'id', 'name', 'status', 'species', 'type', 'gender', 'image'
    ];

    public function locations() {
        return $this->belongsToMany('App\Location');
    }
    public function episodes() {
        return $this->belongsToMany('App\Episode');
    }
}
