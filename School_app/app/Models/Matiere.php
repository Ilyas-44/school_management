<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matiere extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'enseignant_id',
    ];

    public function enseignant()
    {
        return $this->belongsTo(Enseignant::class);
    }
}
