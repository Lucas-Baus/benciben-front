import React, { useState } from 'react'; // Importante para que funcione el botón
import { productos } from './data';
import './App.css';

// --- COMPONENTE DE TARJETA DE PRODUCTO ---
const ProductCard = ({ p }) => {
  // Filtramos las fotos que existen
  const fotos = [p.foto_1, p.foto_2, p.foto_3].filter(f => f && f.trim() !== "");

  return (
    <div className="product-card">
      <div className="slide-wrapper">
        <div className={`photos-container items-${fotos.length}`}>
          {fotos.map((img, i) => (
            <img key={i} src={img} alt={p.nombre} className="product-img" />
          ))}
          {fotos.length === 0 && (
            <img src="https://via.placeholder.com/400x300?text=Sin+Foto" alt="n/a" className="product-img" />
          )}
        </div>
      </div>

      <div className="card-info">
        <h3>{p.nombre}</h3>
        
        <div className="product-details-box">
          <div className="detail-item">
            <span>Mínimo</span>
            <strong>{p.min || 20} un.</strong>
          </div>
          <div className="detail-item">
            <span>Color</span>
            <strong>Varios</strong>
          </div>
        </div>

        <button 
          className="mail-button" 
          onClick={() => {
            const email = "ventas.benciben@gmail.com";
            const subject = encodeURIComponent(`Consulta por ${p.nombre}`);
            const body = encodeURIComponent(`Hola, me interesa consultar por el producto: ${p.nombre}`);
            const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;
            window.open(mailtoUrl, '_self');
          }}
        >
          Quiero presupuesto! ✉️
        </button>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL APP ---
export default function App() {
  // Estado para controlar el botón y evitar múltiples envíos
  const [enviando, setEnviando] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();
    if (enviando) return; // Evita que se ejecute si ya hay un envío en curso

    setEnviando(true);
    
    // Capturamos los valores de los inputs
    const datos = {
      nombre: e.target[0].value,
      empresa: e.target[1].value,
      email: e.target[2].value,
      mensaje: e.target[3].value
    };

    try {
  const response = await fetch('https://benciben-back.onrender.com/api/consulta', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
      });

      if (response.ok) {
        alert("✅ ¡Consulta enviada con éxito!");
        e.target.reset(); // Limpia el formulario
      } else {
        alert("❌ Error en el servidor al procesar la consulta.");
      }
    } catch (error) {
      alert("❌ Error de conexión. Asegurate de que el Backend esté encendido.");
      console.error(error);
    } finally {
      setEnviando(false); // Rehabilitamos el botón
    }
  };

  return (
    <div className="container">
      <header className="main-header">
        <h1><img src="/productos/BCNLOGO2.jpeg" alt="Logo Benciben" /></h1>
      </header>

      <section className="presentation-section">
        <div className="presentation-content">
          <h2>Soluciones a Medida para tu Marca</h2>
          <p className="subtitle">
            Somos un negocio con años de experiencia transformando ideas en regalos corporativos inolvidables!
          </p>
          
          <div className="features-grid">
            <div className="feature-item">
              <span>🏢</span>
              <h4>Merchandising Corporativo</h4>
              <p>Productos personalizados con la identidad de tu empresa.</p>
            </div>
            <div className="feature-item">
              <span>⭐</span>
              <h4>Calidad Garantizada</h4>
              <p>Promocioná tu marca con los mejores regalos del mercado.</p>
            </div>
            <div className="feature-item">
              <span>🛠️</span>
              <h4>Proyectos Especiales</h4>
              <p>¿No encontrás lo que buscás? ¡Lo diseñamos y armamos de cero para vos!</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mundial-banner">
        <div className="mundial-content">
          <h2>¡Conseguí acá tu Merch del mundial!</h2>
          <p>Presupuestos personalizados para empresas.</p>
        </div>
      </section>

      <main className="product-grid">
        {productos.map((p, i) => (
          <ProductCard key={p.id || i} p={p} />
        ))}
      </main>

      <section className="contact-form-area">
        <form onSubmit={handleForm} className="modern-form">
          <h3>Consultar Presupuesto</h3>
          <div className="input-group">
            <input type="text" placeholder="Tu Nombre" required />
            <input type="text" placeholder="Empresa" required />
          </div>
          <input type="email" placeholder="Email" required className="full-input" />
          <textarea placeholder="¿Qué productos necesitás?" rows="4" required></textarea>
          
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={enviando}
            style={{ 
              opacity: enviando ? 0.6 : 1, 
              cursor: enviando ? 'not-allowed' : 'pointer' 
            }}
          >
            {enviando ? "Enviando..." : "Enviar Consulta"}
          </button>
        </form>
      </section>
    </div>
  );
}