<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Matiere;

class MatiereController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Matiere::select('id', 'nom','enseignant_id')->get();
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
        ]);

        Matiere::create($request->post());

        return response()->json([
            'message' => 'Matiere added successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $matiere = Matiere::findOrFail($id);

        return response()->json([
            'matiere' => $matiere
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
            'enseignant_id' => 'required|exists:enseignants,id',

        ]);

        $matiere = Matiere::findOrFail($id);
        $matiere->fill($request->post())->save();

        return response()->json([
            'message' => 'Matiere updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $matiere = Matiere::findOrFail($id);
        $matiere->delete();

        return response()->json([
            'message' => 'Matiere deleted successfully'
        ]);
    }

    public function getByEnseignantId(string $enseignantId)
{
    $matieres = Matiere::where('enseignant_id', $enseignantId)->get();

    return $matieres ;
}
}
