<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enseignant;

class EnseignantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Enseignant::select('id', 'nom', 'prenom', 'date_de_naissance', 'adresse', 'email','password', 'telephone')->get();
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
            'date_de_naissance' => 'nullable|date',
            'adresse' => 'required',
            'email' => 'required|email',
            'telephone' => 'required',
            'password'=>'required',
        ]);

        Enseignant::create($request->post());

        return response()->json([
            'message' => 'Enseignant added successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $enseignant = Enseignant::findOrFail($id);

        return response()->json([
            'enseignant' => $enseignant
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
            'date_de_naissance' => 'nullable|date',
            'adresse' => 'required',
            'email' => 'required|email',
            'telephone' => 'required',
            'password'=>'required',
        ]);

        $enseignant = Enseignant::findOrFail($id);
        $enseignant->fill($request->post())->save();

        return response()->json([
            'message' => 'Enseignant updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $enseignant = Enseignant::findOrFail($id);
        $enseignant->delete();

        return response()->json([
            'message' => 'Enseignant deleted successfully'
        ]);
    }

    
}
