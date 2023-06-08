import React from 'react';
import LogoutButton from './logout';


const Navbar = () => {
  return (
    <div>
           <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">
          
            <span className="navbar-brand-title"><a className="nav-link" href="/">
            MySchool
            </a></span>
          </a>
        </div>

        <ul className="nav navbar-nav">

        <li className="nav-item">
            <a className="nav-link" href="/admin/note">
              Notes
            </a>
          </li>

        <li className="nav-item">
            <a className="nav-link" href="/admin/matiere">
               Matiere
            </a>
          </li>


        <li className="nav-item">
            <a className="nav-link" href="/admin/enseignant">
              Enseignant
            </a>
          </li>

        <li className="nav-item">
            <a className="nav-link" href="/admin/eleve">
              Eleve
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/admin/classe">
              Classe
            </a>
          </li>
        </ul>

        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="/admin/dashbord">
              <i className="fas fa-sign-in-alt"></i> Dashbord
            </a>
            <LogoutButton/>
          </li>
          
          
        </ul>
      </div>
    </nav>
       <hr></hr>
    </div>
  )
}


export default Navbar
