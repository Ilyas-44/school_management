import * as React from "react";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Createclasse from "./admin/classes/create";
import Editclasse from "./admin/classes/edit";
import Listclasse from "./admin/classes/list";
import CreateEleve from "./admin/eleves/createE";
import EditEleve from "./admin/eleves/editE";
import ListEleve from "./admin/eleves/listE";
import CreateEnseignant from "./admin/enseignants/createP";
import EditEnseignant from "./admin/enseignants/editP";
import ListEnseignant from "./admin/enseignants/listP";
import CreateMatiere from "./admin/matieres/createM";
import EditMatiere from "./admin/matieres/editM";
import ListMatiere from "./admin/matieres/listM";
import CreateNote from "./admin/notes/createN";
import EditNote from "./admin/notes/editN";
import ListNote from "./admin/notes/listN";
import Dashboard from "./admin/Dashbord";
import LoginForm from "./admin/login";
import Home from "./admin/home";
import EleveDetailsPage from "./elevesComponents/Elevepage";
import Note from "./elevesComponents/Note";
import PersonnelInformation from "./elevesComponents/Personnelinformation";
import Classe from "./elevesComponents/eleveclasse";
import AdminArea from "./admin/AdminArea";
import ProfHome from "./enseignantcomponent/profhome";
import ProfListEleve from "./enseignantcomponent/prof_eleve_list";
import ProfListClasse from "./enseignantcomponent/prof_classe_list";
import ProfListMatiere from "./enseignantcomponent/prof_matiere_list";
import Protected from "./Layout/Protected";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<LoginForm />} />

        <Route element={<Protected />}>
          <Route path="/" element={<AdminArea />}>
            <Route index element={<Home />} />
          </Route>
          {/* admin */}
          <Route path="admin" element={<AdminArea />}>
            <Route path="classe/create" element={<Createclasse />}></Route>
            <Route path="classe/edit/:id" element={<Editclasse />}></Route>
            <Route path="classe" element={<Listclasse />}></Route>
            <Route path="eleve/create" element={<CreateEleve />}></Route>
            <Route path="eleve/edit/:id" element={<EditEleve />}></Route>
            <Route path="eleve" element={<ListEleve />}></Route>
            <Route
              path="enseignant/create"
              element={<CreateEnseignant />}
            ></Route>
            <Route
              path="enseignant/edit/:id"
              element={<EditEnseignant />}
            ></Route>
            <Route path="enseignant" element={<ListEnseignant />}></Route>
            <Route path="matiere/create" element={<CreateMatiere />}></Route>
            <Route path="matiere/edit/:id" element={<EditMatiere />}></Route>
            <Route path="matiere" element={<ListMatiere />}></Route>
            <Route path="note/create" element={<CreateNote />}></Route>
            <Route path="note/edit/:id" element={<EditNote />}></Route>
            <Route path="note" element={<ListNote />}></Route>
            <Route path="dashbord" element={<Dashboard />}></Route>
          </Route>
          {/* eleves */}

          <Route path="/elevepage/:id" element={<EleveDetailsPage />} />
          <Route path="/info" element={<PersonnelInformation />} />
          <Route path="/elevenote/:id" element={<Note />} />
          <Route path="/eleve/classe/:id" element={<Classe />} />

          {/* prooff */}
          <Route path="/enseignant/home" element={<ProfHome />} />
          <Route path="/enseignant/Eleve_List" element={<ProfListEleve />} />
          <Route path="/enseignant/Classe_List" element={<ProfListClasse />} />
          <Route
            path="/enseignant/Matiere_List/:id"
            element={<ProfListMatiere />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
