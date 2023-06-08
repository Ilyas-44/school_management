<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Classe;

class Eleve extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'prenom',
        'date_de_naissance',
        'adresse',
        'email',
        'telephone',
        'classe_id',
        'password',
    ];

    public function classe()
    {
        return $this->belongsTo(Classe::class);
    }
}
