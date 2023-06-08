<?php
use App\Models\Eleve;
use App\Models\Classe;
use Illuminate\Database\Eloquent\Factories\Factory;

class EleveFactory extends Factory
{
    protected $model = Eleve::class;

    public function definition()
    {
        return [
            'nom' => $this->faker->firstName,
            'prenom' => $this->faker->lastName,
            'date_naissance' => $this->faker->dateTimeBetween('-20 years', '-5 years')->format('Y-m-d'),
            'genre' => $this->faker->randomElement(['homme', 'femme']),
            'adresse' => $this->faker->address,
            'classe_id' => Classe::factory()->create()->id,
        ];
    }
}
