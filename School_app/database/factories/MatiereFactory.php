<?php
use App\Models\Matiere;
use App\Models\Enseignant;
use Illuminate\Database\Eloquent\Factories\Factory;

class MatiereFactory extends Factory
{
    protected $model = Matiere::class;

    public function definition()
    {
        return [
            'nom' => $this->faker->randomElement(['Mathématiques', 'Sciences', 'Français', 'Anglais']),
            'enseignant_id' => Enseignant::factory()->create()->id,
        ];
    }
}
