<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddEmailToEleves extends Migration
{
    public function up()
    {
        Schema::table('eleves', function (Blueprint $table) {
            if (!Schema::hasColumn('eleves', 'email')) {
                $table->string('email')->nullable();
            }
        });
    }

    public function down()
    {
        Schema::table('eleves', function (Blueprint $table) {
            if (Schema::hasColumn('eleves', 'email')) {
                $table->dropColumn('email');
            }
        });
    }
}
