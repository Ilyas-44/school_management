<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMatieresTable extends Migration
{
    public function up()
    {
        Schema::create('matieres', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->unsignedBigInteger('enseignant_id');
            $table->timestamps();
            $table->foreign('enseignant_id')->references('id')->on('enseignants');
        });
    }

    public function down()
    {
        Schema::dropIfExists('matieres');
    }
}
