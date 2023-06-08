<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ClasseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EnseignantController;
use App\Http\Controllers\MatiereController;
use App\Http\Controllers\EleveController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\AuthController;

Route::resource('classes',ClasseController::class);
Route::resource('enseignants', EnseignantController::class);
Route::resource('matieres', MatiereController::class);
Route::resource('eleves', EleveController::class);
Route::resource('notes', NoteController::class);
Route::resource('admins', AdminController::class);
Route::get('/notes/etudaint/{id}',[NoteController::class,'notesDeEtudiant']);
Route::get('/notes/etudaint/{id}',[NoteController::class,'notesDeEtudiant']);
Route::get('/eleve/classe/{id}',[EleveController::class,'getElevesByClasseId']);
Route::get('/enseignant/Matiere_List/{enseignantId}', [MatiereController::class,'getByEnseignantId']);
Route::post('/login',[AuthController::class,'login'])->name('login');
Route::post('/register',[AuthController::class,'register']);

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/user', [AuthController::class, 'getUserData'])->middleware('auth:sanctum');



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
