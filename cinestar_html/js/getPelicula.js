import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBQKUrn8j6Dsv6T8HhBYC3MUlMj7vhsIDQ",
  authDomain: "alvarocinestar.firebaseapp.com",
  projectId: "alvarocinestar",
  storageBucket: "alvarocinestar.firebasestorage.app",
  messagingSenderId: "750796906988",
  appId: "1:750796906988:web:fec2781c26b316c21e60c9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function cargarPelicula() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const contenedor = document.getElementById('contenido-interno');

  if (!id) {
    contenedor.innerHTML = '<p>No se especificó ninguna película.</p>';
    return;
  }

  try {
    const docRef = doc(db, 'peliculas', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      contenedor.innerHTML = '<p>Película no encontrada.</p>';
      return;
    }

    const p = docSnap.data();

    contenedor.innerHTML = `
      <br/><h1>Detalle de Película</h1><br/>
      <div class="contenido-pelicula">
        <div class="datos-pelicula">
          <h2>${p.Titulo}</h2>
          <p>${p.Sinopsis || ''}</p>
          <br/>
          <div class="tabla">
            <div class="fila">
              <div class="celda-titulo">Título Original :</div>
              <div class="celda">${p.Titulo}</div>
            </div>
            <div class="fila">
              <div class="celda-titulo">Estreno :</div>
              <div class="celda">${p.FechaEstreno || ''}</div>
            </div>
            <div class="fila">
              <div class="celda-titulo">Género :</div>
              <div class="celda">${p.Generos || ''}</div>
            </div>
            <div class="fila">
              <div class="celda-titulo">Director :</div>
              <div class="celda">${p.Director || ''}</div>
            </div>
            <div class="fila">
              <div class="celda-titulo">Reparto :</div>
              <div class="celda">${p.Reparto || ''}</div>
            </div>
          </div>
        </div>
        <img src="img/pelicula/${p.id || ''}.jpg" width="160" height="226"/>
      </div>
      <div class="pelicula-video">
        <iframe width="580" height="400"
          src="https://www.youtube.com/embed/${p.Link}"
          frameborder="0"
          allowfullscreen>
        </iframe>
      </div>
    `;

  } catch (error) {
    contenedor.innerHTML = '<p>Error al cargar la película.</p>';
    console.error('Error:', error);
  }
}

cargarPelicula();