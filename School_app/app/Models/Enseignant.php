<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Classe;


class Enseignant extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'prenom',
        'date_de_naissance',
        'adresse',
        'email',
        'telephone',
        'password',
    ];

    public function matieres()
    {
        return $this->hasMany(Matiere::class);
    }

    public function classes()
    {
        return $this->belongsToMany(Classe::class);
    }
}
