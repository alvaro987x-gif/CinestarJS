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

function crearTarjetaCine(cine) {
  const div = document.createElement('div');
  div.className = 'contenido-cine';
  div.innerHTML = `
    <img src="img/cine/${cine.id}.1.jpg" width="227" height="170"/>
    <div class="datos-cine">
      <h4>${cine.RazonSocial}</h4><br/>
      <span>${cine.Direccion}<br/><br/>Teléfono: ${cine.Telefonos}</span>
    </div>
    <br/>
    <a href="cine.html?id=${cine.docId}">
      <img src="img/varios/ico-info2.png" width="150" height="40"/>
    </a>
  `;
  return div;
}

async function cargarCines() {
  const contenedor = document.getElementById('contenido-interno');
  contenedor.innerHTML = '<br/><h1>Nuestros Cines</h1><br/>';

  try {
    const snapshot = await getDocs(collection(db, 'cines'));

    snapshot.forEach(doc => {
      const cine = { docId: doc.id, ...doc.data() };
      contenedor.appendChild(crearTarjetaCine(cine));
    });

  } catch (error) {
    contenedor.innerHTML += '<p>Error al cargar los cines.</p>';
    console.error('Error:', error);
  }
}

cargarCines();