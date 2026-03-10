import React, { useState } from 'react';
import { productos } from './data';
import './App.css';

// --- COMPONENTE NAVBAR ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">BENCIBEN<span>.STUDIO</span></div>
        
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <a href="#inicio" onClick={() => setIsOpen(false)}>Inicio</a>
          <a href="#mundial" onClick={() => setIsOpen(false)}>Mundial</a>
          <a href="#productos" onClick={() => setIsOpen(false)}>Productos</a>
          <a href="#contacto" onClick={() => setIsOpen(false)}>Contacto</a>
          <a href="https://www.instagram.com/benciben.studio/" target="_blank" rel="noreferrer" className="nav-insta">
            Instagram
          </a>
        </div>

        <div className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

// --- COMPONENTE DE TARJETA DE PRODUCTO ---
const ProductCard = ({ p }) => {
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
          className="wa-button" 
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
  const [enviando, setEnviando] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();
    if (enviando) return;

    setEnviando(true);
    
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
        e.target.reset();
      } else {
        alert("❌ Error en el servidor al procesar la consulta.");
      }
    } catch (error) {
      alert("❌ Error de conexión. El servidor está arrancando, intentá en 30 segundos.");
      console.error(error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="app-wrapper" id="inicio">
      <Navbar />

      <div className="content-container">
        <header className="main-header">
          <h1><img src="/productos/BCNLOGO2.jpeg" alt="Logo Benciben" style={{maxWidth: '250px'}} /></h1>
        </header>

        <section className="presentation-section">
          <div className="presentation-content">
            <h2>Soluciones a Medida para tu Marca</h2>
            <p className="subtitle">
              ¡Somos un negocio con años de experiencia transformando ideas en regalos corporativos inolvidables!
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
                <p>¿No encontrás lo que buscás? ¡Lo diseñamos de cero para vos!</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mundial-banner" id="mundial">
          <div className="mundial-content">
            <h2>¡Conseguí acá tu Merch del mundial!</h2>
            <p>Presupuestos personalizados para empresas.</p>
          </div>
        </section>

        <main className="product-grid" id="productos">
          {productos.map((p, i) => (
            <ProductCard key={p.id || i} p={p} />
          ))}
        </main>

        <section className="contact-form-area" id="contacto">
          <form onSubmit={handleForm} className="modern-form">
            <h3>Consultar Presupuesto</h3>
            <div className="input-group">
              <input type="text" placeholder="Tu Nombre" required />
              <input type="text" placeholder="Empresa" required />
            </div>
            <input type="email" placeholder="Email" required className="full-input" />
            <textarea placeholder="¿Qué productos necesitás?" rows="4" required className="full-input"></textarea>
            
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

      <footer className="main-footer">
        <h3>Seguinos en redes</h3>
        <a href="https://www.instagram.com/benciben.studio/" target="_blank" rel="noreferrer" className="insta-link-large">
          📸 @benciben.studio
        </a>
        <p style={{marginTop: '30px', opacity: 0.5}}>© 2026 BENCIBEN STUDIO. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}