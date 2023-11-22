import {NavLink} from "react-router-dom";

function HomePage() {
  return (
      <div>
          <div className="flex flex-row bg-black max-sm:flex-col max-sm:h-screen">
              <NavLink to="/serveur" className="w-1/2 max-sm:w-full h-screen flex items-center justify-center">
                  <img src="https://modele-cv.org/wp-content/uploads/2020/05/cv-pour-serveur.jpg" className="w-full h-full object-cover opacity-70 hover:brightness-75" alt="Image Cuisine" />
              </NavLink>
              <NavLink to="/cuisine" className="w-1/2 max-sm:w-full h-screen flex items-center justify-center">
                  <img src="https://f.hellowork.com/seo/domaine/restauration.jpeg" className="bg-blue-500 w-full h-full object-cover opacity-70 hover:brightness-75" alt="Image Serveur" />
              </NavLink>
          </div>

          <div className="text-white font-bold absolute top-6 text-center w-full text-5xl max-sm:text-3xl">
              <span className="bg-white rounded-sm p-1.5 bg-opacity-10 drop-shadow-2xl">
                  Restaurant ShangHai
              </span>
          </div>
          <div className="text-white text-5xl font-bold absolute top-1/2 left-1/4 max-sm:top-1/4 drop-shadow-2xl">
              <p>Serveur</p>
          </div>
          <div className="text-white text-5xl font-bold absolute top-1/2 right-1/4 max-sm:top-3/4 max-sm:left-1/4 drop-shadow-2xl">
              <p>Cuisinier</p>
          </div>
      </div>
  );
}

export default HomePage;
