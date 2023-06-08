<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateElevesTable extends Migration
{
    public function up()
    {
        Schema::create('eleves', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('prenom');
            $table->date('date_de_naissance')->nullable();
            $table->string('adresse');
            $table->string('email');
            $table->string('telephone');
            $table->unsignedBigInteger('classe_id'); // ajout de la colonne pour la clé étrangère
            $table->foreign('classe_id')->references('id')->on('classes'); // contrainte de clé étrangère
            $table->timestamps();
                   });
    }

    public function down()
    {
        Schema::dropIfExists('eleves');
        
    }
}
