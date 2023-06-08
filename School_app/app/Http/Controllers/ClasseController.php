<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Classe;


class ClasseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return Classe::select('id', 'nom', 'niveau')->get();
        return Classe::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required',
            'niveau' => 'required'
        ]);

        Classe::create($request->post());

        return response()->json([
            'message' => 'Classe added successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $classe = Classe::findOrFail($id);

        return response()->json([
            'classe' => $classe
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'nom' => 'required',
            'niveau' => 'required'
        ]);

        $classe = Classe::findOrFail($id);
        $classe->fill($request->post())->save();

        return response()->json([
            'message' => 'Classe updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $classe = Classe::findOrFail($id);
        $classe->delete();

        return response()->json([
            'message' => 'Classe deleted successfully'
        ]);
    }
}
