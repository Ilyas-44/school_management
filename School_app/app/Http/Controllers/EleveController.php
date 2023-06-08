<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Eleve;

class EleveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Eleve::all();
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
            'prenom' => 'required',
            'date_de_naissance' => 'required|date',
            'adresse' => 'required',
            'email' => 'required|email',
            'telephone' => 'required',
            'classe_id' => 'required|exists:classes,id',
            'password' => 'required',
        ]);

        $eleve = Eleve::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'date_de_naissance' => $request->date_de_naissance,
            'adresse' => $request->adresse,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'classe_id' => $request->classe_id,
            'password'=>$request->password,
        ]);

        return response()->json([
            'message' => 'Eleve created successfully',
            'eleve' => $eleve,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $eleve = Eleve::findOrFail($id);

        return response()->json([
            'message' => 'Eleve retrieved successfully',
            'eleve' => $eleve,
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
            'prenom' => 'required',
            'date_de_naissance' => 'required|date',
            'adresse' => 'required',
            'email' => 'required|email',
            'telephone' => 'required',
            'classe_id' => 'required|exists:classes,id',
            'password' => 'required',


        ]);

        $eleve = Eleve::findOrFail($id);
        $eleve->update([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'date_de_naissance' => $request->date_de_naissance,
            'adresse' => $request->adresse,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'classe_id' => $request->classe_id,
            'password'=>$request->password,

        ]);

        return response()->json([
            'message' => 'Eleve updated successfully',
            'eleve' => $eleve,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $eleve = Eleve::findOrFail($id);
        $eleve->delete();

        return response()->json([
            'message' => 'Eleve deleted successfully',
        ]);
    }
    public function getElevesByClasseId($id)
{
    $eleves = Eleve::where('classe_id', $id)->get();
    return $eleves;
}
}
