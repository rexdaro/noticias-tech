import './style.css';

console.log('TS está corriendo!');

interface Noticia {
  title: string;
  description: string;
  url: string;
  image: string;
}

interface GNewsResponse {
  articles: Noticia[];
}

const apikey: string = '387693bcb250af73d6c09f048b1a8e8e';
const url: string = `https://gnews.io/api/v4/search?q=tecnologia&lang=es&apikey=${apikey}`;

const obtenerNoticias = async (): Promise<Noticia[]> => {
  const respuesta = await fetch(url);
  const datos: GNewsResponse = await respuesta.json();
  return datos.articles;
}

function mostrarNoticias(noticias: Noticia[]): void {
  const contenedor = document.getElementById('noticias');

  if (contenedor) {
    contenedor.innerHTML = '';

    noticias.forEach(noticia => {
      const div = document.createElement('div');
      div.className = 'noticia';

      div.innerHTML = `
        <h3>${noticia.title}</h3>
        <img src="${noticia.image}" alt="imagen noticia" />
        <p>${noticia.description}</p>
        <a href="${noticia.url}" target="_blank">Leer más</a>
      `;
      contenedor.appendChild(div);
    });
  }
}

obtenerNoticias()
  .then(mostrarNoticias)
  .catch(error => console.error('Error al obtener noticias:', error));
