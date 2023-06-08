<?php
use App\Models\Enseignant;
use Illuminate\Database\Eloquent\Factories\Factory;

class EnseignantFactory extends Factory
{
    protected $model = Enseignant::class;

    public function definition()
    {
        return [
            'nom' => $this->faker->firstName,
            'prenom' => $this->faker->lastName,
            'date_naissance' => $this->faker->dateTimeBetween('-50 years', '-30 years')->format('Y-m-d'),
            'genre' => $this->faker->randomElement(['homme', 'femme']),
            'adresse' => $this->faker->address,
            'specialite' => $this->faker->randomElement(['Mathématiques', 'Sciences', 'Langues', 'Histoire']),
        ];
    }
}

