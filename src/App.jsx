import "./App.css";
import { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";

const INSTAGRAM_URL = "https://cafe-saint-germain-paris.fr/";
const WHATSAPP_URL =
  "https://wa.me/33142035356?text=Bonjour%20je%20veux%20réserver%20une%20table";

const menuItems = [
  {
    id: 1,
    category: "Entrées",
    name: "Le caviar d'aubergine",
    description: "Pain maison, fleur de sel",
    price: "9.00€",
    badge: "Entrée",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    category: "Entrées",
    name: "Houmous vert à la coriandre",
    description: "",
    price: "8.00€",
    badge: "Entrée",
    image:
      "https://images.unsplash.com/photo-1571197119738-26123cbf0d74?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    category: "Entrées",
    name: "Burratina poires rôties",
    description: "Notre signature avec miel et écrasé de noix de pécan",
    price: "14.00€",
    badge: "Signature",
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    category: "Entrées",
    name: "Œuf d'or forest",
    description: "Œuf parfait sur montagne de champignons poêlés",
    price: "14.00€",
    badge: "Entrée",
    image:
      "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    category: "Entrées",
    name: "Burratina et ses tomates d'antan",
    description: "Burratina tomates colorées",
    price: "13.00€",
    badge: "Fresh",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    category: "Entrées",
    name: "Saumon fumé",
    description: "Baies roses, beurre de charente AOP",
    price: "17.00€",
    badge: "Premium",
    image:
      "https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    category: "Entrées",
    name: "Charcuterie de bœuf - 1P",
    description: "Cécina, bresaola, chorizo, bœuf poivre",
    price: "16.00€",
    badge: "Sharing",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    category: "Entrées",
    name: "Charcuterie de bœuf - 2P",
    description: "Cécina, bresaola, chorizo, bœuf poivre",
    price: "25.00€",
    badge: "Sharing",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 9,
    category: "Entrées",
    name: "Fromage - 1P",
    description: "Gouda truffé, chèvre, pecorino poivré",
    price: "11.00€",
    badge: "Cheese",
    image:
      "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 10,
    category: "Entrées",
    name: "Fromage - 2P",
    description: "Gouda truffé, chèvre, pecorino poivré",
    price: "19.00€",
    badge: "Cheese",
    image:
      "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 11,
    category: "Plats",
    name: "Suprême de poulet rôti",
    description: "Au romarin et champignons",
    price: "22.00€",
    badge: "Plat",
    image:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 12,
    category: "Plats",
    name: "Burger artisanal Saint Germain",
    description: "Accompagné de frites maison",
    price: "18.00€",
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 13,
    category: "Plats",
    name: "Entrecôte",
    description: "Sauce au poivre",
    price: "33.00€",
    badge: "Grill",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 14,
    category: "Plats",
    name: "Filet de bœuf - 350g",
    description: "",
    price: "34.00€",
    badge: "Premium",
    image:
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 15,
    category: "Plats",
    name: "Côte de bœuf - 350g",
    description: "1.2kg pour 2 personnes",
    price: "76.00€",
    badge: "To Share",
    image:
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 16,
    category: "Plats",
    name: "Tataki de thon",
    description: "Sésame noir",
    price: "26.00€",
    badge: "Fresh",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 17,
    category: "Salades",
    name: "Salade Libanaise",
    description:
      "Mesclun, tomates cerises, tomates confites, oignons rouges, feta, fruits rouges, pignons et persil",
    price: "16.50€",
    badge: "Salade",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 18,
    category: "Salades",
    name: "Salade de chèvre",
    description:
      "Chèvre chaud pané, mesclun, tomates cerises, tomates confites, oignons rouges, fruits rouges, pignons, persil",
    price: "17.00€",
    badge: "Salade",
    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 19,
    category: "Salades",
    name: "Salade césar au poulet croustillant",
    description: "",
    price: "19.00€",
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1512852939750-1305098529bf?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 20,
    category: "Salades",
    name: "Burrata géante et tomates colorées",
    description: "",
    price: "22.00€",
    badge: "Fresh",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 21,
    category: "Salades",
    name: "Burrata géante avec poires rôties",
    description: "Notre signature: avec miel et écrasé de noix de pécan",
    price: "22.00€",
    badge: "Signature",
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 22,
    category: "Pizzas",
    name: "La burrata pesto",
    description: "Sauce pesto, roquette, burratina, pignons, artichaut, parmesan",
    price: "17.00€",
    badge: "Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 23,
    category: "Pizzas",
    name: "Oh la vache",
    description: "Sauce tomate, mozzarella, burratina, bresaola fumé, roquette",
    price: "19.00€",
    badge: "Pizza",
    image:
      "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 24,
    category: "Pizzas",
    name: "Forestière",
    description: "Notre signature base crème de champignons maison, burratina, basilic",
    price: "16.00€",
    badge: "Signature",
    image:
      "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 25,
    category: "Pizzas",
    name: "Marguerite",
    description: "Sauce tomate, mozzarella, basilic",
    price: "16.00€",
    badge: "Classic",
    image:
      "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 26,
    category: "Pizzas",
    name: "Peperoni",
    description: "Base tomate, mozzarella, chorizo, roquette",
    price: "17.00€",
    badge: "Spicy",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 27,
    category: "Pizzas",
    name: "La Saint Germain",
    description: "Base tomate, aubergines, tomates cerises, parmesan, basilic, burratina",
    price: "17.00€",
    badge: "House Pizza",
    image:
      "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 28,
    category: "Pizzas",
    name: "Veggie",
    description: "Base tomate, mozzarella, poivrons, aubergines, champignons de paris, oignons rouges",
    price: "16.00€",
    badge: "Veggie",
    image:
      "https://images.unsplash.com/photo-1511689660979-10d2b1aada49?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 29,
    category: "Pizzas",
    name: "4 Fromage",
    description: "Base crème fraiche, chèvre, gorgonzola, mozzarella copeaux, roquette",
    price: "18.00€",
    badge: "Cheese",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 30,
    category: "Pizzas",
    name: "Régina",
    description: "Base tomate, mozzarella, jambon de dinde, champignons, basilic",
    price: "18.00€",
    badge: "Classic",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 31,
    category: "Pizzas",
    name: "Saumon",
    description: "Base crème fraîche, saumon, citron",
    price: "21.00€",
    badge: "Premium",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 32,
    category: "Pizzas",
    name: "Au thon",
    description: "Base tomate, mozzarella, thon, olives noires, basilic",
    price: "18.00€",
    badge: "Pizza",
    image:
      "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 33,
    category: "Pizzas",
    name: "À la truffe",
    description: "Crème de truffe, champignons de Paris, parmesan, roquette",
    price: "24.00€",
    badge: "Luxury",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 34,
    category: "Pâtes",
    name: "Penne au saumon",
    description: "Oignon, citron, aneth",
    price: "20.00€",
    badge: "Pasta",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 35,
    category: "Pâtes",
    name: "Penne au gorgonzola",
    description: "Gorgonzola, basilic, parmesan",
    price: "18.00€",
    badge: "Cheesy",
    image:
      "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 36,
    category: "Pâtes",
    name: "Penne au poulet et champignons",
    description: "Poulet rôti, champignons, parmesan, persil",
    price: "19.00€",
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 37,
    category: "Pâtes",
    name: "Linguine végétariennes",
    description: "Aubergine, oignon, courgette, poivron, basilic",
    price: "17.00€",
    badge: "Veggie",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 38,
    category: "Pâtes",
    name: "Linguine pesto",
    description: "Pesto maison, parmesan, basilic",
    price: "16.50€",
    badge: "Pasta",
    image:
      "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 39,
    category: "Pâtes",
    name: "Linguine burrata et bresaola",
    description: "Sauce crémeuse, bresaola de bœuf et burratina",
    price: "21.00€",
    badge: "Signature",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 40,
    category: "Desserts",
    name: "Tiramisu fait maison",
    description: "",
    price: "9.00€",
    badge: "Dessert",
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 41,
    category: "Desserts",
    name: "Fondant au chocolat maison",
    description: "",
    price: "9.00€",
    badge: "Dessert",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 42,
    category: "Desserts",
    name: "Fruits de saison",
    description: "",
    price: "8.00€",
    badge: "Fresh",
    image:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 43,
    category: "Desserts",
    name: "Brioche façon pain perdu",
    description: "",
    price: "8.00€",
    badge: "Dessert",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 44,
    category: "Desserts",
    name: "Café Gourmand",
    description: "Fondant au chocolat, tiramisu et coupe de fruits",
    price: "14.00€",
    badge: "Gourmand",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 45,
    category: "Desserts",
    name: "Thé Gourmand",
    description: "Fondant au chocolat, tiramisu et coupe de fruits",
    price: "16.00€",
    badge: "Gourmand",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 46,
    category: "Desserts",
    name: "Cheesecake",
    description: "",
    price: "10.00€",
    badge: "Dessert",
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80",
  },
];

const testimonials = [
  {
    name: "Sofia Laurent",
    role: "Food Blogger",
    text: "The experience feels premium and polished. The menu section is especially beautiful and easy to browse.",
  },
  {
    name: "Yassine B.",
    role: "Client",
    text: "Elegant design, smooth navigation, and the restaurant identity feels luxurious and modern.",
  },
  {
    name: "Nadia A.",
    role: "Lifestyle Creator",
    text: "This looks like a real high-end restaurant brand. Very classy and visually impressive.",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80",
];

const categories = ["All", "Entrées", "Plats", "Salades", "Pizzas", "Pâtes", "Desserts"];

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedDish, setSelectedDish] = useState(null);

  const [reservation, setReservation] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: "",
  });
  const [reservationMessage, setReservationMessage] = useState("");

  const filteredMenu = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const text = `${item.name} ${item.description} ${item.category}`.toLowerCase();
      const matchesSearch = text.includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const handleReservationChange = (e) => {
    setReservation({ ...reservation, [e.target.name]: e.target.value });
  };

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    setReservationMessage("Sending...");

    emailjs
      .send(
        "service_s4xas3u",
        "template_yxgpeu1",
        {
          user_name: reservation.name,
          user_email: reservation.email,
          reservation_date: reservation.date,
          reservation_time: reservation.time,
          guests: reservation.guests,
        },
        "MdApF0vXAs-25Uh8a"
      )
      .then(() => {
        setReservationMessage("✅ Reservation sent successfully!");
        setReservation({
          name: "",
          email: "",
          date: "",
          time: "",
          guests: "",
        });
      })
      .catch((error) => {
        console.error(error);
        setReservationMessage("❌ Error sending reservation");
      });
  };

  return (
    <div className="app-shell">
      <header className="navbar">
        <div className="brand">
          <img src="/logo.jpg" alt="Café Saint Germain logo" className="logo-img" />
          <div>
            <h1>Café Saint Germain</h1>
            <p>Paris Restaurant</p>
          </div>
        </div>

        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? "✕" : "☰"}
        </button>

        <nav className={`nav-links ${mobileOpen ? "open" : ""}`}>
          <a href="#home" onClick={() => setMobileOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMobileOpen(false)}>About</a>
          <a href="#menu" onClick={() => setMobileOpen(false)}>Menu</a>
          <a href="#gallery" onClick={() => setMobileOpen(false)}>Gallery</a>
          <a href="#reviews" onClick={() => setMobileOpen(false)}>Reviews</a>
          <a href="#contact" onClick={() => setMobileOpen(false)}>Reservation</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" onClick={() => setMobileOpen(false)}>
            Instagram
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" onClick={() => setMobileOpen(false)}>
            WhatsApp
          </a>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">Paris Style • Fine Dining • Refined Taste</p>
          <h2>
            Welcome to
            <span>Café Saint Germain</span>
          </h2>
          <p className="hero-description">
            Discover an elegant dining atmosphere, signature plates, artisanal pizzas,
            refined pasta, and desserts inspired by the Parisian spirit.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#menu">Explore Menu</a>
            <a className="btn btn-secondary" href="#contact">Reserve Table</a>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <strong>4.9</strong>
              <span>Guest Rating</span>
            </div>
            <div className="stat-card">
              <strong>46</strong>
              <span>Menu Items</span>
            </div>
            <div className="stat-card">
              <strong>Paris</strong>
              <span>Saint Germain</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="section-header">
          <p>About Us</p>
          <h3>Where elegance meets flavor</h3>
        </div>

        <div className="about-grid">
          <div className="about-text card-surface">
            <h4>Café Saint Germain</h4>
            <p>
              A refined restaurant experience inspired by the Parisian spirit of
              Saint Germain. Elegant presentation, warm ambiance, and a curated
              menu come together in one premium destination.
            </p>
            <p>
              From entrées and salads to artisanal pizzas, pasta, and desserts,
              every item is presented with a luxury digital look designed to elevate the brand.
            </p>
          </div>

          <div className="about-highlights">
            <div className="highlight-card">
              <span>01</span>
              <h5>Premium Menu</h5>
              <p>Carefully curated dishes with rich ingredients and refined presentation.</p>
            </div>
            <div className="highlight-card">
              <span>02</span>
              <h5>Parisian Atmosphere</h5>
              <p>Elegant design language inspired by classic and modern Saint Germain vibes.</p>
            </div>
            <div className="highlight-card">
              <span>03</span>
              <h5>Integrated Experience</h5>
              <p>A complete restaurant site with menu, gallery, reviews, and reservation section.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section featured-section">
        <div className="section-header">
          <p>Featured Selection</p>
          <h3>Signature dishes</h3>
        </div>

        <div className="featured-grid">
          {menuItems.slice(0, 3).map((item) => (
            <article className="featured-card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="featured-card-content">
                <span>{item.badge}</span>
                <h4>{item.name}</h4>
                <p>{item.description || "A refined selection from our menu."}</p>
                <strong>{item.price}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section menu-section" id="menu">
        <div className="section-header">
          <p>Integrated Menu</p>
          <h3>Explore our selection</h3>
        </div>

        <div className="menu-tools">
          <div className="menu-filter">
            {categories.map((category) => (
              <button
                key={category}
                className={activeCategory === category ? "filter-btn active" : "filter-btn"}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="search-wrap">
            <input
              type="text"
              placeholder="Search a dish."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="menu-grid">
          {filteredMenu.map((item) => (
            <article className="menu-card" key={item.id}>
              <div className="menu-image-wrap">
                <img src={item.image} alt={item.name} className="menu-image" />
                <span className="menu-badge">{item.badge}</span>
              </div>

              <div className="menu-card-body">
                <div className="menu-title-row">
                  <h4>{item.name}</h4>
                  <strong>{item.price}</strong>
                </div>
                <p>{item.description || "No description available."}</p>
                <div className="menu-bottom">
                  <small>{item.category}</small>
                  <button className="mini-btn" onClick={() => setSelectedDish(item)}>
                    View Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section gallery-section" id="gallery">
        <div className="section-header">
          <p>Gallery</p>
          <h3>Moments of atmosphere and flavor</h3>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div className="gallery-card" key={index}>
              <img src={image} alt={`Gallery ${index + 1}`} />
            </div>
          ))}
        </div>
      </section>

      <section className="section testimonials-section" id="reviews">
        <div className="section-header">
          <p>Testimonials</p>
          <h3>What our guests say</h3>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((item, index) => (
            <article className="testimonial-card" key={index}>
              <div className="quote-mark">“</div>
              <p>{item.text}</p>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section reservation-section" id="contact">
        <div className="reservation-box">
          <div className="reservation-text">
            <p>Reservation</p>
            <h3>Reserve your table</h3>
            <span>Café Saint Germain • Paris</span>
            <span>Elegant service and premium atmosphere</span>
            <span>Open daily for lunch and dinner</span>
          </div>

          <form className="reservation-form" onSubmit={handleReservationSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={reservation.name}
              onChange={handleReservationChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={reservation.email}
              onChange={handleReservationChange}
              required
            />
            <input
              type="date"
              name="date"
              value={reservation.date}
              onChange={handleReservationChange}
              required
            />
            <input
              type="time"
              name="time"
              value={reservation.time}
              onChange={handleReservationChange}
              required
            />
            <input
              type="number"
              name="guests"
              placeholder="Guests"
              min="1"
              value={reservation.guests}
              onChange={handleReservationChange}
              required
            />
            <button type="submit" className="btn btn-primary">
              Reserve Now
            </button>
          </form>

          {reservationMessage && (
            <p style={{ marginTop: "16px", color: "#f4d77a" }}>{reservationMessage}</p>
          )}
        </div>
      </section>

      <footer className="footer">
        <div>
          <h4>Café Saint Germain</h4>
          <p>Parisian elegance, premium dishes, unforgettable moments.</p>
        </div>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </footer>

      <a href={WHATSAPP_URL} className="whatsapp-float" target="_blank" rel="noreferrer">
        WhatsApp
      </a>

      {selectedDish && (
        <div className="modal-backdrop" onClick={() => setSelectedDish(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <img src={selectedDish.image} alt={selectedDish.name} />
            <div className="modal-content">
              <span className="modal-badge">{selectedDish.badge}</span>
              <h3>{selectedDish.name}</h3>
              <p>{selectedDish.description || "No description available."}</p>
              <div className="modal-meta">
                <strong>{selectedDish.price}</strong>
                <small>{selectedDish.category}</small>
              </div>
              <button className="btn btn-primary" onClick={() => setSelectedDish(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;