'use client';

import { useState, useEffect, useTransition } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Leaf, 
  Sparkles, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  Utensils, 
  Check, 
  Award, 
  Clock, 
  Heart,
  Plus,
  Minus,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  Percent,
  Compass,
  Globe
} from 'lucide-react';

// Define the interface for a Product
interface Product {
  id: string;
  name: string;
  tagline: string;
  price180g: number;
  price450g: number;
  image: string;
  category: string;
  description: string;
  ingredients: string;
  nutrition: {
    calories: string;
    protein: string;
    fat: string;
    carbs: string;
  };
  reviews: {
    author: string;
    rating: number;
    comment: string;
  }[];
}

// Full array of products matching the generated premium assets
const PRODUCT_DATA: Product[] = [
  {
    id: 'pure_velvet',
    name: "Baunilha Bourbon",
    tagline: "O Clássico Cremoso Refinado",
    price180g: 5.50,
    price450g: 11.00,
    image: "/src/assets/images/lor_blanc_classic_1779481689606.png",
    category: "Assinatura Clássica",
    description: "Suave, elegante e incrivelmente cremoso. Um clássico refinado com notas delicadas de baunilha premium.",
    ingredients: "Leite fresco integral selecionado de pastagens livres, vagens de baunilha Bourbon de alta qualidade, fermentos ativos vivos L'Or Blanc.",
    nutrition: {
      calories: "120 kcal / 180g",
      protein: "6.5g",
      fat: "5.4g",
      carbs: "11.2g"
    },
    reviews: [
      { author: "Inês Sobral", rating: 5, comment: "Suave, elegante e incrivelmente cremoso. Um clássico refinado com notas delicadas de baunilha premium." },
      { author: "Chef Alexandre G.", rating: 5, comment: "Incomparável equilíbrio e aroma. O puro luxo do iogurte artesanal." }
    ]
  },
  {
    id: 'fig_almonds',
    name: "Morango Velvet",
    tagline: "Frescura e Cremosidade Perfeitas",
    price180g: 6.50,
    price450g: 13.50,
    image: "/src/assets/images/lor_blanc_fig_1779481705808.png",
    category: "Infusões Gourmet",
    description: "Preparado com morangos selecionados para uma combinação perfeita entre frescura e cremosidade.",
    ingredients: "Morangos silvestres selecionados cozidos a fogo brando em compota artesanal, iogurte natural integral ultra-cremoso.",
    nutrition: {
      calories: "135 kcal / 180g",
      protein: "5.8g",
      fat: "4.8g",
      carbs: "14.5g"
    },
    reviews: [
      { author: "Maria Adelaide Martins", rating: 5, comment: "Doçura pura e morangos reais. Dá para sentir a paixão do fabrico artesanal." }
    ]
  },
  {
    id: 'honey_gold',
    name: "Manga Gold",
    tagline: "Doçura Natural e Textura Aveludada",
    price180g: 7.00,
    price450g: 14.00,
    image: "/src/assets/images/lor_blanc_honey_1779481721812.png",
    category: "Edições de Ouro",
    description: "Um sabor tropical sofisticado, equilibrando doçura natural e textura aveludada.",
    ingredients: "Polpa pura de manga dourada madura, néctar artesanal de citrinos, textura de creme iogurte premium.",
    nutrition: {
      calories: "140 kcal / 180g",
      protein: "5.2g",
      fat: "4.5g",
      carbs: "16.8g"
    },
    reviews: [
      { author: "Leonor de Bourbon", rating: 5, comment: "Exótico e incrivelmente sedoso. Uma verdadeira viagem de frescura requintada." }
    ]
  },
  {
    id: 'berry_signature',
    name: "Berry Signature",
    tagline: "Intensa Fusão de Bosque Silvestre",
    price180g: 6.80,
    price450g: 13.80,
    image: "https://picsum.photos/seed/berries/500/500",
    category: "Botânicos Exclusivos",
    description: "Intenso, elegante e refrescante. Uma explosão gourmet de frutas vermelhas premium.",
    ingredients: "Frutos vermelhos silvestres selecionados (mirtilos, framboesas, amoras), infusão aromática fina de hibiscos biológicos, iogurte gourmet leve.",
    nutrition: {
      calories: "128 kcal / 180g",
      protein: "6.0g",
      fat: "4.2g",
      carbs: "13.2g"
    },
    reviews: [
      { author: "Duarte Leitão", rating: 5, comment: "Uma explosão soberba de sabor silvestre. Absolutamente refrescante e sofisticado!" }
    ]
  },
  {
    id: 'granola_classic',
    name: "Granola Gourmet de Mel & Amêndoas",
    tagline: "Signature Crunch de Sedução",
    price180g: 7.50, // Tratar price180g como Embalagem 250g
    price450g: 14.00, // Tratar price450g como Embalagem 500g
    image: "https://picsum.photos/seed/granolahoney/500/500",
    category: "Granola Gourmet",
    description: "Uma combinação crocante criada para elevar cada colherada. Aveia integral tostada com mel puro e amêndoas do vale do Douro laminadas.",
    ingredients: "Aveia integral biológica, mel puro de flor de laranjeira, amêndoas selecionadas, flocos de coco tostados, sementes de abóbora e girassol.",
    nutrition: {
      calories: "420 kcal / 100g",
      protein: "10.2g",
      fat: "14.5g",
      carbs: "58.4g"
    },
    reviews: [
      { author: "Rita S.", rating: 5, comment: "A melhor granola que já comprei. O selo d'ouro da crocância ideal para misturar com o iogurte!" }
    ]
  },
  {
    id: 'granola_pistachio',
    name: "Granola Gourmet de Pistáchio",
    tagline: "A Textura Nobre Siciliana - Small Batch",
    price180g: 8.50, // Embalagem 250g
    price450g: 16.00, // Embalagem 500g
    image: "https://picsum.photos/seed/granolapistache/500/500",
    category: "Granola Gourmet",
    description: "Cremosa crocância exclusiva com generosos pedaços de legítimo pistáchio de Bronte D.O.P. e sal marinho de Guérande.",
    ingredients: "Flocos de aveia pura, pistáchios verdes selecionados, xarope de ácer biológico, sementes, um toque subtil de baunilha natural e flor de sal salvadora.",
    nutrition: {
      calories: "442 kcal / 100g",
      protein: "11.8g",
      fat: "17.2g",
      carbs: "52.3g"
    },
    reviews: [
      { author: "Nuno M.", rating: 5, comment: "Magnífico contraste salgado e doce. O sabor requintado do pistáchio é o casal maravilhoso para o iogurte neutro." }
    ]
  },
  {
    id: 'granola_chocolate',
    name: "Granola Gourmet de Chocolate & Avelã",
    tagline: "A Crocância Escura e Avançada",
    price180g: 8.00,
    price450g: 15.00,
    image: "https://picsum.photos/seed/granolachoc/500/500",
    category: "Granola Gourmet",
    description: "Flocos crocantes infusionados com cacau puro, combinados com avelãs da Beira inteiras e pedaços generosos de chocolate belga 74%.",
    ingredients: "Cereais integrais selecionados, sementes de chia, avelãs torradas inteiras, pepitas de chocolate artesanal, manteiga de cacau e puré de maçã.",
    nutrition: {
      calories: "435 kcal / 100g",
      protein: "9.5g",
      fat: "16.8g",
      carbs: "56.1g"
    },
    reviews: []
  },
  {
    id: 'compota_morango',
    name: "Compota Gourmet de Morango",
    tagline: "Doçura Silvestre Cozida a Fogo Lento",
    price180g: 5.50, // Embalagem Única Elegante
    price450g: 10.00,
    image: "https://picsum.photos/seed/strawberryjam/500/500",
    category: "Caldas & Compotas",
    description: "Morangos silvestres colhidos na época de ouro, cozidos lentamente em pequenas panelas de cobre com açúcar de cana biológico.",
    ingredients: "Morangos biológicos (75%), açúcar de cana, sumo de limão fresco, fava de baunilha.",
    nutrition: {
      calories: "210 kcal / 100g",
      protein: "0.6g",
      fat: "0.1g",
      carbs: "51.0g"
    },
    reviews: []
  },
  {
    id: 'compota_berries',
    name: "Calda Gourmet de Frutos Vermelhos",
    tagline: "Finalizações de Luxo para as Suas Pausas",
    price180g: 5.80,
    price450g: 10.50,
    image: "https://picsum.photos/seed/berriestop/500/500",
    category: "Caldas & Compotas",
    description: "Finalizações artesanais para transformar o simples em extraordinário. Uma redução intensa de framboesas, mirtilos e amoras com infusão de hibiscos.",
    ingredients: "Seleção refinada de frutos do bosque frescos, calda leve de hibiscos biológicos, néctar de agave artesanal.",
    nutrition: {
      calories: "195 kcal / 100g",
      protein: "0.5g",
      fat: "0.1g",
      carbs: "46.2g"
    },
    reviews: [
      { author: "Sofia S.", rating: 5, comment: "Perfeita redução, acidez no ponto para coroar o iogurte de baunilha!" }
    ]
  },
  {
    id: 'compota_caramelo',
    name: "Caramelo Salgado Artesanal",
    tagline: "A Textura do Doce d'Ouro Cozido",
    price180g: 6.20,
    price450g: 11.50,
    image: "https://picsum.photos/seed/saltedcaramel/500/500",
    category: "Caldas & Compotas",
    description: "Trabalhado manualmente para obter um tom âmbar perfeito. Contraste divinal de caramelo cremoso com flor de sal pura.",
    ingredients: "Açúcar mascavado biológico, natas frescas de pastagem, manteiga noisette de elite, flor de sal genuína de Guérande.",
    nutrition: {
      calories: "380 kcal / 100g",
      protein: "1.2g",
      fat: "18.5g",
      carbs: "51.5g"
    },
    reviews: []
  },
  {
    id: 'kit_signature_premium',
    name: "Kit Signature Premium - Alyane",
    tagline: "A Suprema Experiência de Luxo Completa",
    price180g: 24.90, // Kit Padrão
    price450g: 44.90, // Kit Grande / Luxe
    image: "/src/assets/images/lor_blanc_hero_1779481670076.png", // A imagem magnífica do produto Alyane com o copo de granola por cima
    category: "Kits Premium",
    description: "O trio ideal de laticínio e toppings criado para simular hotéis de cinco estrelas no conforto do lar. Uma combinação perfeita desenhada para elevar cada colherada e criar um espetáculo estético digno das suas redes sociais.",
    ingredients: "Inclui: 2 Iogurtes Artesanais Premium (180g cada), 1 Granola Gourmet Artesanal (250g), 1 Compota Premium (180g), colher de madeira de design e caixa de presente elegante com fita dourada de cetim.",
    nutrition: {
      calories: "Combinações Variadas",
      protein: "Rico em Proteínas Naturais",
      fat: "Gorduras Saudáveis Premium",
      carbs: "Doçura Natural Equilibrada"
    },
    reviews: [
      { author: "Chef Tiago Castanheira", rating: 5, comment: "Um kit luxuoso! O emparelhamento do iogurte com esta granola e a calda de hibiscos cria o verdadeiro brunch de realeza europeia." }
    ]
  }
];

// Occasions for the Sommelier IA pairing tool
const OCCASIONS = [
  "Pequeno-Almoço de Domingo",
  "Sobremesa de Jantar Exclusivo",
  "Revigorar Pós-Yoga / Meditação",
  "Chá Gourmet da Tarde",
  "Cocktail Intimista de Verão"
];

// Terroir Sourcing locations for the interactive map in About page
interface TerroirLocation {
  id: string;
  name: string;
  title: string;
  region: string;
  country: string;
  ingredient: string;
  coords: { x: number; y: number };
  altitude: string;
  climate: string;
  soil: string;
  harvest: string;
  story: string;
  productName: string;
  productId: string;
}

const TERROIR_LOCATIONS: TerroirLocation[] = [
  {
    id: 'alentejo',
    name: 'Alentejo Plácido',
    title: 'Leite Biológico de Cabra de Pastagem',
    region: 'Baixo Alentejo e Montados',
    country: 'Portugal',
    ingredient: 'Matéria Láctea de Elite',
    coords: { x: 110, y: 240 },
    altitude: '100m - 300m',
    climate: 'Mediterrânico com forte insolação estival',
    soil: 'Luvissolos e Quartzito',
    harvest: 'Ordenha diária tradicional livre de stresse',
    story: 'As nossas cabras pastam livremente sob a copa protetora dos azinheiros, alimentando-se de rebentos tenros, mentrastos, orégãos e cardos espontâneos. O leite resultante é excecionalmente sedoso, limpo de traços metálicos e provido de ácidos gordos nobres.',
    productName: "L'Or Blanc Nature",
    productId: 'pure_velvet'
  },
  {
    id: 'algarve',
    name: 'Algarve (Sotavento)',
    title: 'Mel de Laranjeira Silvestre',
    region: 'Sotavento Algarvio',
    country: 'Portugal',
    ingredient: 'Favo de Mel e Pólen de Citrinos',
    coords: { x: 135, y: 310 },
    altitude: '150m - 250m',
    climate: 'Mediterrânico Seco, Temperado pelo Mar',
    soil: 'Calcário Vermelho Argiloso (Terra Rossa)',
    harvest: 'Extração manual tradicional em favos estritos',
    story: 'Os apiários do nosso produtor artesanal situam-se em ladeiras resguardadas e rodeadas de antigos pomares de laranjeiras. A proximidade marítima dá ao mel notas iodadas leves e um perfume floral sublime que equilibra a doçura de ouro.',
    productName: "Or Liquide d'Algarve",
    productId: 'honey_gold'
  },
  {
    id: 'douro',
    name: 'Douro (Encostas Xistosas)',
    title: 'Amêndoa de Altitude do Douro Superior',
    region: 'Vale do Douro e Régua',
    country: 'Portugal',
    ingredient: 'Amêndoas de Altitude Tostadas com Flor de Sal',
    coords: { x: 125, y: 155 },
    altitude: '450m - 600m',
    climate: 'Seco com invernos rudes e verões inclementes',
    soil: 'Xisto Fraturado Altamente Drenante',
    harvest: 'Varejo manual clássico e secagem ao sol',
    story: 'As amendoeiras suportam temperaturas agrestes nas encostas do vale do Douro. O elevado stresse hídrico impulsiona o fruto a acumular óleos gordos essenciais incríveis, resultando numa amêndoa ultracrocante e de teor mineral puro.',
    productName: "Poésie de Figue & Amande",
    productId: 'fig_almonds'
  },
  {
    id: 'bronte',
    name: 'Bronte (Monte Etna)',
    title: 'Pistáchio Verde de Bronte D.O.P.',
    region: 'Sicília (Catânia)',
    country: 'Itália',
    coords: { x: 420, y: 260 },
    ingredient: 'Genuíno Pistáchio Verde "Ouro Verde d\'Etna"',
    altitude: '600m - 900m',
    climate: 'Vulcânico Árido com Elevada Amplitude Térmica',
    soil: 'Lava Basáltica Vulcânica Negra',
    harvest: 'Colheita manual bienal delicada',
    story: 'Nascido nas encostas escarpadas de lava fria do vulcão Etna, este pistáchio lendário é colhido de dois em dois anos para revigorar o solo. Possui uma cor esmeralda deslumbrante e um sabor naturalmente salgado e resinoso.',
    productName: "Pistache Extrême Bronte",
    productId: 'pistachio_bronte'
  },
  {
    id: 'provence',
    name: 'Alpes da Provença',
    title: 'Lavanda Silvestre Verdadeira',
    region: 'Planaltos de Valensole',
    country: 'França',
    coords: { x: 285, y: 150 },
    ingredient: 'Flores Azuis de Lavanda Angustifolia',
    altitude: '800m - 1000m',
    climate: 'Alpes Continentais e Brisa do Sul',
    soil: 'Cárstico Calcário de Drenagem Rápida',
    harvest: 'Corte artesanal manual em julho',
    story: 'Este arbusto aromático cresce nos planaltos calcários ensolarados sob a brisa fresca dos Alpes. A altitude atenua notas florais canforadas amargas, revelando um linalol poético ideal para infusões místicas sobre a nossa base láctea.',
    productName: "Lavande & Myrtille Sauvage",
    productId: 'lavender_blueberry'
  }
];

// Interface for shopping cart item
interface CartItem {
  product: Product;
  size: '180g' | '450g';
  quantity: number;
}

export default function Home() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'home' | 'sobre' | 'produtos' | 'contacto'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedTerroir, setSelectedTerroir] = useState<string>('algarve');

  // Cart & Checkout State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'success'>('cart');
  
  // Checkout Customer Details Form
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  // Catalog Filters State
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('Todos');

  // Product Selection State (for Detailed View Modal)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedModalSize, setSelectedModalSize] = useState<'180g' | '450g'>('180g');

  // Interactive AI Sommelier State
  const [sommelierFlavor, setSommelierFlavor] = useState<string>(PRODUCT_DATA[0].name);
  const [sommelierOccasion, setSommelierOccasion] = useState<string>(OCCASIONS[0]);
  const [sommelierResult, setSommelierResult] = useState<any | null>(null);
  const [isSommelierPending, startSommelierTransition] = useTransition();

  // Interactive Kit Customizer State
  const [kitYogurt1, setKitYogurt1] = useState<string>("Baunilha Bourbon");
  const [kitYogurt2, setKitYogurt2] = useState<string>("Morango Velvet");
  const [kitGranola, setKitGranola] = useState<string>("Mel & Amêndoas");
  const [kitCompote, setKitCompote] = useState<string>("Calda de Frutos Vermelhos");
  const [kitSize, setKitSize] = useState<'180g' | '450g'>('180g');

  // Scroll visibility for Back to Top / Header sticky shadow
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync state or lock scroll on open modals
  useEffect(() => {
    if (selectedProduct || cartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProduct, cartOpen]);

  // Shopping Cart Actions
  const addToCart = (product: Product, size: '180g' | '450g', quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        return [...prevCart, { product, size, quantity }];
      }
    });

    // Elegant alert / Feedback confirmation
    // Instantly trigger cart drawer or subtle success visual instead of normal window alerts
    setCartOpen(true);
  };

  const updateCartQuantity = (productId: string, size: '180g' | '450g', amount: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const nextQuantity = item.quantity + amount;
            return { ...item, quantity: nextQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const removeCartItem = (productId: string, size: '180g' | '450g') => {
    setCart((prevCart) => prevCart.filter((item) => !(item.product.id === productId && item.size === size)));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const unitPrice = item.size === '180g' ? item.product.price180g : item.product.price450g;
      return total + unitPrice * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Compile Checkout details and Redirect to WhatsApp integration
  const handleFinalOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      return;
    }

    // Build perfect WhatsApp beautiful order message text
    const shopItemsText = cart.map(
      (item) => {
        const sizeFormatted = item.product.category === 'Granola Gourmet' 
          ? (item.size === '180g' ? '250g' : '500g') 
          : item.product.category === 'Kits Premium' 
          ? (item.size === '180g' ? 'Kit Padrão' : 'Grande Luxe') 
          : item.size;
        const price = (item.size === '180g' ? item.product.price180g : item.product.price450g) * item.quantity;
        return `- *${item.product.name}* [${sizeFormatted}] x${item.quantity} (${price.toFixed(2)}€)`;
      }
    ).join('\n');

    const totalText = `${getCartTotal().toFixed(2)}€`;

    const whatsAppMessage = `👑 *Novo Pedido Gourmet - L'Or Blanc* 👑

Olá, gostava de encomendar esta seleção exclusiva d'Or Blanc:

*PRODUTOS:*
${shopItemsText}

*VALOR TOTAL:* ${totalText}

---

*DADOS DE ENTREGA:*
📍 *Nome:* ${customerName}
📞 *Contacto:* ${customerPhone}
🗺️ *Morada:* ${customerAddress}
✉️ *Notas:* ${customerNotes || 'Sem notas adicionais.'}

Muito obrigada pela atenção. Aguardo a confirmação da reserva artesanal.`;

    const encodedText = encodeURIComponent(whatsAppMessage);
    // Real-world Portuguese phone dummy contact with exquisite service line
    const brandPhoneNumber = '351912345678';
    const waUrl = `https://wa.me/${brandPhoneNumber}?text=${encodedText}`;

    // Clear cart and step progress
    setCheckoutStep('success');
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  // Invoke Gemini Server API route for Pairing Recommendation
  const handleSommelierQuery = () => {
    startSommelierTransition(async () => {
      try {
        const response = await fetch('/api/pairings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ flavor: sommelierFlavor, occasion: sommelierOccasion }),
        });
        const data = await response.json();
        setSommelierResult(data);
      } catch (err) {
        console.error(err);
      }
    });
  };

  // Get filtered products catalog
  const filteredProducts = activeCategoryFilter === 'Todos' 
    ? PRODUCT_DATA 
    : PRODUCT_DATA.filter(prod => prod.category === activeCategoryFilter);

  return (
    <div className="min-h-screen flex flex-col selection:bg-gold-200 selection:text-luxury-charcoal" id="lor-blanc-root">
      
      {/* EXQUISITE NAVBAR SYSTEM */}
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled ? 'bg-cream-100/90 backdrop-blur-md shadow-sm border-b border-cream-200' : 'bg-[#FAF8F5]'}`} id="navbar-header">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-between">
          
          {/* Brand Serif Logo */}
          <button onClick={() => setActiveTab('home')} className="flex flex-col items-start focus:outline-none" id="brand-logo-btn">
            <span className="font-serif text-2xl sm:text-3xl tracking-widest font-normal text-luxury-charcoal uppercase">
              L'Or Blanc
            </span>
            <span className="font-mono text-[9px] tracking-[0.4em] text-gold-500 uppercase font-medium -mt-1 ml-0.5">
              l'élixir lacté
            </span>
          </button>

          {/* Nav Items Desktop */}
          <nav className="hidden md:flex items-center space-x-12" id="desktop-nav">
            <button 
              onClick={() => setActiveTab('home')}
              className={`font-sans text-xs tracking-[0.2em] uppercase font-medium transition-colors ${activeTab === 'home' ? 'text-gold-500 font-semibold' : 'text-luxury-charcoal/75 hover:text-gold-500'}`}
              id="nav-home"
            >
              Início
            </button>
            <button 
              onClick={() => setActiveTab('sobre')}
              className={`font-sans text-xs tracking-[0.2em] uppercase font-medium transition-colors ${activeTab === 'sobre' ? 'text-gold-500 font-semibold' : 'text-luxury-charcoal/75 hover:text-gold-500'}`}
              id="nav-about"
            >
              A Nossa História
            </button>
            <button 
              onClick={() => { setActiveTab('produtos'); setActiveCategoryFilter('Todos'); }}
              className={`font-sans text-xs tracking-[0.2em] uppercase font-medium transition-colors ${activeTab === 'produtos' ? 'text-gold-500 font-semibold' : 'text-luxury-charcoal/75 hover:text-gold-500'}`}
              id="nav-shop"
            >
              La Boutique
            </button>
            <button 
              onClick={() => setActiveTab('contacto')}
              className={`font-sans text-xs tracking-[0.2em] uppercase font-medium transition-colors ${activeTab === 'contacto' ? 'text-gold-500 font-semibold' : 'text-luxury-charcoal/75 hover:text-gold-500'}`}
              id="nav-contact"
            >
              Contactos
            </button>
          </nav>

          {/* Right Action Icons (Cart + Mobile Toggle) */}
          <div className="flex items-center space-x-6" id="nav-actions">
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-full border border-cream-200 bg-white/50 hover:bg-gold-100 transition-all duration-300 pointer-events-auto"
              aria-label="Toggle Shopping Cart"
              id="cart-btn"
            >
              <ShoppingBag className="w-5 h-5 text-luxury-charcoal" />
              {getCartCount() > 0 && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-gold-400 text-white font-mono text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md shadow-gold-500/20"
                >
                  {getCartCount()}
                </motion.div>
              )}
            </button>

            {/* Mobile Menu Icon Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-luxury-charcoal focus:outline-none"
              aria-label="Menu"
              id="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE DRAWER NAVIGATION */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden w-full bg-cream-100 border-b border-cream-200 px-6 py-8 flex flex-col space-y-6 z-30 absolute top-[72px]"
            id="mobile-drawer"
          >
            <button 
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className="text-left font-sans text-sm tracking-[0.25em] uppercase font-medium text-luxury-charcoal focus:outline-none"
            >
              Início
            </button>
            <button 
              onClick={() => { setActiveTab('sobre'); setMobileMenuOpen(false); }}
              className="text-left font-sans text-sm tracking-[0.25em] uppercase font-medium text-luxury-charcoal focus:outline-none"
            >
              A Nossa História
            </button>
            <button 
              onClick={() => { setActiveTab('produtos'); setActiveCategoryFilter('Todos'); setMobileMenuOpen(false); }}
              className="text-left font-sans text-sm tracking-[0.25em] uppercase font-medium text-luxury-charcoal focus:outline-none"
            >
              La Boutique
            </button>
            <button 
              onClick={() => { setActiveTab('contacto'); setMobileMenuOpen(false); }}
              className="text-left font-sans text-sm tracking-[0.25em] uppercase font-medium text-luxury-charcoal focus:outline-none"
            >
              Contactos
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE DISPLAY PAGES */}
      <main className="flex-grow flex flex-col" id="core-content-pages">
        <AnimatePresence mode="wait">
          
          {/* ===================== PAGE 1: HOME ===================== */}
          {activeTab === 'home' && (
            <motion.div 
              key="page-home"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col"
              id="home-page-container"
            >
              
              {/* Cinematic Hero Section */}
              <section className="relative min-h-[85vh] md:min-h-[88vh] bg-gradient-to-b from-[#FAF8F5] via-[#FAF6F0] to-[#F5EFE4] flex items-center justify-center py-12 px-6 sm:px-8 border-b border-cream-200" id="hero-section">
                
                {/* Background blur and abstract luxurious overlays */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,239,228,0.65),transparent)] pointer-events-none" />
                
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
                  
                  {/* Hero Left Content Text */}
                  <div className="lg:col-span-6 flex flex-col space-y-6 lg:space-y-8 text-left max-w-xl md:max-w-2xl" id="hero-left">
                    
                    <div className="flex items-center space-x-2 bg-white/70 border border-gold-200/50 py-1.5 px-3.5 rounded-full w-max text-[9px] font-mono tracking-[0.3em] text-gold-500 uppercase font-semibold" id="hero-banner">
                      <Award className="w-3.5 h-3.5 text-gold-400" />
                      <span>Produção limitada • Ingredientes naturais • Sem conservantes artificiais</span>
                    </div>

                    <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-luxury-charcoal font-normal leading-[1.1] tracking-tight" id="hero-title">
                      O luxo do artesanal em cada colherada.
                    </h1>

                    <p className="font-sans text-sm sm:text-base leading-relaxed text-luxury-charcoal/80 font-light" id="hero-para">
                      Iogurtes premium produzidos artesanalmente com ingredientes frescos, textura cremosa e sabores sofisticados para quem valoriza qualidade, saúde e experiência.
                    </p>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1 sm:pt-3" id="hero-ctas">
                      <button 
                        onClick={() => { setActiveTab('produtos'); setActiveCategoryFilter('Todos'); }}
                        className="bg-luxury-charcoal hover:bg-gold-500 text-cream-50 font-sans text-xs tracking-[0.2em] uppercase font-semibold py-4.5 px-9 rounded-full shadow-lg shadow-luxury-charcoal/10 transition-all duration-300 flex items-center justify-center space-x-2 group cursor-pointer"
                        id="hero-encomendar-btn"
                      >
                        <span>Encomendar Agora</span>
                        <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300" />
                      </button>

                      <button 
                        onClick={() => setActiveTab('produtos')}
                        className="bg-transparent border border-luxury-charcoal/20 hover:border-gold-400 hover:text-gold-500 text-luxury-charcoal font-sans text-xs tracking-[0.2em] uppercase font-semibold py-4.5 px-9 rounded-full transition-all duration-300 text-center cursor-pointer"
                        id="hero-descobrir-btn"
                      >
                        Descobrir Sabores
                      </button>
                    </div>

                    {/* Quick Stats Banner */}
                    <div className="grid grid-cols-3 gap-6 pt-6 border-t border-cream-200" id="hero-stats">
                      <div className="flex flex-col">
                        <span className="font-serif text-2xl font-normal text-gold-500">18h</span>
                        <span className="font-mono text-[9px] tracking-wider text-luxury-charcoal/50 uppercase">Maturação Lentíssima</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-serif text-2xl font-normal text-gold-500">100%</span>
                        <span className="font-mono text-[9px] tracking-wider text-luxury-charcoal/50 uppercase">Biológico Local</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-serif text-2xl font-normal text-gold-500">Zero</span>
                        <span className="font-mono text-[9px] tracking-wider text-luxury-charcoal/50 uppercase">Conservantes</span>
                      </div>
                    </div>

                  </div>

                  {/* Hero Right Media Photo */}
                  <div className="lg:col-span-6 relative flex items-center justify-center" id="hero-right">
                    <div className="relative w-full max-w-[500px] aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-luxury-charcoal/5 border border-cream-200" id="hero-image-frame">
                      <img 
                        src="/src/assets/images/lor_blanc_hero_1779481670076.png" 
                        alt="L'Or Blanc premium artisanal yogurt luxury presentation with organic honey and fresh pistachios"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Floating luxurious tagline badge */}
                      <div className="absolute bottom-6 left-6 right-6 glass-light rounded-2xl p-4 flex items-center space-x-4">
                        <div className="p-3 bg-gold-400 rounded-lg text-white">
                          <Leaf className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-serif text-sm font-normal text-luxury-charcoal italic leading-tight">
                            "A joia lactea da nossa gastronomia."
                          </p>
                          <p className="font-sans text-[10px] tracking-wider text-luxury-charcoal/60 uppercase mt-0.5">
                            Marie Claire Gourmet
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </section>

              {/* SECTION: BRAND STORYTELLING (Mais do que iogurte. Uma experiência gourmet.) */}
              <section className="bg-white py-24 px-6 sm:px-8 border-b border-cream-200" id="brand-storytelling">
                <div className="max-w-4xl mx-auto w-full text-center space-y-8">
                  <span className="font-mono text-[10px] tracking-[0.35em] text-gold-500 uppercase font-semibold block">O Nosso Manifesto</span>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-luxury-charcoal font-normal leading-tight">
                    Mais do que iogurte. Uma experiência gourmet.
                  </h2>
                  <div className="space-y-6 text-sm sm:text-base text-luxury-charcoal/85 leading-relaxed font-light font-sans max-w-2xl mx-auto">
                    <p>
                      Cada receita nasce da combinação entre tradição artesanal, ingredientes selecionados e uma obsessão absoluta por qualidade.
                    </p>
                    <p>
                      Os nossos iogurtes são preparados cuidadosamente em pequenos lotes para garantir sabor autêntico, textura rica e frescura incomparável.
                    </p>
                    <p className="font-serif italic text-gold-500 text-lg">
                      Criamos uma experiência premium para pessoas que apreciam alimentação saudável sem abdicar de sofisticação.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION: INGREDIENTES NATURAIS (Pureza que se sente no sabor.) */}
              <section className="bg-[#FAF8F5] py-24 px-6 sm:px-8 border-b border-cream-200" id="natural-ingredients">
                <div className="max-w-7xl mx-auto w-full">
                  
                  <div className="text-center max-w-xl mx-auto space-y-4 mb-20" id="ingredients-header">
                    <span className="font-mono text-[10px] tracking-[0.35em] text-gold-500 uppercase font-semibold">Ingredientes de Origem</span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-luxury-charcoal font-normal">
                      Pureza que se sente no sabor.
                    </h2>
                    <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/65 leading-relaxed font-light">
                      Selecionamos rigorosamente as nossas matérias-primas de produtores locais para garantir pureza sem aditivos industriais.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" id="ingredients-cards-grid">
                    
                    {/* Card 1 */}
                    <div className="bg-white border border-cream-200 p-8 rounded-2xl flex flex-col space-y-4 text-left shadow-sm hover:border-gold-300 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="w-12 h-12 bg-cream-100 rounded-xl flex items-center justify-center text-gold-500">
                        <Award className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif text-lg font-medium text-luxury-charcoal">Leite Fresco Selecionado</h3>
                      <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/70 leading-relaxed font-light">
                        Utilizamos leite de alta qualidade para criar uma textura cremosa e equilibrada.
                      </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white border border-cream-200 p-8 rounded-2xl flex flex-col space-y-4 text-left shadow-sm hover:border-gold-300 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="w-12 h-12 bg-cream-100 rounded-xl flex items-center justify-center text-gold-500">
                        <Leaf className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif text-lg font-medium text-luxury-charcoal">Frutas Naturais</h3>
                      <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/70 leading-relaxed font-light">
                        Sabores reais, intensos e frescos, sem aromas artificiais exagerados.
                      </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white border border-cream-200 p-8 rounded-2xl flex flex-col space-y-4 text-left shadow-sm hover:border-gold-300 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="w-12 h-12 bg-cream-100 rounded-xl flex items-center justify-center text-gold-500">
                        <Utensils className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif text-lg font-medium text-luxury-charcoal">Produção Artesanal</h3>
                      <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/70 leading-relaxed font-light">
                        Cada lote é preparado cuidadosamente para garantir excelência em cada detalhe.
                      </p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white border border-cream-200 p-8 rounded-2xl flex flex-col space-y-4 text-left shadow-sm hover:border-gold-300 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="w-12 h-12 bg-cream-100 rounded-xl flex items-center justify-center text-gold-500">
                        <Clock className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif text-lg font-medium text-luxury-charcoal">Sem Conservantes Excessivos</h3>
                      <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/70 leading-relaxed font-light">
                        Mais naturalidade. Mais autenticidade. Mais qualidade.
                      </p>
                    </div>

                  </div>

                </div>
              </section>

              {/* BRAND NEW SECTION: KIT SIGNATURE PREMIUM CUSTOMIZER (ALYANE) */}
              <section className="bg-[#FAF8F5] py-24 px-6 sm:px-8 border-b border-cream-200" id="kit-signature-customizer">
                <div className="max-w-7xl mx-auto w-full space-y-16">
                  
                  {/* Section Title */}
                  <div className="text-center max-w-2xl mx-auto space-y-3" id="kit-title-wrapper">
                    <span className="font-mono text-[9px] tracking-[0.35em] text-gold-500 uppercase font-semibold block bg-white border border-cream-200 rounded-full py-1 px-4 w-max mx-auto">
                      Atelier Alyane de Assinatura
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-luxury-charcoal font-normal">
                      Crie o Seu Kit Signature Premium
                    </h2>
                    <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/70 leading-relaxed font-light">
                      A união perfeita d'Alyane. Junte o laticínio fresco integral à crocância da granola em pequenos lotes e compotas de autor para simular a realeza europeia. Personalize a sua caixa com fita dourada e receba de forma artesanal.
                    </p>
                  </div>

                  {/* Two-Column Interactive Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start" id="kit-customizer-grid">
                    
                    {/* Left Column: Visual Representation & Inclusions */}
                    <div className="lg:col-span-5 space-y-8 flex flex-col items-center lg:items-start" id="kit-visual-col">
                      <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] w-full max-w-md rounded-3xl overflow-hidden border border-cream-200/60 shadow-2xl bg-[#EDECE9] group">
                        <img 
                          src="/src/assets/images/lor_blanc_hero_1779481670076.png" 
                          alt="Kit Signature Premium Alyane" 
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        {/* Elite label */}
                        <div className="absolute top-4 right-4 bg-white/95 border border-gold-300 py-1.5 px-3.5 rounded-full shadow-sm">
                          <span className="font-mono text-[8px] tracking-widest text-gold-500 uppercase font-bold">O Trio Ideal d'Ouro</span>
                        </div>
                      </div>

                      {/* Kit Inclusions list with tiny elegant card styling */}
                      <div className="bg-white border border-cream-200/60 p-6 rounded-2xl w-full max-w-md text-left space-y-4 shadow-sm">
                        <h4 className="font-serif text-base font-normal text-luxury-charcoal border-b border-cream-100 pb-2">O Que Está Incluído no Seu Kit:</h4>
                        
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3 text-xs">
                            <span className="w-5 h-5 rounded-full bg-cream-100 border border-gold-300 flex items-center justify-center font-mono text-[9px] text-gold-500 font-bold shrink-0">2x</span>
                            <div>
                              <p className="font-sans font-medium text-luxury-charcoal">Iogurtes Artesanais Premium (180g)</p>
                              <p className="font-sans text-[10px] text-luxury-charcoal/50">Cremoso e aveludado, maturado 18 horas lentamente.</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3 text-xs">
                            <span className="w-5 h-5 rounded-full bg-cream-100 border border-gold-300 flex items-center justify-center font-mono text-[9px] text-gold-500 font-bold shrink-0">1x</span>
                            <div>
                              <p className="font-sans font-medium text-luxury-charcoal">Granola Gourmet Artesanal (250g)</p>
                              <p className="font-sans text-[10px] text-luxury-charcoal/50">Signature Crunch super crocante de pequena tiragem.</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3 text-xs">
                            <span className="w-5 h-5 rounded-full bg-cream-100 border border-gold-300 flex items-center justify-center font-mono text-[9px] text-gold-500 font-bold shrink-0">1x</span>
                            <div>
                              <p className="font-sans font-medium text-luxury-charcoal">Compota Premium (180g)</p>
                              <p className="font-sans text-[10px] text-luxury-charcoal/50">Redução lenta de frutas em frascos de luxo.</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3 text-xs">
                            <span className="w-5 h-5 rounded-full bg-[#161412] text-cream-50 flex items-center justify-center font-mono text-[10px] shrink-0">🥄</span>
                            <div>
                              <p className="font-sans font-medium text-luxury-charcoal">Colher de Madeira Premium & Caixa de Presente</p>
                              <p className="font-sans text-[10px] text-luxury-charcoal/50">Embalagem editorial com fita de cetim elegante.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Customizer Selector Panel */}
                    <div className="lg:col-span-7 bg-white border border-cream-200/80 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 text-left w-full" id="kit-configurator-box">
                      
                      {/* 1. Sizing Selector */}
                      <div className="space-y-3">
                        <span className="font-mono text-[9px] tracking-widest text-[#2E2A25]/55 uppercase block font-semibold">1. Selecione o Tamanho do Vosso Kit</span>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            onClick={() => setKitSize('180g')}
                            className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all duration-300 ${kitSize === '180g' ? 'border-luxury-charcoal bg-[#FAF8F5] shadow-sm' : 'border-cream-200 hover:border-gold-300'}`}
                          >
                            <span className="font-serif text-sm font-medium text-luxury-charcoal">Kit Signature Padrão</span>
                            <span className="font-mono text-[10px] text-gold-500 uppercase mt-1">24.90 €</span>
                          </button>

                          <button
                            onClick={() => setKitSize('450g')}
                            className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all duration-300 ${kitSize === '450g' ? 'border-luxury-charcoal bg-[#FAF8F5] shadow-sm' : 'border-cream-200 hover:border-gold-300'}`}
                          >
                            <span className="font-serif text-sm font-medium text-luxury-charcoal">Kit Grande Luxe</span>
                            <span className="font-mono text-[10px] text-gold-500 uppercase mt-1">44.90 € • Mais Toppings</span>
                          </button>
                        </div>
                      </div>

                      {/* 2. Yogurt 1 Selector */}
                      <div className="space-y-2">
                        <label className="font-mono text-[9px] tracking-widest text-[#2E2A25]/55 uppercase block font-semibold">2. Escolha o Primeiro Iogurte Premium</label>
                        <select 
                          value={kitYogurt1}
                          onChange={(e) => setKitYogurt1(e.target.value)}
                          className="w-full bg-[#FAF8F5] border border-cream-300 rounded-xl px-4 py-3 text-sm text-luxury-charcoal focus:outline-none focus:ring-1 focus:ring-gold-400 focus:border-gold-400 font-sans cursor-pointer"
                        >
                          {['Baunilha Bourbon', 'Morango Velvet', 'Manga Gold', 'Berry Signature'].map((opt) => (
                            <option key={`k-y1-${opt}`} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      {/* 3. Yogurt 2 Selector */}
                      <div className="space-y-2">
                        <label className="font-mono text-[9px] tracking-widest text-[#2E2A25]/55 uppercase block font-semibold">3. Escolha o Segundo Iogurte Premium</label>
                        <select 
                          value={kitYogurt2}
                          onChange={(e) => setKitYogurt2(e.target.value)}
                          className="w-full bg-[#FAF8F5] border border-cream-300 rounded-xl px-4 py-3 text-sm text-luxury-charcoal focus:outline-none focus:ring-1 focus:ring-gold-400 focus:border-gold-400 font-sans cursor-pointer"
                        >
                          {['Baunilha Bourbon', 'Morango Velvet', 'Manga Gold', 'Berry Signature'].map((opt) => (
                            <option key={`k-y2-${opt}`} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      {/* 4. Granola Selector */}
                      <div className="space-y-2">
                        <label className="font-mono text-[9px] tracking-widest text-[#2E2A25]/55 uppercase block font-semibold">4. Escolha a Granola Gourmet de Autor</label>
                        <select 
                          value={kitGranola}
                          onChange={(e) => setKitGranola(e.target.value)}
                          className="w-full bg-[#FAF8F5] border border-cream-300 rounded-xl px-4 py-3 text-sm text-luxury-charcoal focus:outline-none focus:ring-1 focus:ring-gold-400 focus:border-gold-400 font-sans cursor-pointer"
                        >
                          {['Mel & Amêndoas', 'Pistáchio Premium', 'Chocolate Negro & Avelã', 'Coco Tostado', 'Canela & Nozes', 'Cranberry Gourmet'].map((opt) => (
                            <option key={`k-gr-${opt}`} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      {/* 5. Compote Selector */}
                      <div className="space-y-2">
                        <label className="font-mono text-[9px] tracking-widest text-[#2E2A25]/55 uppercase block font-semibold">5. Escolha a Compota Gourmet</label>
                        <select 
                          value={kitCompote}
                          onChange={(e) => setKitCompote(e.target.value)}
                          className="w-full bg-[#FAF8F5] border border-cream-300 rounded-xl px-4 py-3 text-sm text-luxury-charcoal focus:outline-none focus:ring-1 focus:ring-gold-400 focus:border-gold-400 font-sans cursor-pointer"
                        >
                          {['Compota de Morango Artesanal', 'Calda de Frutos Vermelhos', 'Manga Tropical Reduction', 'Blueberry Premium', 'Caramelo Salgado Artesanal', 'Mel Premium infusionado'].map((opt) => (
                            <option key={`k-cp-${opt}`} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      {/* Price & Cart Add button */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-cream-200">
                        <div className="text-center sm:text-left w-full sm:w-auto">
                          <span className="font-mono text-[9px] text-[#2E2A25]/40 uppercase block">Valor d'Atelier</span>
                          <span className="font-serif text-3xl font-normal text-luxury-charcoal">
                            {kitSize === '180g' ? '24.90' : '44.90'} €
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            // Locate standard kit base product
                            const baseKit = PRODUCT_DATA.find(p => p.id === 'kit_signature_premium') || PRODUCT_DATA[PRODUCT_DATA.length - 1];
                            const customizedProduct: Product = {
                              ...baseKit,
                              name: `Kit Signature (${kitYogurt1} + ${kitYogurt2} • ${kitGranola} • ${kitCompote})`,
                            };
                            addToCart(customizedProduct, kitSize, 1);
                          }}
                          className="bg-[#2E2A25] hover:bg-gold-500 text-white font-sans text-xs tracking-[0.2em] uppercase font-bold py-4 px-8 rounded-xl shadow-md transition-all duration-300 w-full sm:w-auto text-center cursor-pointer"
                        >
                          Adicionar Kit ao Carrinho
                        </button>
                      </div>

                    </div>

                  </div>

                </div>
              </section>
              <section className="bg-cream-100 py-20 px-6 sm:px-8 border-b border-cream-200" id="featured-flavors">
                <div className="max-w-7xl mx-auto w-full">
                  
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16" id="flavors-heading-flex">
                    <div className="space-y-3">
                      <span className="font-mono text-[10px] tracking-[0.35em] text-gold-500 uppercase font-semibold">Criações L'Or de Assinatura</span>
                      <h2 className="font-serif text-3xl sm:text-4xl text-luxury-charcoal font-normal">
                        O Triunfo dos Nossos Sabores
                      </h2>
                    </div>
                    
                    <button 
                      onClick={() => { setActiveTab('produtos'); setActiveCategoryFilter('Todos'); }}
                      className="text-gold-500 hover:text-luxury-charcoal font-sans text-xs tracking-[0.2em] font-medium uppercase flex items-center space-x-2 group shrink-0 transition-colors"
                    >
                      <span>Ver Toda a Coleção</span>
                      <ChevronRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10" id="featured-flavors-grid">
                    {/* Render top 3 flavors with exquisite photo grids */}
                    {PRODUCT_DATA.slice(0, 3).map((product) => (
                      <div 
                        key={`featured-${product.id}`}
                        className="bg-white rounded-3xl overflow-hidden border border-cream-200/50 shadow-lg shadow-luxury-charcoal/5 flex flex-col h-full group pointer-events-auto"
                        id={`featured-card-${product.id}`}
                      >
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-50">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 rounded-full text-[9px] font-mono tracking-wider font-medium text-gold-500 uppercase">
                            {product.category}
                          </div>
                        </div>

                        <div className="p-6 sm:p-8 flex flex-col flex-grow text-left">
                          <span className="font-mono text-[9px] tracking-[0.3em] text-gold-500 uppercase mb-1">{product.tagline}</span>
                          <h3 className="font-serif text-2xl font-normal text-luxury-charcoal mb-2">{product.name}</h3>
                          <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/70 line-clamp-3 font-light mb-6">
                            {product.description}
                          </p>

                          <div className="mt-auto flex items-center justify-between pt-4 border-t border-cream-100">
                            <div>
                              <span className="text-[10px] text-luxury-charcoal/40 font-mono block uppercase">Frasco Artesanal</span>
                              <span className="font-serif text-lg font-medium text-luxury-charcoal">{product.price180g.toFixed(2)} €</span>
                            </div>

                            <button
                              onClick={() => setSelectedProduct(product)}
                              className="text-xs font-semibold uppercase tracking-wider text-luxury-charcoal border-b border-luxury-charcoal hover:text-gold-500 hover:border-gold-400 pb-0.5 transition-all duration-300 font-sans cursor-pointer"
                            >
                              Descobrir Segredos
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </section>

              {/* INTERACTIVE ELITE FEATURE: SOMMELIER IA CONCIERGE */}
              <section className="bg-white py-20 px-6 sm:px-8 border-b border-cream-200" id="ai-sommelier">
                <div className="max-w-7xl mx-auto w-full">
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* Left text column describing the premium pairing experience */}
                    <div className="lg:col-span-5 text-left space-y-6" id="sommelier-info">
                      <div className="flex items-center space-x-2 w-max text-[9px] font-mono tracking-[0.35em] text-gold-500 uppercase font-semibold bg-gold-100 rounded-full py-1 px-3">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Experiência Sensorial • Gemini AI</span>
                      </div>

                      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-luxury-charcoal font-normal leading-tight">
                        Sommelier <span className="font-serif italic text-gold-500">Inteligente</span> de Harmonizações
                      </h2>

                      <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/75 leading-relaxed font-light">
                        A nossa marca eleva o iogurte artesanal à alta-roda gastronómica. Selecione a sua variedade favorita e qual a ocasião de degustação, e o nosso Sommelier IA recomendará combinações poéticas de toppings gourmet e bebidas de acompanhamento para criar um momento gastronómico memorável.
                      </p>

                      {/* Design Accent signature */}
                      <div className="pt-2">
                        <span className="font-serif italic text-xl text-gold-500 font-light block">"A arte do paladar recriada em exclusivo."</span>
                        <span className="font-sans text-[9px] tracking-widest text-luxury-charcoal/50 uppercase block mt-1">L'Or Blanc Sommelier Team</span>
                      </div>
                    </div>

                    {/* Right interactive tool widget */}
                    <div className="lg:col-span-7 bg-cream-50 border border-cream-200 p-6 sm:p-10 rounded-3xl shadow-xl shadow-luxury-charcoal/5 flex flex-col space-y-6" id="sommelier-widget">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        
                        {/* Selector 1: Yogurt flavor */}
                        <div className="flex flex-col text-left space-y-2">
                          <label className="font-mono text-[9px] tracking-widest text-luxury-charcoal/50 uppercase font-medium">1. Escolha a Variedade</label>
                          <div className="relative">
                            <select 
                              value={sommelierFlavor}
                              onChange={(e) => setSommelierFlavor(e.target.value)}
                              className="w-full bg-white border border-cream-300 rounded-xl px-4 py-3 text-sm text-luxury-charcoal focus:outline-none focus:ring-1 focus:ring-gold-400 focus:border-gold-400 appearance-none font-sans"
                            >
                              {PRODUCT_DATA.map((prod) => (
                                <option key={prod.id} value={prod.name}>
                                  {prod.name}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="w-4 h-4 text-luxury-charcoal/40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>

                        {/* Selector 2: Occasion */}
                        <div className="flex flex-col text-left space-y-2">
                          <label className="font-mono text-[9px] tracking-widest text-luxury-charcoal/50 uppercase font-medium">2. Ocasião Solene</label>
                          <div className="relative">
                            <select 
                              value={sommelierOccasion}
                              onChange={(e) => setSommelierOccasion(e.target.value)}
                              className="w-full bg-white border border-cream-300 rounded-xl px-4 py-3 text-sm text-luxury-charcoal focus:outline-none focus:ring-1 focus:ring-gold-400 focus:border-gold-400 appearance-none font-sans"
                            >
                              {OCCASIONS.map((occ) => (
                                <option key={occ} value={occ}>
                                  {occ}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="w-4 h-4 text-luxury-charcoal/40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>

                      </div>

                      <button 
                        onClick={handleSommelierQuery}
                        disabled={isSommelierPending}
                        className="w-full bg-luxury-charcoal hover:bg-gold-500 disabled:bg-luxury-charcoal/60 text-white font-sans text-xs tracking-[0.2em] uppercase font-semibold py-4.5 rounded-xl transition-all duration-300 shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                        id="sommelier-submit-btn"
                      >
                        {isSommelierPending ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Consultando o Sommelier d'Or...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            <span>Consultar Harmonização</span>
                          </>
                        )}
                      </button>

                      {/* Display response recommendation beautifully */}
                      <AnimatePresence mode="wait">
                        {sommelierResult && (
                          <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            className="bg-white border border-gold-200/50 rounded-2xl p-6 sm:p-8 text-left space-y-4 shadow-sm"
                            id="sommelier-response-block"
                          >
                            <div className="flex items-center justify-between border-b border-cream-200 pb-3">
                              <span className="font-serif italic text-base sm:text-lg text-gold-500 font-medium">
                                {sommelierResult.title}
                              </span>
                              <span className="font-mono text-[8px] tracking-widest text-gold-500 font-semibold uppercase bg-gold-100 px-2 py-0.5 rounded">
                                Emparelhamento Ideal
                              </span>
                            </div>

                            <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/80 leading-relaxed font-light italic">
                              "{sommelierResult.description}"
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                              
                              <div className="space-y-1.5">
                                <span className="font-mono text-[9px] tracking-wider text-luxury-charcoal/50 uppercase block">1. Toppings Finais</span>
                                <div className="flex flex-wrap gap-1.5">
                                  {sommelierResult.ingredients?.map((ing: string, idx: number) => (
                                    <span key={idx} className="bg-cream-100 text-luxury-charcoal/85 text-[10px] font-sans px-2.5 py-1 rounded-md border border-cream-200">
                                      {ing}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="space-y-1">
                                <span className="font-mono text-[9px] tracking-wider text-luxury-charcoal/50 uppercase block">2. Bebida de Acompanhamento</span>
                                <span className="font-sans text-xs font-medium text-gold-600 block pl-1 border-l-2 border-gold-400">
                                  {sommelierResult.beverage}
                                </span>
                              </div>

                            </div>

                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>

                  </div>

                </div>
              </section>

              {/* LIFESTYLE EDITORIAL GALLERY (Criado para momentos especiais.) */}
              <section className="bg-cream-100 py-24 px-6 sm:px-8 border-b border-cream-200" id="lifestyle-gallery">
                <div className="max-w-7xl mx-auto w-full space-y-12">
                  
                  <div className="text-center max-w-2xl mx-auto space-y-3" id="gallery-header">
                    <span className="font-mono text-[10px] tracking-[0.35em] text-gold-500 uppercase font-semibold">Lifestyle L'Or Blanc</span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-luxury-charcoal font-normal">
                      Criado para momentos especiais.
                    </h2>
                    <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/75 leading-relaxed font-light">
                      Desde o pequeno-almoço até aos momentos de pausa mais sofisticados do seu dia, os nossos iogurtes transformam rotinas simples em experiências memoráveis. Cada detalhe foi pensado para proporcionar prazer, leveza e exclusividade.
                    </p>
                  </div>

                  {/* Elegant asymmetric bento image grid represent luxury aesthetic */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="bento-grid">
                    
                    <div className="md:col-span-8 relative aspect-video rounded-3xl overflow-hidden shadow-sm group">
                      <img 
                        src="/src/assets/images/lor_blanc_craft_1779481741122.png" 
                        alt="Artisanal dairy production process with white textiles" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8 text-left">
                        <div>
                          <p className="font-serif text-lg text-white">Produção Manual em Pequenos Lotes</p>
                          <p className="font-sans text-[10px] tracking-wider text-cream-100/80 uppercase">A herança da filtração lenta clássica</p>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-4 relative aspect-square md:aspect-auto rounded-3xl overflow-hidden shadow-sm group bg-luxury-charcoal flex flex-col justify-between p-8 text-left text-cream-50 pointer-events-auto">
                      <div className="space-y-3">
                        <Sparkles className="w-8 h-8 text-gold-450" />
                        <h4 className="font-serif text-2xl font-normal leading-snug">
                          Dedicado aos Paladares Mais Seletivos.
                        </h4>
                      </div>
                      <p className="font-sans text-xs text-cream-100/70 font-light leading-relaxed">
                        Inspirado na sofisticação da farmácia-botânica tradicional e no design atemporal das grandes casas parisienses.
                      </p>
                    </div>

                  </div>

                </div>
              </section>

              {/* TESTIMONIALS SECTION (Quem prova, volta sempre.) */}
              <section className="bg-white py-24 px-6 sm:px-8 border-b border-cream-200" id="testimonials">
                <div className="max-w-5xl mx-auto w-full text-center space-y-16">
                  
                  <div className="space-y-3">
                    <span className="font-mono text-[10px] tracking-[0.35em] text-gold-500 uppercase font-semibold">Relações de Confiança</span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-luxury-charcoal font-normal">
                      Quem prova, volta sempre.
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left" id="testimonials-grid">
                    
                    <div className="space-y-4 border-l-2 border-gold-300 pl-6" id="testimonial-1">
                      <p className="font-serif text-base text-luxury-charcoal/90 italic font-light leading-relaxed">
                        “Finalmente encontrei um iogurte artesanal que realmente parece premium. A textura é incrível.”
                      </p>
                      <div>
                        <p className="font-sans text-xs font-semibold uppercase tracking-wider text-luxury-charcoal">Beatriz Valadares</p>
                        <p className="font-sans text-[10px] tracking-widest text-luxury-charcoal/50 uppercase">Cliente de Assinatura</p>
                      </div>
                    </div>

                    <div className="space-y-4 border-l-2 border-gold-300 pl-6" id="testimonial-2">
                      <p className="font-serif text-base text-luxury-charcoal/90 italic font-light leading-relaxed">
                        “O sabor é extremamente natural e sofisticado. Dá para sentir a qualidade.”
                      </p>
                      <div>
                        <p className="font-sans text-xs font-semibold uppercase tracking-wider text-luxury-charcoal">Chef Tiago Castanheira</p>
                        <p className="font-sans text-[10px] tracking-widest text-luxury-charcoal/50 uppercase">Cliente Gourmet</p>
                      </div>
                    </div>

                    <div className="space-y-4 border-l-2 border-gold-300 pl-6" id="testimonial-3">
                      <p className="font-serif text-base text-luxury-charcoal/90 italic font-light leading-relaxed">
                        “A embalagem, o sabor e a experiência são impecáveis.”
                      </p>
                      <div>
                        <p className="font-sans text-xs font-semibold uppercase tracking-wider text-luxury-charcoal">Inês Sobral</p>
                        <p className="font-sans text-[10px] tracking-widest text-luxury-charcoal/50 uppercase">Cliente Certificada</p>
                      </div>
                    </div>

                  </div>

                </div>
              </section>

            </motion.div>
          )}

          {/* ===================== PAGE 2: SOBRE (A história de luxo) ===================== */}
          {activeTab === 'sobre' && (
            <motion.div 
              key="page-sobre"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-24 space-y-20 sm:space-y-28 text-left"
              id="about-page-container"
            >
              
              {/* Top Banner Story header (A arte de fazer iogurte premium.) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="about-intro">
                <div className="lg:col-span-4 space-y-3">
                  <span className="font-mono text-[10px] tracking-[0.35em] text-gold-500 uppercase font-semibold">A Nossa Alma</span>
                  <h1 className="font-serif text-4xl sm:text-5xl text-luxury-charcoal font-normal">
                    A arte de fazer iogurte premium.
                  </h1>
                </div>
                <div className="lg:col-span-8 pt-2">
                  <p className="font-serif italic text-xl sm:text-2xl text-gold-500 font-light leading-relaxed mb-6">
                    "A nossa marca nasceu da paixão por produtos artesanais de alta qualidade."
                  </p>
                  <div className="font-sans text-sm sm:text-base text-luxury-charcoal/85 leading-relaxed font-light space-y-6">
                    <p>
                      Acreditamos que alimentação saudável também pode ser sofisticada, elegante e memorável. Por isso produzimos iogurtes premium com foco absoluto em:
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 pt-2 pb-4">
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                        <span className="font-sans font-medium text-luxury-charcoal text-sm">Qualidade Máxima</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                        <span className="font-sans font-medium text-luxury-charcoal text-sm">Frescura Absoluta</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                        <span className="font-sans font-medium text-luxury-charcoal text-sm">Autenticidade Pura</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                        <span className="font-sans font-medium text-luxury-charcoal text-sm">Experiência Gastronómica Única</span>
                      </div>
                    </div>

                    <p className="font-serif italic text-lg text-gold-500/90 pt-1">
                      Cada colherada reflete o nosso compromisso com a excelência.
                    </p>
                  </div>
                </div>
              </div>

              {/* Master Process details showcasing the craft image generated */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="about-process">
                
                <div className="lg:col-span-6 relative aspect-video sm:aspect-square md:aspect-video rounded-3xl overflow-hidden shadow-xl" id="about-process-media">
                  <img 
                    src="/src/assets/images/lor_blanc_craft_1779481741122.png" 
                    alt="L'Or Blanc artisanal copper vat slow filtering milk process" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="lg:col-span-6 space-y-6 sm:space-y-8" id="about-process-text">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-gold-500 uppercase font-semibold">O Processo Tradicional</span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-luxury-charcoal font-normal">Maturação Lenta & Extração Manual</h2>
                  
                  <div className="space-y-6" id="about-steps">
                    
                    <div className="flex items-start space-x-4">
                      <span className="font-serif italic text-2xl text-gold-500 font-light mt-0.5">01</span>
                      <div>
                        <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-luxury-charcoal">Filtração do Soro</h4>
                        <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/70 leading-relaxed font-light mt-1">
                          Em vez de centrífugas rotativas gigantes, suspendemos o nosso creme em tecidos de linho puro biológico francês para extrair o soro lentamente pelo peso gravitacional natural. Isto preserva as delicadas glândulas lipídicas intactas.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <span className="font-serif italic text-2xl text-gold-500 font-light mt-0.5">02</span>
                      <div>
                        <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-luxury-charcoal">Reserva Estrita</h4>
                        <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/70 leading-relaxed font-light mt-1">
                          Os nossos fermentos autóctones são nutridos continuamente. A fermentação ocorre numa câmara de repouso silenciosa por 18 horas a temperaturas controladas ao detalhe de frações de grau Celsius.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* INGREDIENTS BOTANICAL GALLERY */}
              <div className="space-y-16" id="about-ingredients-section">
                
                <div className="text-center max-w-xl mx-auto space-y-3" id="ingredients-header">
                  <span className="font-mono text-[10px] tracking-[0.35em] text-gold-500 uppercase font-semibold">Gourmet Terroir</span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-luxury-charcoal font-normal">
                    Ingredientes Inteiramente Nobres
                  </h2>
                  <p className="font-sans text-xs text-luxury-charcoal/65 leading-relaxed font-light">
                    Exploramos os ecossistemas mais puros do Sul da Europa para recolher matérias-primas raras, com denominações protegidas, valorizando o terroir e a integridade de cada sabor.
                  </p>
                </div>

                {/* Grid layout of original botanical blocks */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6" id="ingredients-grid">
                  
                  <div className="bg-white border border-cream-200 p-6 rounded-2xl space-y-3">
                    <span className="font-serif italic text-xl text-gold-500 block">Pistáchio DOP Brontesi</span>
                    <p className="font-sans text-xs text-luxury-charcoal/70 leading-relaxed font-light">
                      O lendário fruto das encostas vulcânicas do Etna, na Sicília. Notas terrosas e levemente salgadas únicas no mundo.
                    </p>
                  </div>

                  <div className="bg-white border border-cream-200 p-6 rounded-2xl space-y-3">
                    <span className="font-serif italic text-xl text-gold-500 block">Favo de Laranjeira</span>
                    <p className="font-sans text-xs text-luxury-charcoal/70 leading-relaxed font-light">
                      Mel biológico extraído artesanalmente no sotavento algarvio, portador de notas cítricas e delicadas notas florais de laranjeira.
                    </p>
                  </div>

                  <div className="bg-white border border-cream-200 p-6 rounded-2xl space-y-3">
                    <span className="font-serif italic text-xl text-gold-500 block">Figo Roxo de Pasmados</span>
                    <p className="font-sans text-xs text-luxury-charcoal/70 leading-relaxed font-light">
                      Cultivados em encostas ensolaradas, caramelizados lentamente na sua própria frutose rica e densa.
                    </p>
                  </div>

                  <div className="bg-white border border-cream-200 p-6 rounded-2xl space-y-3">
                    <span className="font-serif italic text-xl text-gold-500 block">Leite Certificado</span>
                    <p className="font-sans text-xs text-luxury-charcoal/70 leading-relaxed font-light">
                      De pastagens protegidas e rebanhos criados livres ao ar livre. Produz leite rico em proteínas funcionais e ácidos gordos nobres.
                    </p>
                  </div>

                </div>

                {/* STYLIZED INTERACTIVE MAP CARDS BLOCK */}
                <div className="space-y-8 pt-8 border-t border-cream-200/60" id="terroir-interactive-block">
                  <div className="text-left space-y-2">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-gold-500 uppercase font-semibold block">Geografia Seletiva d'Or Blanc</span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-luxury-charcoal font-normal">
                      Mapa de Origens do Terroir
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/70 leading-relaxed font-light max-w-2xl">
                      Toque nos pontos brilhantes do mapa mediterrânico ou filtre os locais na barra para conhecer a microclimatologia, composição de solos e histórias de colheitas ancestrais dos nossos parceiros.
                    </p>
                  </div>

                  {/* Locations select tabs bar */}
                  <div className="flex flex-wrap gap-2 pb-2" id="terroir-tabs">
                    {TERROIR_LOCATIONS.map((loc) => {
                      const isSelected = selectedTerroir === loc.id;
                      return (
                        <button
                          key={loc.id}
                          onClick={() => setSelectedTerroir(loc.id)}
                          className={`font-sans text-[9px] sm:text-[10px] tracking-wider uppercase py-2 px-4 rounded-xl border transition-all duration-300 font-medium cursor-pointer ${
                            isSelected
                              ? 'bg-gold-500 text-white border-gold-500 shadow-md'
                              : 'bg-white text-luxury-charcoal/80 border-cream-200 hover:border-gold-300'
                          }`}
                        >
                          {loc.name}
                        </button>
                      );
                    })}
                  </div>

                  {/* Main interactive map and details panel details */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="terroir-map-grid">
                    
                    {/* Left Canvas - Stylized Vector Map */}
                    <div className="lg:col-span-7 bg-[#161412] text-[#F7F3EB] rounded-3xl p-6 flex flex-col justify-between border border-cream-300/10 shadow-xl min-h-[380px] relative overflow-hidden" id="terroir-vector-map-frame">
                      
                      {/* Grid overlay background */}
                      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                        backgroundImage: 'radial-gradient(#F7F3EB 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                      }} />

                      {/* Map coordinates telemetry line art */}
                      <div className="absolute top-4 left-4 font-mono text-[8px] text-cream-100/30 tracking-widest uppercase flex flex-col space-y-1">
                        <span>L'Or Blanc Cartography Unit</span>
                        <span>Scale: 1:12.500.000 (Mediterranean Range)</span>
                      </div>

                      <div className="absolute bottom-4 left-4 font-mono text-[8px] text-cream-100/30 tracking-widest uppercase flex flex-col space-y-0.5">
                        <span>GRID: 38.7223° N, 9.1393° W (Lisbon Hub)</span>
                        <span>STATUS: ACTIVE SOURCING NETWORK</span>
                      </div>

                      {/* Compass rose graphic */}
                      <div className="absolute top-4 right-4 text-gold-500/25 pointer-events-none flex flex-col items-center">
                        <Compass className="w-10 h-10 stroke-[0.75] animate-[spin_40s_linear_infinite]" />
                        <span className="font-mono text-[7px] mt-1 tracking-widest">N 360°</span>
                      </div>

                      <div className="relative w-full h-[320px] select-none" id="terroir-svg-container">
                        <svg viewBox="0 0 500 320" className="w-full h-full" id="terroir-svg-view">
                          {/* Latitude and Longitude Lines grids */}
                          <line x1="50" y1="80" x2="450" y2="80" stroke="#F1EFEA" strokeOpacity="0.04" strokeWidth="1" />
                          <line x1="50" y1="160" x2="450" y2="160" stroke="#F1EFEA" strokeOpacity="0.04" strokeWidth="1" />
                          <line x1="50" y1="240" x2="450" y2="240" stroke="#F1EFEA" strokeOpacity="0.04" strokeWidth="1" />
                          <line x1="100" y1="40" x2="100" y2="280" stroke="#F1EFEA" strokeOpacity="0.04" strokeWidth="1" />
                          <line x1="200" y1="40" x2="200" y2="280" stroke="#F1EFEA" strokeOpacity="0.04" strokeWidth="1" />
                          <line x1="300" y1="40" x2="300" y2="280" stroke="#F1EFEA" strokeOpacity="0.04" strokeWidth="1" />
                          <line x1="400" y1="40" x2="400" y2="280" stroke="#F1EFEA" strokeOpacity="0.04" strokeWidth="1" />

                          {/* Dotted border of mapping range */}
                          <rect x="15" y="15" width="470" height="290" rx="16" fill="none" stroke="#C5A880" strokeWidth="1" strokeDasharray="4,6" strokeOpacity="0.1" />

                          {/* Highly Abstract stylized coastline paths representing Mediterranean */}
                          {/* Portugal/Spain Atlantic Coastline */}
                          <path 
                            d="M 60,30 Q 75,70 65,110 T 60,180 Q 70,220 80,250 T 110,290 T 180,295" 
                            fill="none" 
                            stroke="#C5A880" 
                            strokeWidth="1.5" 
                            strokeOpacity="0.12" 
                          />
                          {/* Spain Mediterranean Coastline to France & Italy */}
                          <path 
                            d="M 180,295 Q 210,270 230,240 T 260,200 Q 285,190 300,160 T 340,140 Q 370,150 380,180 T 400,210 T 430,240 T 480,280" 
                            fill="none" 
                            stroke="#C5A880" 
                            strokeWidth="1.5" 
                            strokeOpacity="0.12" 
                          />

                          {/* Draw connection lines from active point to Lisboa Atelier */}
                          {TERROIR_LOCATIONS.map((loc) => {
                            const isSelected = selectedTerroir === loc.id;
                            // Lisboa core coordinate: x: 80, y: 190
                            return (
                              <g key={`link-${loc.id}`}>
                                <path
                                  d={`M ${loc.coords.x} ${loc.coords.y} Q ${(loc.coords.x + 80) / 2 + 15} ${(loc.coords.y + 190) / 2 - 25} 80 190`}
                                  fill="none"
                                  stroke={isSelected ? '#F59E0B' : '#C5A880'}
                                  strokeWidth={isSelected ? '1.5' : '0.5'}
                                  strokeOpacity={isSelected ? '0.75' : '0.15'}
                                  strokeDasharray="4,4"
                                />
                                {isSelected && (
                                  <path
                                    d={`M ${loc.coords.x} ${loc.coords.y} Q ${(loc.coords.x + 80) / 2 + 15} ${(loc.coords.y + 190) / 2 - 25} 80 190`}
                                    fill="none"
                                    stroke="#F59E0B"
                                    strokeWidth="2"
                                    strokeOpacity="0.4"
                                    className="animate-[dash_2s_linear_infinite]"
                                    strokeDasharray="10,15"
                                  />
                                )}
                              </g>
                            );
                          })}

                          {/* Central Hub brand star - LISBOA ATELIER */}
                          <g transform="translate(80, 190)" className="cursor-help">
                            <circle r="12" fill="#D4AF37" fillOpacity="0.15" className="animate-pulse" />
                            <circle r="4" fill="#D4AF37" />
                            <path d="M 0,-7 L 2,-2 L 7,0 L 2,2 L 0,7 L -2,2 L -7,0 L -2,-2 Z" fill="#FFF" transform="scale(0.65)" />
                            <text x="12" y="3" className="font-sans text-[7px] fill-cream-50 font-bold tracking-widest uppercase">Lisboa Atelier hub</text>
                          </g>

                          {/* Map Markers for Terroirs */}
                          {TERROIR_LOCATIONS.map((loc) => {
                            const isSelected = selectedTerroir === loc.id;
                            return (
                              <g 
                                key={`marker-${loc.id}`}
                                transform={`translate(${loc.coords.x}, ${loc.coords.y})`}
                                className="cursor-pointer group pointer-events-auto"
                                onClick={() => setSelectedTerroir(loc.id)}
                              >
                                {/* Glowing halo backdrop */}
                                <circle 
                                  r={isSelected ? '18' : '10'} 
                                  fill={isSelected ? '#F59E0B' : '#C5A880'} 
                                  fillOpacity={isSelected ? '0.2' : '0.05'}
                                  className="transition-all duration-300"
                                />
                                {isSelected && (
                                  <circle 
                                    r="12" 
                                    fill="none" 
                                    stroke="#F59E0B" 
                                    strokeWidth="1" 
                                    className="animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" 
                                    style={{ transformOrigin: 'center' }}
                                  />
                                )}
                                {/* Core marker dot */}
                                <circle 
                                  r={isSelected ? '6' : '4.5'} 
                                  fill={isSelected ? '#FFFFFF' : '#D4AF37'} 
                                  stroke={isSelected ? '#F59E0B' : '#161412'} 
                                  strokeWidth="1.5"
                                  className="transition-all duration-300 shadow-md group-hover:scale-125"
                                />
                                {/* Label helper tooltip text */}
                                <text 
                                  y="-12" 
                                  className={`font-sans text-[8px] text-center tracking-wider uppercase font-medium ${isSelected ? 'fill-gold-300 font-bold' : 'fill-cream-100/60 font-light group-hover:fill-cream-100'} transition-colors duration-300`}
                                  textAnchor="middle"
                                >
                                  {loc.name.split(' ')[0]}
                                </text>
                              </g>
                            );
                          })}
                        </svg>
                      </div>

                      {/* Map legend info */}
                      <div className="flex items-center justify-between border-t border-cream-300/10 pt-4" id="terroir-legend-row">
                        <div className="flex items-center space-x-2">
                          <Globe className="w-3.5 h-3.5 text-gold-450" />
                          <span className="font-mono text-[8px] text-cream-100/50 tracking-wider">REDE DE SOURCING TRANSPARENTE E ÉTICA</span>
                        </div>
                        <div className="flex items-center space-x-3 text-[8px] font-mono tracking-widest text-[#FFF]/50">
                          <span className="flex items-center space-x-1"><span className="w-1.5 h-1.5 rounded-full bg-white block" /> <span>Lisboa Hub</span></span>
                          <span className="flex items-center space-x-1"><span className="w-1.5 h-1.5 rounded-full bg-gold-450 block" /> <span>Origem</span></span>
                        </div>
                      </div>

                    </div>

                    {/* Right Canvas - Immersive Sourcing Story details */}
                    <div className="lg:col-span-5 bg-white border border-cream-200 p-6 sm:p-8 rounded-3xl flex flex-col justify-between hover:shadow-lg transition-all duration-300" id="terroir-storytelling-card">
                      
                      <div className="space-y-6">
                        
                        {/* Header metadata tag */}
                        <div className="flex items-center justify-between border-b border-cream-100 pb-4">
                          <div>
                            <span className="font-mono text-[9px] tracking-widest text-gold-500 uppercase font-semibold block">{TERROIR_LOCATIONS.find(l => l.id === selectedTerroir)?.country}</span>
                            <h4 className="font-serif text-xl font-normal text-luxury-charcoal mt-1">
                              {TERROIR_LOCATIONS.find(l => l.id === selectedTerroir)?.region}
                            </h4>
                          </div>
                          
                          <div className="bg-gold-100 border border-gold-200/50 rounded-full px-3 py-1 flex items-center space-x-1 shadow-sm shrink-0">
                            <MapPin className="w-3 h-3 text-gold-500" />
                            <span className="font-mono text-[8px] tracking-wider text-gold-600 font-bold uppercase">{selectedTerroir}</span>
                          </div>
                        </div>

                        {/* Story title */}
                        <div className="space-y-2">
                          <span className="font-mono text-[8px] tracking-[0.25em] text-[#2E2A25]/40 uppercase block">Ingrediente Protegido</span>
                          <h5 className="font-serif text-2xl font-light italic text-[#2E2A25]">
                            {TERROIR_LOCATIONS.find(l => l.id === selectedTerroir)?.title}
                          </h5>
                          <p className="font-mono text-[10px] text-gold-600 font-medium tracking-wide">
                            Variedade: {TERROIR_LOCATIONS.find(l => l.id === selectedTerroir)?.ingredient}
                          </p>
                        </div>

                        {/* Sourcing narrative */}
                        <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/80 leading-relaxed font-light">
                          {TERROIR_LOCATIONS.find(l => l.id === selectedTerroir)?.story}
                        </p>

                        {/* Sourcing technical specifications sheet */}
                        <div className="bg-cream-50/50 border border-cream-200/50 rounded-2xl p-4 space-y-2.5">
                          <span className="font-mono text-[8px] tracking-widest text-luxury-charcoal/50 uppercase block font-semibold">Tabela de Terroir (Especificações)</span>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-0.5">
                              <span className="font-mono text-[8px] text-luxury-charcoal/40 uppercase block">Altitude Média</span>
                              <span className="font-sans text-xs font-medium text-luxury-charcoal">{TERROIR_LOCATIONS.find(l => l.id === selectedTerroir)?.altitude}</span>
                            </div>
                            <div className="space-y-0.5">
                              <span className="font-mono text-[8px] text-luxury-charcoal/40 uppercase block">Climatologia</span>
                              <span className="font-sans text-xs font-medium text-luxury-charcoal">{TERROIR_LOCATIONS.find(l => l.id === selectedTerroir)?.climate}</span>
                            </div>
                            <div className="space-y-0.5">
                              <span className="font-mono text-[8px] text-luxury-charcoal/40 uppercase block">Composição do Solo</span>
                              <span className="font-sans text-xs font-medium text-luxury-charcoal">{TERROIR_LOCATIONS.find(l => l.id === selectedTerroir)?.soil}</span>
                            </div>
                            <div className="space-y-0.5">
                              <span className="font-mono text-[8px] text-luxury-charcoal/40 uppercase block">Método de Rendimento</span>
                              <span className="font-sans text-xs font-medium text-luxury-charcoal">{TERROIR_LOCATIONS.find(l => l.id === selectedTerroir)?.harvest}</span>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* E-Commerce Interactive CTA to shop page */}
                      <div className="pt-6 mt-6 border-t border-cream-100 flex flex-col space-y-3">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-sans text-luxury-charcoal/40 font-light">Criação d'Or Coordenada</span>
                          <span className="font-serif italic font-medium text-gold-500">
                            {TERROIR_LOCATIONS.find(l => l.id === selectedTerroir)?.productName}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            const currentLoc = TERROIR_LOCATIONS.find(l => l.id === selectedTerroir);
                            if (currentLoc) {
                              const foundProd = PRODUCT_DATA.find(p => p.id === currentLoc.productId);
                              if (foundProd) {
                                setSelectedProduct(foundProd);
                                setActiveTab('produtos');
                                // Scroll gracefully to the products page anchor
                                setTimeout(() => {
                                  const catalogSection = document.getElementById('shop-page-container');
                                  if (catalogSection) {
                                    catalogSection.scrollIntoView({ behavior: 'smooth' });
                                  }
                                }, 100);
                              }
                            }
                          }}
                          className="w-full bg-[#2E2A25] hover:bg-gold-500 hover:text-[#161412] text-cream-50 font-sans text-[10px] tracking-widest uppercase font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
                        >
                          <span>Explorar Esta Joia Látea</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>

                  </div>
                </div>

                {/* VISUAL IDENTIDADE D'ATELIER & PACKAGING SCHEME */}
                <div className="pt-20 border-t border-cream-200/60 space-y-16" id="brand-identity-aesthetic">
                  
                  <div className="text-center max-w-xl mx-auto space-y-3">
                    <span className="font-mono text-[9px] tracking-[0.35em] text-gold-500 uppercase font-semibold block">Design Editorial & Lifestyle</span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-luxury-charcoal font-normal">
                      Identidade d'Atelier & Embalagem
                    </h2>
                    <p className="font-sans text-xs text-luxury-charcoal/65 leading-relaxed font-light">
                      A nossa filosofia visual une o luxo minimalista europeu à herança de design editorial clássico, refletido em cada rótulo e ponto de contacto digital.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="identity-luxury-grid">
                    
                    {/* Block 1: Instagram Digital Bio Mockup */}
                    <div className="bg-white border border-cream-200/80 p-8 rounded-3xl flex flex-col justify-between text-left shadow-sm space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 pb-3 border-b border-cream-100">
                          <div className="w-10 h-10 rounded-full border border-gold-400 bg-cream-50 flex items-center justify-center font-serif text-sm font-light text-luxury-charcoal">
                            L'O
                          </div>
                          <div>
                            <span className="font-sans text-xs font-semibold block text-luxury-charcoal">@lorblanc_atelier</span>
                            <span className="font-mono text-[8px] tracking-wider text-luxury-charcoal/40 uppercase block">Lisboa Gastronomica</span>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs font-sans text-luxury-charcoal/80 font-light leading-relaxed">
                          <p className="font-medium text-luxury-charcoal">Curadoria Digital d'Or Blanc:</p>
                          <ul className="space-y-1 pl-1">
                            <li className="flex items-center space-x-1.5">
                              <span className="w-1 h-1 rounded-full bg-gold-400" />
                              <span>Iogurtes artesanais premium</span>
                            </li>
                            <li className="flex items-center space-x-1.5">
                              <span className="w-1 h-1 rounded-full bg-gold-400" />
                              <span>Ingredientes naturais</span>
                            </li>
                            <li className="flex items-center space-x-1.5">
                              <span className="w-1 h-1 rounded-full bg-gold-400" />
                              <span>Experiência gourmet sofisticada</span>
                            </li>
                            <li className="flex items-center space-x-1.5">
                              <span className="w-1 h-1 rounded-full bg-gold-400" />
                              <span>Encomendas via WhatsApp</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-cream-200/60 text-center">
                        <span className="font-mono text-[9px] text-gold-500 uppercase tracking-widest font-semibold">Lifestyle Digital Curator</span>
                      </div>
                    </div>

                    {/* Block 2: Luxury Slogans Carousel View */}
                    <div className="bg-white border border-cream-200/80 p-8 rounded-3xl flex flex-col justify-between text-left shadow-sm space-y-6">
                      <div className="space-y-4">
                        <span className="font-mono text-[8px] tracking-widest text-gold-500 uppercase block font-semibold border-b border-cream-100 pb-2">Slogans de Sedução</span>
                        
                        <div className="space-y-3 pt-1">
                          <p className="font-serif italic text-sm text-luxury-charcoal border-l border-gold-300 pl-3">"O sabor sofisticado do artesanal."</p>
                          <p className="font-serif italic text-sm text-luxury-charcoal border-l border-gold-300 pl-3">"Naturalmente luxuoso."</p>
                          <p className="font-serif italic text-sm text-luxury-charcoal border-l border-gold-300 pl-3">"Elegância em cada colherada."</p>
                          <p className="font-serif italic text-sm text-luxury-charcoal border-l border-gold-300 pl-3">"Artesanal elevado ao extraordinário."</p>
                          <p className="font-serif italic text-sm text-luxury-charcoal border-l border-gold-300 pl-3">"O premium do natural."</p>
                          <p className="font-serif italic text-sm text-luxury-charcoal border-l border-gold-300 pl-3 text-gold-500 font-medium">"Gourmet. Fresco. Incomparável."</p>
                        </div>
                      </div>

                      <div>
                        <span className="font-sans text-[9px] text-luxury-charcoal/40 block">Guia de Expressão Geral d'Or Blanc</span>
                      </div>
                    </div>

                    {/* Block 3: Packaging Label Copy (Frente e Verso) */}
                    <div className="bg-[#161412] text-cream-50 p-8 rounded-3xl flex flex-col justify-between text-left shadow-xl space-y-6 border border-white/5">
                      <div className="space-y-4">
                        <span className="font-mono text-[8px] tracking-widest text-gold-400 uppercase block font-semibold border-b border-white/5 pb-2">Copywriting da Embalagem</span>
                        
                        <div className="space-y-4 pt-1">
                          <div className="space-y-1">
                            <span className="font-mono text-[7px] text-cream-100/40 uppercase block tracking-wider">Frente do Frasco</span>
                            <div className="bg-white/5 p-3 rounded-xl border border-white/5 font-serif text-xs italic text-cream-100">
                              "Iogurte Artesanal Premium • Produzido cuidadosamente em pequenos lotes."
                            </div>
                          </div>

                          <div className="space-y-1">
                            <span className="font-mono text-[7px] text-cream-100/40 uppercase block tracking-wider">Verso do Rótulo</span>
                            <div className="bg-white/5 p-3 rounded-xl border border-white/5 font-sans text-xs font-light leading-relaxed text-cream-100/80">
                              "Criado com ingredientes selecionados para oferecer uma experiência cremosa, sofisticada e naturalmente deliciosa."
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[8px] font-mono text-cream-100/30">
                        <span>Reciclável</span>
                        <span>Vidro Soprado d'Ouro</span>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </motion.div>
          )}

          {/* ===================== PAGE 3: LOJA / BOUTIQUE (Cartões de Produto) ===================== */}
          {activeTab === 'produtos' && (
            <motion.div 
              key="page-produtos"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20 text-left space-y-12"
              id="shop-page-container"
            >
              
              {/* Boutique Title Hero Intro */}
              <div className="text-center max-w-xl mx-auto space-y-3 mb-8" id="shop-title-wrapper">
                <span className="font-mono text-[10px] tracking-[0.35em] text-gold-500 uppercase font-semibold">Boutique L'Or</span>
                <h1 className="font-serif text-4xl sm:text-5xl text-luxury-charcoal font-normal">
                  Criações Disponíveis para Reserva
                </h1>
                <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/65 leading-relaxed font-light">
                  Devido à maturação manual dezoito horas e micro-tiragem, cada sabor tem disponibilidade limitada semanalmente. Reserve as suas joias lácteas favoritas.
                </p>
              </div>

              {/* Sophisticated Golden Horizontal Filters */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pb-4 border-b border-cream-200" id="shop-filters">
                {['Todos', 'Assinatura Clássica', 'Infusões Gourmet', 'Botânicos Exclusivos', 'Edições de Ouro', 'Granola Gourmet', 'Caldas & Compotas', 'Kits Premium'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategoryFilter(cat)}
                    className={`font-sans text-[10px] tracking-widest uppercase py-2 px-5 sm:px-6 rounded-full transition-all duration-300 font-medium ${activeCategoryFilter === cat ? 'bg-luxury-charcoal text-cream-50 font-bold shadow-md shadow-luxury-charcoal/10' : 'bg-white text-luxury-charcoal/80 border border-cream-200 hover:border-gold-300'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Dynamic Grid list of boutique cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10" id="shop-products-grid">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id}
                    className="bg-white rounded-3xl overflow-hidden border border-cream-200/50 shadow-lg shadow-luxury-charcoal/5 flex flex-col h-full group pointer-events-auto"
                    id={`product-boutique-card-${product.id}`}
                  >
                    {/* Catalog Image frame */}
                    <div className="relative aspect-square w-full overflow-hidden bg-cream-50">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 rounded-full text-[9px] font-mono tracking-wider font-medium text-gold-500 uppercase">
                        {product.category}
                      </div>

                      {/* Overlays action - Show quickly details */}
                      <div className="absolute inset-0 bg-luxury-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="bg-white/95 hover:bg-gold-100 text-[#2E2A25] px-6 py-3 rounded-full font-sans text-[10px] tracking-widest uppercase font-semibold shadow-md transition-all duration-300 cursor-pointer"
                        >
                          Ver Segredo d'Or
                        </button>
                      </div>
                    </div>

                    {/* Content text */}
                    <div className="p-6 sm:p-8 flex flex-col flex-grow text-left">
                      <span className="font-mono text-[9px] tracking-[0.3em] text-gold-500 uppercase mb-1">{product.tagline}</span>
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-luxury-charcoal mb-2">{product.name}</h3>
                      <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/70 line-clamp-3 font-light mb-6">
                        {product.description}
                      </p>

                      <div className="mt-auto flex items-end justify-between pt-4 border-t border-cream-100">
                        <div>
                          <span className="text-[9px] text-luxury-charcoal/40 font-mono block uppercase">Frasco Artesanal</span>
                          <span className="font-serif text-lg font-medium text-luxury-charcoal">{product.price180g.toFixed(2)} € <span className="text-xs text-luxury-charcoal/60 font-light">/ 180g</span></span>
                        </div>

                        {/* Quick Add To Basket with Size Option */}
                        <div className="flex space-x-2">
                          <button
                            onClick={() => addToCart(product, '180g')}
                            className="bg-[#2E2A25] hover:bg-gold-500 text-white p-2.5 rounded-full shadow-sm transition-all duration-300 flex items-center justify-center cursor-pointer"
                            aria-label="Adicionar 180g ao carrinho"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </motion.div>
          )}

          {/* ===================== PAGE 4: CONTACTO (Form + Coords) ===================== */}
          {activeTab === 'contacto' && (
            <motion.div 
              key="page-contacto"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20 text-left"
              id="contact-page-container"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start" id="contact-grid">
                
                {/* Contact Coordinates left panel */}
                <div className="lg:col-span-5 space-y-8" id="contact-left">
                  
                  <div className="space-y-4">
                    <span className="font-mono text-[10px] tracking-[0.35em] text-gold-500 uppercase font-semibold">Os Nossos Canais</span>
                    <h1 className="font-serif text-4xl sm:text-5xl text-luxury-charcoal font-normal">
                      Estabelecer Contacto
                    </h1>
                    <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/70 leading-relaxed font-light">
                      A nossa cozinha histórica d'Or Blanc está sediada no coração da capital. Oferecemos pacotes gourmets personalizados de assinatura, catering de eventos de gala ou degustações exclusivas para comemorações privadas.
                    </p>
                  </div>

                  {/* Concrete channels icons details */}
                  <div className="space-y-6 pt-2" id="contact-channels">
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-11 h-11 bg-white border border-cream-200 rounded-full flex items-center justify-center text-gold-400 shrink-0">
                        <MapPin className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="font-mono text-[9px] tracking-widest text-[#2E2A25]/40 uppercase block">Cozinha d'Or Principal</span>
                        <p className="font-sans text-xs sm:text-sm font-semibold text-luxury-charcoal mt-0.5">Avenida da Liberdade Palaciana, 12B</p>
                        <p className="font-sans text-xs text-luxury-charcoal/70 font-light">1255-081 Lisboa, Portugal</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-11 h-11 bg-white border border-cream-200 rounded-full flex items-center justify-center text-gold-400 shrink-0">
                        <Phone className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="font-mono text-[9px] tracking-widest text-[#2E2A25]/40 uppercase block">Suporte Linha Nobre & WhatsApp</span>
                        <p className="font-sans text-xs sm:text-sm font-semibold text-luxury-charcoal mt-0.5">+351 912 345 678</p>
                        <p className="font-sans text-xs text-luxury-charcoal/70 font-light">Atendimento Segunda a Sábado, das 09:00 às 19:00</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-11 h-11 bg-white border border-cream-200 rounded-full flex items-center justify-center text-gold-400 shrink-0">
                        <Mail className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="font-mono text-[9px] tracking-widest text-[#2E2A25]/40 uppercase block">E-mail Corporativo</span>
                        <p className="font-sans text-xs sm:text-sm font-semibold text-luxury-charcoal mt-0.5">geral@lorblanc.com</p>
                        <p className="font-sans text-xs text-luxury-charcoal/70 font-light">Respondemos no próprio dia útil</p>
                      </div>
                    </div>

                  </div>

                  {/* Real Social Connections links */}
                  <div className="pt-4 flex items-center space-x-4" id="contact-social-flex">
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-white hover:bg-gold-100 border border-cream-200 py-2.5 px-5 rounded-full text-xs text-luxury-charcoal cursor-pointer font-sans transition-all duration-300 shadow-sm"
                    >
                      <span>Instagram do Atelier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>

                {/* Right elegant form panel card block */}
                <div className="lg:col-span-7 bg-white border border-cream-200 p-6 sm:p-10 rounded-3xl shadow-xl shadow-luxury-charcoal/5" id="contact-right">
                  <h3 className="font-serif text-2xl font-normal text-luxury-charcoal mb-6">Manifestar Interesse</h3>

                  <form onSubmit={(e) => { e.preventDefault(); alert("Mensagem enviada com distinção. O nosso Concierge Geral responderá de imediato."); }} className="space-y-6" id="contact-form">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col space-y-2">
                        <label className="font-mono text-[9px] tracking-widest text-luxury-charcoal/50 uppercase">O Seu Nome</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="ex. Conde de Bragança"
                          className="bg-cream-50/50 border border-cream-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 focus:border-gold-400 font-sans text-luxury-charcoal"
                        />
                      </div>

                      <div className="flex flex-col space-y-2">
                        <label className="font-mono text-[9px] tracking-widest text-luxury-charcoal/50 uppercase">Correio Eletrónico</label>
                        <input 
                          type="email" 
                          required
                          placeholder="seuemail@exclusivo.com"
                          className="bg-cream-50/50 border border-cream-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 focus:border-gold-400 font-sans text-luxury-charcoal"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label className="font-mono text-[9px] tracking-widest text-luxury-charcoal/50 uppercase">Número do WhatsApp / Telemóvel</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+351 912 345 678"
                        className="bg-cream-50/50 border border-cream-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 focus:border-gold-400 font-sans text-luxury-charcoal"
                      />
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label className="font-mono text-[9px] tracking-widest text-luxury-charcoal/50 uppercase">A Sua Mensagem Gourmet</label>
                      <textarea 
                        rows={4} 
                        required
                        placeholder="Descreva o seu evento ou a sua solicitação de reserva estrita de assinatura de iogurtes..."
                        className="bg-cream-50/50 border border-cream-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 focus:border-gold-400 font-sans text-luxury-charcoal"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-luxury-charcoal hover:bg-gold-500 text-cream-50 font-sans text-xs tracking-widest uppercase font-semibold py-4.5 rounded-xl transition-all duration-300 shadow-md cursor-pointer"
                    >
                      Enviar Mensagem d'Or
                    </button>

                  </form>
                </div>

              </div>

              {/* Minimalist styled elegant embedded tactile aesthetic maps */}
              <div className="mt-16 w-full relative" id="contact-map-card">
                <div className="bg-cream-100 hover:border-gold-300 border border-cream-200/50 aspect-3/1 rounded-3xl overflow-hidden p-8 flex flex-col justify-between text-left shadow-sm">
                  <div className="max-w-md space-y-3 relative z-10">
                    <span className="font-mono text-[8px] tracking-widest text-gold-500 uppercase bg-white py-1 px-3.5 border border-cream-200 rounded">Lisbon Kitchen Map</span>
                    <h4 className="font-serif text-2xl font-normal text-luxury-charcoal">Atelier d'Or Blanc Avenida</h4>
                    <p className="font-sans text-xs text-luxury-charcoal/70 font-light leading-relaxed">
                      Sinta-se à vontade para agendar uma visita guiada à nossa câmara fresca de maturação lenta com o mestre laticionário da marca.
                    </p>
                  </div>

                  <div className="flex justify-end relative z-10">
                    <button 
                      onClick={() => alert("Mostrando direções na Avenida da Liberdade no seu mapa nativo")}
                      className="bg-white hover:bg-[#2E2A25] hover:text-white border border-[#2E2A25]/25 text-[#2E2A25] px-6 py-2.5 rounded-xl font-sans text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 cursor-pointer"
                    >
                      Abrir no GPS Dinâmico
                    </button>
                  </div>

                  {/* Aesthetic minimalist geographic graphics absolute vectors background */}
                  <div className="absolute inset-y-0 right-0 w-1/2 opacity-15 pointer-events-none border-l border-gold-300/30">
                    <div className="absolute top-[20%] right-[30%] w-32 h-32 rounded-full border border-gold-400/50 flex items-center justify-center animate-pulse">
                      <div className="w-16 h-16 rounded-full border border-gold-400/30" />
                    </div>
                    <div className="absolute bottom-[20%] right-[10%] w-48 h-48 rounded-full border border-gold-500/20" />
                  </div>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* EXQUISITE LUXURY FOOTER */}
      <footer className="bg-luxury-charcoal text-[#F7F3EB] py-16 px-6 sm:px-8 border-t border-cream-300/15" id="gourmet-footer">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-12 text-left" id="footer-grid">
          
          <div className="space-y-4" id="footer-col-brand">
            <span className="font-serif text-3xl font-light tracking-widest text-white uppercase block">L'Or Blanc</span>
            <span className="font-sans text-[10px] tracking-widest text-gold-300 uppercase block">REDEFINIR O PALADAR DO QUOTIDIANO</span>
            <p className="font-sans text-xs text-cream-100/60 leading-relaxed font-light">
              Iogurtes artesanais ultra-premium refinados meticulosamente para proporcionar momentos requintados de puro prazer láctico saudável.
            </p>
          </div>

          <div className="space-y-4" id="footer-col-links-1">
            <h5 className="font-mono text-[9px] tracking-widest text-gold-450 uppercase font-semibold">A Coleção</h5>
            <ul className="space-y-2 text-xs font-sans text-cream-100/70 font-light">
              <li><button onClick={() => { setActiveTab('produtos'); setActiveCategoryFilter('Assinatura Clássica'); }} className="hover:text-gold-300 transition-colors cursor-pointer">Assinatura Clássica</button></li>
              <li><button onClick={() => { setActiveTab('produtos'); setActiveCategoryFilter('Infusões Gourmet'); }} className="hover:text-gold-300 transition-colors cursor-pointer">Infusões Gourmet</button></li>
              <li><button onClick={() => { setActiveTab('produtos'); setActiveCategoryFilter('Botânicos Exclusivos'); }} className="hover:text-gold-300 transition-colors cursor-pointer">Botânicos Exclusivos</button></li>
              <li><button onClick={() => { setActiveTab('produtos'); setActiveCategoryFilter('Edições de Ouro'); }} className="hover:text-gold-300 transition-colors cursor-pointer">Edições de Ouro</button></li>
            </ul>
          </div>

          <div className="space-y-4" id="footer-col-links-2">
            <h5 className="font-mono text-[9px] tracking-widest text-gold-450 uppercase font-semibold">A Marca</h5>
            <ul className="space-y-2 text-xs font-sans text-cream-100/70 font-light">
              <li><button onClick={() => setActiveTab('sobre')} className="hover:text-gold-300 transition-colors cursor-pointer">As Nossas Origens</button></li>
              <li><button onClick={() => setActiveTab('sobre')} className="hover:text-gold-300 transition-colors cursor-pointer">Mesa Redonda</button></li>
              <li><button onClick={() => setActiveTab('contacto')} className="hover:text-gold-300 transition-colors cursor-pointer">Trabalhe Connosco</button></li>
              <li><button onClick={() => setActiveTab('contacto')} className="hover:text-gold-300 transition-colors cursor-pointer">Atelier Gastronómico</button></li>
            </ul>
          </div>

          <div className="space-y-4" id="footer-col-legal">
            <h5 className="font-mono text-[9px] tracking-widest text-gold-450 uppercase font-semibold">Subscrever Alta-Gama</h5>
            <p className="font-sans text-xs text-cream-100/60 leading-relaxed font-light">
              Seja o primeiro a saber das novas colheitas mensais limitadas e lançamentos de sabores raros de época.
            </p>
            <div className="flex border border-cream-200/20 rounded-lg overflow-hidden shrink-0">
              <input 
                type="email" 
                placeholder="Insira o seu email de cavalheiro" 
                className="bg-transparent text-white placeholder-cream-100/30 text-xs px-3.5 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gold-300 font-sans"
              />
              <button onClick={() => alert("Registado com prestígio na nossa Gazette de L'Or Blanc.")} className="bg-gold-400 hover:bg-gold-500 text-luxury-charcoal text-[10px] tracking-widest uppercase font-bold px-4 transition-colors font-sans py-2">
                Submeter
              </button>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto w-full pt-12 mt-12 border-t border-cream-200/10 flex flex-col sm:flex-row items-center justify-between gap-6" id="footer-bottom-flex">
          <p className="font-mono text-[9px] tracking-widest text-cream-100/40 uppercase">
            © 2026 L'Or Blanc SAS. Produzido em Portugal sob as mais estritas diretivas de alta-gama gastronómica.
          </p>
          <div className="flex space-x-6 text-[9px] font-mono tracking-widest text-cream-100/40 uppercase">
            <button onClick={() => alert("Termos de Reserva L'Or Blanc")} className="hover:text-gold-300">Termos d'Uso</button>
            <button onClick={() => alert("Privacidade da Gazette Geral d'Or Blanc")} className="hover:text-gold-300">Privacidade</button>
          </div>
        </div>
      </footer>

      {/* ===================== OVERLAY MODAL: PRODUCT INDIVIDUAL DETAIL ===================== */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="product-detail-modal-root">
            
            {/* Dark glass backdrop with high blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-[#2E2A25]/60 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-4xl bg-[#FAF8F5] border border-cream-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] z-10 text-left pointer-events-auto"
              id="product-detail-modal-box"
            >
              
              {/* Close Button absolute */}
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-25 p-2.5 rounded-full bg-white/80 border border-cream-200 text-luxury-charcoal hover:bg-gold-100 transition-colors focus:outline-none cursor-pointer"
                aria-label="Fecar Modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Photo column */}
              <div className="w-full md:w-1/2 relative bg-cream-50 aspect-square md:aspect-auto">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute bottom-6 left-6 bg-[#2E2A25]/85 backdrop-blur-sm px-4.5 py-1.5 rounded-full text-[10px] font-mono tracking-widest text-[#F7F3EB] uppercase border border-cream-200/10">
                  {selectedProduct.category}
                </div>
              </div>

              {/* Right content detail scrollable columns */}
              <div className="w-full md:w-1/2 p-6 sm:p-10 overflow-y-auto flex flex-col space-y-6 sm:space-y-8" id="modal-right-scroll">
                
                {/* Header title */}
                <div className="space-y-2">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-gold-500 uppercase block">{selectedProduct.tagline}</span>
                  <h2 className="font-serif text-3xl font-medium text-luxury-charcoal tracking-tight">{selectedProduct.name}</h2>
                  
                  {/* Real Gourmet Review Stars */}
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3.5 h-3.5 fill-gold-450 text-gold-450" />
                    ))}
                    <span className="font-mono text-[10px] text-luxury-charcoal/50 uppercase tracking-widest pl-1.5">Aclamação Unânime</span>
                  </div>
                </div>

                {/* Literary Description */}
                <div className="space-y-1.5 text-left border-l-2 border-gold-300 pl-4 py-1">
                  <span className="font-mono text-[9px] tracking-wider text-[#2E2A25]/45 uppercase block">Descrição de Chef</span>
                  <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/80 leading-relaxed font-light">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Ingredients & Noble attributes */}
                <div className="space-y-2">
                  <span className="font-mono text-[9px] tracking-wider text-[#2E2A25]/45 uppercase block">Matérias-Primas Orgânicas</span>
                  <p className="font-sans text-xs text-luxury-charcoal/75 leading-relaxed font-light bg-white border border-cream-200/80 p-3 rounded-xl italic">
                    "{selectedProduct.ingredients}"
                  </p>
                </div>

                {/* Nutritional Profile table */}
                <div className="space-y-3">
                  <span className="font-mono text-[9px] tracking-wider text-[#2E2A25]/45 uppercase block">Informação Nutricional Relevante</span>
                  <div className="grid grid-cols-4 gap-2 bg-cream-100 p-3.5 rounded-2xl text-center border border-cream-200">
                    <div>
                      <span className="font-mono text-[8px] text-luxury-charcoal/40 uppercase block">Calorias</span>
                      <span className="font-sans text-xs font-semibold text-luxury-charcoal block mt-0.5">{selectedProduct.nutrition.calories}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[8px] text-luxury-charcoal/40 uppercase block">Proteínas</span>
                      <span className="font-sans text-xs font-semibold text-luxury-charcoal block mt-0.5">{selectedProduct.nutrition.protein}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[8px] text-luxury-charcoal/40 uppercase block">Lípidos</span>
                      <span className="font-sans text-xs font-semibold text-luxury-charcoal block mt-0.5">{selectedProduct.nutrition.fat}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[8px] text-luxury-charcoal/40 uppercase block">Hidratos</span>
                      <span className="font-sans text-xs font-semibold text-luxury-charcoal block mt-0.5">{selectedProduct.nutrition.carbs}</span>
                    </div>
                  </div>
                </div>

                {/* Sizes selection & Checkout Add actions */}
                <div className="pt-4 border-t border-cream-300/60 text-left space-y-4">
                  
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] tracking-wider text-luxury-charcoal/50 uppercase block">Formato Reservado</span>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedModalSize('180g')}
                        className={`font-sans text-[10px] tracking-widest uppercase px-4 py-1.5 rounded-full border transition-all duration-300 font-medium ${selectedModalSize === '180g' ? 'bg-[#2E2A25] text-white border-luxury-charcoal shadow-sm' : 'bg-white text-luxury-charcoal border-cream-300'}`}
                      >
                        {selectedProduct.category === 'Granola Gourmet' ? 'Padrão (250g)' : selectedProduct.category === 'Kits Premium' ? 'Kit Padrão' : 'Individual (180g)'}
                      </button>
                      <button 
                        onClick={() => setSelectedModalSize('450g')}
                        className={`font-sans text-[10px] tracking-widest uppercase px-4 py-1.5 rounded-full border transition-all duration-300 font-medium ${selectedModalSize === '450g' ? 'bg-[#2E2A25] text-white border-luxury-charcoal shadow-sm' : 'bg-white text-luxury-charcoal border-cream-300'}`}
                      >
                        {selectedProduct.category === 'Granola Gourmet' ? 'Grande (500g)' : selectedProduct.category === 'Kits Premium' ? 'Grande Luxe' : 'Partilha (450g)'}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="font-mono text-[9px] text-luxury-charcoal/40 uppercase block">Preço de Assinatura</span>
                      <span className="font-serif text-2xl font-normal text-luxury-charcoal">
                        {(selectedModalSize === '180g' ? selectedProduct.price180g : selectedProduct.price450g).toFixed(2)} €
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(selectedProduct, selectedModalSize);
                        setSelectedProduct(null);
                      }}
                      className="bg-[#2E2A25] hover:bg-gold-500 text-white font-sans text-xs tracking-[0.2em] uppercase font-semibold py-4.5 px-8 rounded-xl shadow-lg transition-all duration-300 block text-center cursor-pointer"
                    >
                      Reservar Frasco
                    </button>
                  </div>

                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===================== OVERLAY SLIDEOUT PANEL: SHOPPING CART & CHECKOUT ===================== */}
      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden" id="cart-overlay-container">
            
            {/* Dark glass blur backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="absolute inset-0 bg-luxury-charcoal/50 backdrop-blur-sm pointer-events-auto"
            />

            {/* Slide block drawer panel */}
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10" id="cart-drawer-box">
              <motion.div 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 220 }}
                className="w-screen max-w-md bg-[#FAF8F5] border-l border-cream-200 shadow-2xl flex flex-col pointer-events-auto h-full text-left"
              >
                
                {/* Header of dynamic slide cart */}
                <div className="px-6 py-6 border-b border-cream-200 flex items-center justify-between" id="cart-drawer-header">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="w-5 h-5 text-gold-500" />
                    <h2 className="font-serif text-xl font-normal text-luxury-charcoal">Reserva d'Or Blanc</h2>
                    <span className="font-sans text-[10px] bg-cream-100 text-[#2E2A25] px-2 py-0.5 rounded border border-cream-200">
                      {getCartCount()} Jars
                    </span>
                  </div>

                  <button 
                    onClick={() => { setCartOpen(false); setCheckoutStep('cart'); }}
                    className="p-1.5 text-luxury-charcoal/60 hover:text-luxury-charcoal"
                    aria-label="Fecar Carrinho"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body steps of Order Checkouts */}
                <div className="flex-grow overflow-y-auto px-6 py-6" id="cart-drawer-body">
                  
                  {/* Step 1: Default Cart Listing */}
                  {checkoutStep === 'cart' && (
                    <div className="space-y-6 h-full flex flex-col">
                      {cart.length === 0 ? (
                        <div className="my-auto text-center space-y-4 py-12" id="empty-cart-view">
                          <div className="w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center border border-cream-200 mx-auto">
                            <ShoppingBag className="w-6 h-6 text-luxury-charcoal/40" />
                          </div>
                          <p className="font-serif italic text-base text-luxury-charcoal/60">"O seu frasco está limpo e vazio."</p>
                          <p className="font-sans text-xs text-luxury-charcoal/60 font-light max-w-xs mx-auto">
                            Explore a Coleção d'Or Blanc e adicione os sabores artesanais mais aclamados à sua mesa.
                          </p>
                          <button 
                            onClick={() => { setCartOpen(false); setActiveTab('produtos'); setActiveCategoryFilter('Todos'); }}
                            className="bg-[#2E2A25] text-white font-sans text-xs tracking-widest uppercase font-semibold px-6 py-3 rounded-full mt-4 hover:bg-gold-500 cursor-pointer"
                          >
                            Percorrer Boutique
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-6 flex-grow" id="cart-scroll-items">
                          {cart.map((item) => {
                            const unitPrice = item.size === '180g' ? item.product.price180g : item.product.price450g;
                            return (
                              <div 
                                key={`${item.product.id}-${item.size}`}
                                className="flex items-center space-x-4 pb-4 border-b border-cream-200"
                                id={`cart-row-${item.product.id}-${item.size}`}
                              >
                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-cream-50 shrink-0 border border-cream-200">
                                  <img 
                                    src={item.product.image} 
                                    alt={item.product.name} 
                                    className="w-full h-full object-cover" 
                                    referrerPolicy="no-referrer"
                                  />
                                </div>

                                <div className="flex-grow text-left">
                                  <span className="font-mono text-[8px] tracking-wider text-gold-500 uppercase">
                                    {item.product.category} • {
                                      item.product.category === 'Granola Gourmet' 
                                        ? (item.size === '180g' ? '250g' : '500g') 
                                        : item.product.category === 'Kits Premium' 
                                        ? (item.size === '180g' ? 'Kit Padrão' : 'Grande Luxe') 
                                        : item.size
                                    }
                                  </span>
                                  <h4 className="font-serif text-sm font-semibold text-luxury-charcoal">{item.product.name}</h4>
                                  <span className="font-sans text-xs text-luxury-charcoal/70 block mt-0.5">{(unitPrice * item.quantity).toFixed(2)} €</span>
                                </div>

                                {/* Controls actions of quantity */}
                                <div className="flex items-center space-x-2 border border-cream-200 rounded-lg p-1 bg-white">
                                  <button 
                                    onClick={() => updateCartQuantity(item.product.id, item.size, -1)}
                                    className="text-[#2E2A25] hover:text-gold-500 p-1 cursor-pointer"
                                  >
                                    <Minus className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="font-mono text-xs w-6 text-center text-luxury-charcoal font-semibold">
                                    {item.quantity}
                                  </span>
                                  <button 
                                    onClick={() => updateCartQuantity(item.product.id, item.size, 1)}
                                    className="text-[#2E2A25] hover:text-gold-500 p-1 cursor-pointer"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 2: Form Delivery checkout flow */}
                  {checkoutStep === 'details' && (
                    <form onSubmit={handleFinalOrder} className="space-y-6 text-left" id="checkout-form-box">
                      
                      <div className="space-y-2 border-b border-cream-200 pb-3 mb-4">
                        <span className="font-mono text-[8px] tracking-widest text-gold-500 uppercase font-semibold">Passo Final de Reserva</span>
                        <h3 className="font-serif text-lg font-normal text-luxury-charcoal">Detalhes d'Entrega</h3>
                        <p className="font-sans text-[11px] text-[#2E2A25]/60 font-light">
                          Os iogurtes artesanais L'Or Blanc são transportados em caixas isotérmicas frias especiais diretamente da nossa cozinha para garantir textura impecável.
                        </p>
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label className="font-mono text-[83a] text-luxury-charcoal/50 uppercase text-[9px] tracking-widest font-medium">Nome Completo do Destinatário</label>
                        <input 
                          type="text" 
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="ex. Senhora Dona Leonor Silveira"
                          className="w-full bg-white border border-cream-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 font-sans text-luxury-charcoal"
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label className="font-mono text-[9px] tracking-widest text-[#2E2A25]/50 uppercase font-medium">Número de Telemóvel / WhatsApp</label>
                        <input 
                          type="tel" 
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="ex. +351 912 345 678"
                          className="w-full bg-white border border-cream-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 font-sans text-luxury-charcoal"
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label className="font-mono text-[9px] tracking-widest text-[#2E2A25]/50 uppercase font-medium">Morada Limpa de Entrega (Grande Lisboa)</label>
                        <textarea 
                          rows={3} 
                          required
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          placeholder="ex. Rua Áurea, Palácio dos Arcos, Apartado 4B, Baixa-Chiado"
                          className="w-full bg-white border border-cream-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 font-sans text-luxury-charcoal"
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label className="font-mono text-[9px] tracking-widest text-[#2E2A25]/50 uppercase font-medium">Indicações e Notas Adicionais (Opcional)</label>
                        <textarea 
                          rows={2} 
                          value={customerNotes}
                          onChange={(e) => setCustomerNotes(e.target.value)}
                          placeholder="ex. Entregar por favor antes das 11h, necessito de um envelope de oferta."
                          className="w-full bg-white border border-cream-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 font-sans text-luxury-charcoal"
                        />
                      </div>

                      <div className="pt-4 flex space-x-3">
                        <button 
                          type="button"
                          onClick={() => setCheckoutStep('cart')}
                          className="w-1/3 border border-cream-300 hover:border-luxury-charcoal font-sans text-[10px] tracking-widest uppercase font-semibold py-3.5 rounded-xl transition-all duration-300 text-center text-luxury-charcoal bg-white cursor-pointer"
                        >
                          Voltar
                        </button>
                        <button 
                          type="submit"
                          className="w-2/3 bg-gold-400 hover:bg-gold-500 text-luxury-charcoal font-sans text-[10px] tracking-widest uppercase font-bold py-3.5 rounded-xl transition-all duration-300 text-center shadow shadow-gold-500/10 flex items-center justify-center space-x-1.5 cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Finalizar no WhatsApp</span>
                        </button>
                      </div>

                    </form>
                  )}

                  {/* Step 3: Success Confirmation Screen */}
                  {checkoutStep === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center space-y-6 py-12"
                      id="checkout-success-view"
                    >
                      <div className="w-20 h-20 bg-gold-100 rounded-full flex items-center justify-center border border-gold-300 mx-auto text-gold-500 animate-pulse">
                        <Check className="w-10 h-10" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-serif text-2xl font-normal text-luxury-charcoal">Pedido Convocado!</h3>
                        <p className="font-sans text-xs text-luxury-charcoal/70 font-light max-w-xs mx-auto">
                          A sua solicitação de reserva artesanal secreta foi encaminhada de forma expedita para a nossa equipa d'Atelier via WhatsApp.
                        </p>
                      </div>

                      <p className="font-serif italic text-sm text-gold-500 max-w-xs mx-auto">
                        "Preparamos o seu frasco individual em regime confidencial."
                      </p>

                      <div className="bg-cream-100 p-4 border border-cream-200 rounded-xl text-left text-xs text-luxury-charcoal/80 space-y-1 font-sans">
                        <p className="font-semibold text-[10px] font-mono tracking-widest text-[#2E2A25]/40 uppercase mb-1">Próximos Passos Nobres:</p>
                        <p>1. Verifique a janela de chat do WhatsApp aberta no seu dispositivo.</p>
                        <p>2. A nossa equipa responderá com informações d'assinatura, data e horário estimado.</p>
                      </div>

                      <button 
                        onClick={() => {
                          setCart([]);
                          setCartOpen(false);
                          setCheckoutStep('cart');
                          setActiveTab('home');
                        }}
                        className="w-full bg-[#2E2A25] hover:bg-gold-500 text-white font-sans text-xs tracking-widest uppercase font-semibold py-4 rounded-xl transition-all duration-300 cursor-pointer"
                      >
                        Voltar ao Menu Principal
                      </button>

                    </motion.div>
                  )}

                </div>

                {/* Footer totals for dynamic slide cart drawer */}
                {cart.length > 0 && checkoutStep === 'cart' && (
                  <div className="px-6 py-6 border-t border-cream-200 bg-cream-50" id="cart-drawer-footer">
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center justify-between text-xs text-luxury-charcoal/60">
                        <span>Embalagens Isotérmicas d'Art</span>
                        <span className="font-mono">Oferta</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-base text-luxury-charcoal">Total Estimado</span>
                        <span className="font-serif text-2xl text-luxury-charcoal font-medium">
                          {getCartTotal().toFixed(2)} €
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setCart([])}
                        className="border border-[#2E2A25]/25 hover:border-luxury-charcoal text-luxury-charcoal px-4 py-3.5 rounded-xl font-sans text-[10px] tracking-widest uppercase font-semibold text-center transition-all duration-300 bg-white cursor-pointer"
                      >
                        Limpar Reserva
                      </button>
                      
                      <button
                        onClick={() => setCheckoutStep('details')}
                        className="bg-luxury-charcoal hover:bg-gold-500 text-white px-4 py-3.5 rounded-xl font-sans text-[10px] tracking-widest uppercase font-semibold text-center transition-all duration-300 shadow shadow-luxury-charcoal/10 cursor-pointer"
                      >
                        Prosseguir
                      </button>
                    </div>

                  </div>
                )}

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
