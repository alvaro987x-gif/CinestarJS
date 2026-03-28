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

async function cargarCine() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const contenedor = document.getElementById('contenido-interno');

  if (!id) {
    contenedor.innerHTML = '<p>No se especificó ningún cine.</p>';
    return;
  }

  try {
    const docRef = doc(db, 'cines', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      contenedor.innerHTML = '<p>Cine no encontrado.</p>';
      return;
    }

    const c = docSnap.data();

    const tarifasHTML = (c.tarifas || []).map((t, i) => `
      <div class="fila ${i % 2 !== 0 ? 'impar' : ''}">
        <div class="celda-titulo">${t.DiasSemana}</div>
        <div class="celda">${t.Precio}</div>
      </div>
    `).join('');

    const peliculasHTML = (c.peliculas || []).map((p, i) => `
      <div class="fila ${i % 2 !== 0 ? '' : 'impar'}">
        <div class="celda-titulo">${p.Titulo}</div>
        <div class="celda">${p.Horarios}</div>
      </div>
    `).join('');

    contenedor.innerHTML = `
      <h2>${c.RazonSocial}</h2>
      <div class="cine-info">
        <div class="cine-info datos">
          <p>${c.Direccion}</p>
          <p>Teléfono: ${c.Telefonos}</p>
          <br/>
          <div class="tabla">
            ${tarifasHTML}
          </div>
        </div>
        <img src="img/cine/${c.id}.2.jpg"/>
        <br/><br/><h4>Los horarios de cada función están sujetos a cambios sin previo aviso.</h4><br/>
        <div class="cine-info peliculas">
          <div class="tabla">
            <div class="fila">
              <div class="celda-cabecera">Películas</div>
              <div class="celda-cabecera">Horarios</div>
            </div>
            ${peliculasHTML}
          </div>
        </div>
      </div>
    `;

  } catch (error) {
    contenedor.innerHTML = '<p>Error al cargar el cine.</p>';
    console.error('Error:', error);
  }
}

cargarCine();