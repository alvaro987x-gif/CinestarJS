import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

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

const params = new URLSearchParams(window.location.search);
const seccion = params.get('id') || 'cartelera';

function truncarTexto(texto, max = 120) {
  if (!texto) return '';
  return texto.length > max ? texto.substring(0, max) + '...' : texto;
}

function crearTarjeta(pelicula) {
  const div = document.createElement('div');
  div.className = 'contenido-pelicula';
  div.innerHTML = `
    <div class="datos-pelicula">
      <h2>${pelicula.Titulo}</h2><br/>
      <p>${truncarTexto(pelicula.Sinopsis)}</p>
      <br/>
      <div class="boton-pelicula">
        <a href="pelicula.html?id=${pelicula.docId}">
          <img src="img/varios/btn-mas-info.jpg" width="120" height="30" alt="Ver info"/>
        </a>
      </div>
      <div class="boton-pelicula">
        <a href="https://www.youtube.com/watch?v=${pelicula.Link}" target="_blank">
          <img src="img/varios/btn-trailer.jpg" width="120" height="30" alt="Ver trailer"/>
        </a>
      </div>
    </div>
    <img src="img/pelicula/${pelicula.id}.jpg" width="160" height="226"/>
    <br/><br/>
  `;
  return div;
}

async function cargarPeliculas() {
  const contenedor = document.getElementById('contenido-interno');
  contenedor.innerHTML = `<br/><h1>${seccion === 'estrenos' ? 'Próximos Estrenos' : 'Cartelera'}</h1><br/>`;

  try {
    const snapshot = await getDocs(collection(db, 'peliculas'));
    const estado = seccion === 'estrenos' ? '2' : '1';

    snapshot.forEach(doc => {
      const pelicula = { docId: doc.id, ...doc.data() };
      if (String(pelicula.idEstado) === estado) {
        contenedor.appendChild(crearTarjeta(pelicula));
      }
    });

  } catch (error) {
    contenedor.innerHTML += '<p>Error al cargar las películas.</p>';
    console.error('Error:', error);
  }
}

cargarPeliculas();