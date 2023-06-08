<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();
        $users = [
            [
                'name' => 'admin',
                'email' => 'admin@gmail.com',
                'password' => bcrypt('password'),
                'role' => 'Admin', // Assign the role 'Admin' to the user
            ],
            [
                'name' => 'enseignant1',
                'email' => 'enseignant@gmail.com',
                'password' => bcrypt('password'),
                'role' => 'Enseignant', // Assign the role 'Enseignant' to the user
            ],
            [
                'name' => 'eleve1',
                'email' => 'eleve@gmail.com',
                'password' => bcrypt('password'),
                'role' => 'Eleve', // Assign the role 'Enseignant' to the user
            ]
            ];


        foreach($users as $user){
            \App\Models\User::factory()->create($user);
        }
    }
}
