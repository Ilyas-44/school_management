<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Enseignant;
use App\Models\Eleve;


class Classe extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'niveau',
    ];

    public function eleves()
    {
        return $this->hasMany(Eleve::class);
    }

    public function enseignants()
    {
        return $this->belongsToMany(Enseignant::class);
    }
}
