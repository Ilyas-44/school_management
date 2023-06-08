<?php
use App\Models\Classe;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClasseFactory extends Factory
{
    protected $model = Classe::class;

    public function definition()
    {
        return [
            'nom' => $this->faker->randomElement(['Première', 'Deuxième', 'Troisième']),
            'niveau' => $this->faker->randomElement(['Secondaire', 'Primaire']),
        ];
    }
}
