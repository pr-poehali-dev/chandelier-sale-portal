import { useState } from 'react';
import Header from '@/components/Header';
import HomePage from '@/components/HomePage';
import CatalogPage from '@/components/CatalogPage';
import InfoPages from '@/components/InfoPages';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  style: string;
  material: string;
  lightType: string;
  rating: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Люстра Кристалл Премиум',
    price: 45000,
    image: 'https://cdn.poehali.dev/projects/3cc2d11e-6f06-4c2f-922a-a8c184a655bb/files/9b40da93-c930-4aca-80f0-8f21ea1eb41e.jpg',
    style: 'Классический',
    material: 'Хрусталь',
    lightType: 'LED',
    rating: 5
  },
  {
    id: 2,
    name: 'Люстра Модерн Голд',
    price: 38000,
    image: 'https://cdn.poehali.dev/projects/3cc2d11e-6f06-4c2f-922a-a8c184a655bb/files/e25155f3-c682-4b02-9d58-8907b690d29d.jpg',
    style: 'Современный',
    material: 'Металл',
    lightType: 'LED',
    rating: 5
  },
  {
    id: 3,
    name: 'Люстра Геометрия',
    price: 32000,
    image: 'https://cdn.poehali.dev/projects/3cc2d11e-6f06-4c2f-922a-a8c184a655bb/files/8d22cc86-a5e5-4443-949e-ededf93114b7.jpg',
    style: 'Минимализм',
    material: 'Стекло',
    lightType: 'Галоген',
    rating: 4
  },
  {
    id: 4,
    name: 'Люстра Лофт Индастриал',
    price: 28000,
    image: 'https://cdn.poehali.dev/projects/3cc2d11e-6f06-4c2f-922a-a8c184a655bb/files/8d22cc86-a5e5-4443-949e-ededf93114b7.jpg',
    style: 'Лофт',
    material: 'Металл',
    lightType: 'Edison',
    rating: 4
  },
  {
    id: 5,
    name: 'Люстра Венеция',
    price: 52000,
    image: 'https://cdn.poehali.dev/projects/3cc2d11e-6f06-4c2f-922a-a8c184a655bb/files/9b40da93-c930-4aca-80f0-8f21ea1eb41e.jpg',
    style: 'Классический',
    material: 'Хрусталь',
    lightType: 'LED',
    rating: 5
  },
  {
    id: 6,
    name: 'Люстра Скандинавия',
    price: 35000,
    image: 'https://cdn.poehali.dev/projects/3cc2d11e-6f06-4c2f-922a-a8c184a655bb/files/e25155f3-c682-4b02-9d58-8907b690d29d.jpg',
    style: 'Скандинавский',
    material: 'Дерево',
    lightType: 'LED',
    rating: 5
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedStyle, setSelectedStyle] = useState<string[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<string[]>([]);
  const [selectedLightType, setSelectedLightType] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [cart, setCart] = useState<{product: Product, quantity: number}[]>([]);

  const styles = ['Классический', 'Современный', 'Минимализм', 'Лофт', 'Скандинавский'];
  const materials = ['Хрусталь', 'Металл', 'Стекло', 'Дерево'];
  const lightTypes = ['LED', 'Галоген', 'Edison'];

  const filteredProducts = products.filter(product => {
    const styleMatch = selectedStyle.length === 0 || selectedStyle.includes(product.style);
    const materialMatch = selectedMaterial.length === 0 || selectedMaterial.includes(product.material);
    const lightMatch = selectedLightType.length === 0 || selectedLightType.includes(product.lightType);
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return styleMatch && materialMatch && lightMatch && priceMatch;
  });

  const toggleFilter = (value: string, selected: string[], setSelected: (val: string[]) => void) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(item => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.product.id === product.id 
          ? {...item, quantity: item.quantity + 1}
          : item
      ));
    } else {
      setCart([...cart, {product, quantity: 1}]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.product.id === productId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? {...item, quantity: newQuantity} : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        cartTotal={cartTotal}
        cartCount={cartCount}
      />

      {activeSection === 'home' && (
        <HomePage
          products={products}
          addToCart={addToCart}
          setActiveSection={setActiveSection}
        />
      )}

      {activeSection === 'catalog' && (
        <CatalogPage
          filteredProducts={filteredProducts}
          selectedStyle={selectedStyle}
          selectedMaterial={selectedMaterial}
          selectedLightType={selectedLightType}
          priceRange={priceRange}
          styles={styles}
          materials={materials}
          lightTypes={lightTypes}
          toggleFilter={toggleFilter}
          setSelectedStyle={setSelectedStyle}
          setSelectedMaterial={setSelectedMaterial}
          setSelectedLightType={setSelectedLightType}
          setPriceRange={setPriceRange}
          addToCart={addToCart}
        />
      )}

      <InfoPages
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
    </div>
  );
};

export default Index;
