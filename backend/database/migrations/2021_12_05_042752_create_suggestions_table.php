<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSuggestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('suggestions', function (Blueprint $table) {
            $table->id();
            $table->string('word');
            $table->longText('suggestion');
            $table->bigInteger('frequency');
            $table->timestamps();
        });

        // DB::table('suggestions')->insert(
        //     [
        //         [
        //             'word' => '',
        //             'suggestion' => '',
        //             'frequency' => ''
        //         ],        
        //         [
        //             'word' => '',
        //             'suggestion' => '',
        //             'frequency' => ''
        //         ], 
        //         [
        //             'word' => '',
        //             'suggestion' => '',
        //             'frequency' => ''
        //         ], 
        //         [
        //             'word' => '',
        //             'suggestion' => '',
        //             'frequency' => ''
        //         ], 
        //         [
        //             'word' => '',
        //             'suggestion' => '',
        //             'frequency' => ''
        //         ]
        //     ]
        // );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('suggestions');
    }
}
