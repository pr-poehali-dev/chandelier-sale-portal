import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

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
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Lightbulb" className="text-accent" size={32} />
              <h1 className="text-2xl font-bold">LuxLight</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => setActiveSection('home')}
                className={`font-medium transition-colors hover:text-accent ${activeSection === 'home' ? 'text-accent' : 'text-foreground'}`}
              >
                Главная
              </button>
              <button 
                onClick={() => setActiveSection('catalog')}
                className={`font-medium transition-colors hover:text-accent ${activeSection === 'catalog' ? 'text-accent' : 'text-foreground'}`}
              >
                Каталог
              </button>
              <button 
                onClick={() => setActiveSection('about')}
                className={`font-medium transition-colors hover:text-accent ${activeSection === 'about' ? 'text-accent' : 'text-foreground'}`}
              >
                О нас
              </button>
              <button 
                onClick={() => setActiveSection('delivery')}
                className={`font-medium transition-colors hover:text-accent ${activeSection === 'delivery' ? 'text-accent' : 'text-foreground'}`}
              >
                Доставка
              </button>
              <button 
                onClick={() => setActiveSection('contacts')}
                className={`font-medium transition-colors hover:text-accent ${activeSection === 'contacts' ? 'text-accent' : 'text-foreground'}`}
              >
                Контакты
              </button>
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map(item => (
                        <div key={item.product.id} className="flex gap-4 pb-4 border-b">
                          <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.product.name}</h4>
                            <p className="text-accent font-semibold">{item.product.price.toLocaleString()} ₽</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => updateQuantity(item.product.id, -1)}>
                                <Icon name="Minus" size={12} />
                              </Button>
                              <span className="text-sm">{item.quantity}</span>
                              <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => updateQuantity(item.product.id, 1)}>
                                <Icon name="Plus" size={12} />
                              </Button>
                              <Button size="icon" variant="ghost" className="h-6 w-6 ml-auto" onClick={() => removeFromCart(item.product.id)}>
                                <Icon name="Trash2" size={12} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold">Итого:</span>
                          <span className="text-2xl font-bold text-accent">{cartTotal.toLocaleString()} ₽</span>
                        </div>
                        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {activeSection === 'home' && (
        <>
          <section className="relative py-24 md:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl animate-fade-in">
                <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  Освещение, которое <span className="text-accent">вдохновляет</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Эксклюзивная коллекция дизайнерских люстр для создания идеальной атмосферы в вашем доме
                </p>
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8"
                  onClick={() => setActiveSection('catalog')}
                >
                  Смотреть каталог
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </Button>
              </div>
            </div>
          </section>

          <section className="py-16 bg-secondary/30">
            <div className="container mx-auto px-4">
              <h3 className="text-3xl font-bold text-center mb-12">Популярные модели</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.slice(0, 3).map((product, index) => (
                  <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 animate-slide-up overflow-hidden" style={{animationDelay: `${index * 100}ms`}}>
                    <div className="relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                        <Icon name="Star" size={14} className="mr-1" />
                        {product.rating}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-lg mb-2">{product.name}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{product.style} • {product.material}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-accent">{product.price.toLocaleString()} ₽</span>
                        <Button onClick={() => addToCart(product)} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          В корзину
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 animate-scale-in">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Truck" size={32} className="text-accent" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Бесплатная доставка</h4>
                  <p className="text-muted-foreground">При заказе от 30 000 ₽</p>
                </div>
                <div className="text-center p-6 animate-scale-in" style={{animationDelay: '100ms'}}>
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Shield" size={32} className="text-accent" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Гарантия качества</h4>
                  <p className="text-muted-foreground">3 года на все изделия</p>
                </div>
                <div className="text-center p-6 animate-scale-in" style={{animationDelay: '200ms'}}>
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Sparkles" size={32} className="text-accent" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Эксклюзивный дизайн</h4>
                  <p className="text-muted-foreground">Авторские коллекции</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {activeSection === 'catalog' && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8">Каталог люстр</h2>
            <div className="flex flex-col lg:flex-row gap-8">
              <aside className="lg:w-64 space-y-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Фильтры</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-3">Стиль</h4>
                      <div className="space-y-2">
                        {styles.map(style => (
                          <label key={style} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedStyle.includes(style)}
                              onChange={() => toggleFilter(style, selectedStyle, setSelectedStyle)}
                              className="rounded border-gray-300"
                            />
                            <span className="text-sm">{style}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium mb-3">Материал</h4>
                      <div className="space-y-2">
                        {materials.map(material => (
                          <label key={material} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedMaterial.includes(material)}
                              onChange={() => toggleFilter(material, selectedMaterial, setSelectedMaterial)}
                              className="rounded border-gray-300"
                            />
                            <span className="text-sm">{material}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium mb-3">Тип освещения</h4>
                      <div className="space-y-2">
                        {lightTypes.map(type => (
                          <label key={type} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedLightType.includes(type)}
                              onChange={() => toggleFilter(type, selectedLightType, setSelectedLightType)}
                              className="rounded border-gray-300"
                            />
                            <span className="text-sm">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium mb-3">Цена</h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <label className="text-xs text-muted-foreground mb-1 block">От</label>
                            <div className="relative">
                              <input
                                type="number"
                                value={priceRange[0]}
                                onChange={(e) => {
                                  const value = Math.max(0, Math.min(Number(e.target.value), priceRange[1]));
                                  setPriceRange([value, priceRange[1]]);
                                }}
                                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                                placeholder="0"
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">₽</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <label className="text-xs text-muted-foreground mb-1 block">До</label>
                            <div className="relative">
                              <input
                                type="number"
                                value={priceRange[1]}
                                onChange={(e) => {
                                  const value = Math.max(priceRange[0], Math.min(Number(e.target.value), 100000));
                                  setPriceRange([priceRange[0], value]);
                                }}
                                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                                placeholder="100000"
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">₽</span>
                            </div>
                          </div>
                        </div>
                        <Slider
                          min={0}
                          max={100000}
                          step={1000}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setSelectedStyle([]);
                        setSelectedMaterial([]);
                        setSelectedLightType([]);
                        setPriceRange([0, 100000]);
                      }}
                    >
                      Сбросить фильтры
                    </Button>
                  </div>
                </Card>
              </aside>

              <div className="flex-1">
                <div className="mb-4 text-muted-foreground">
                  Найдено товаров: {filteredProducts.length}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="relative overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                          <Icon name="Star" size={14} className="mr-1" />
                          {product.rating}
                        </Badge>
                      </div>
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-lg mb-2">{product.name}</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="outline">{product.style}</Badge>
                          <Badge variant="outline">{product.material}</Badge>
                          <Badge variant="outline">{product.lightType}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-accent">{product.price.toLocaleString()} ₽</span>
                          <Button onClick={() => addToCart(product)} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                            <Icon name="ShoppingCart" size={16} className="mr-2" />
                            В корзину
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'about' && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8">О компании LuxLight</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-6">
                LuxLight — ведущий поставщик дизайнерского освещения премиум-класса. Мы специализируемся на эксклюзивных коллекциях люстр, созданных лучшими мировыми дизайнерами.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                С 2010 года мы помогаем создавать неповторимую атмосферу в домах и офисах по всей России. Наша миссия — сделать качественное освещение доступным и вдохновляющим.
              </p>
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <Card className="p-6">
                  <Icon name="Award" size={32} className="text-accent mb-4" />
                  <h3 className="font-semibold text-xl mb-2">13+ лет опыта</h3>
                  <p className="text-muted-foreground">Надёжный партнёр в мире освещения</p>
                </Card>
                <Card className="p-6">
                  <Icon name="Users" size={32} className="text-accent mb-4" />
                  <h3 className="font-semibold text-xl mb-2">10 000+ клиентов</h3>
                  <p className="text-muted-foreground">Доверяют нашему качеству</p>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'delivery' && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8">Доставка и оплата</h2>
            <div className="space-y-8">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Icon name="Truck" size={32} className="text-accent flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Доставка по России</h3>
                    <p className="text-muted-foreground mb-4">
                      Бесплатная доставка при заказе от 30 000 ₽. Стандартная доставка — 1 500 ₽ по Москве, от 2 500 ₽ по России.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Москва и МО — 1-2 дня</li>
                      <li>Регионы России — 3-7 дней</li>
                      <li>Отслеживание посылки в личном кабинете</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Icon name="CreditCard" size={32} className="text-accent flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Способы оплаты</h3>
                    <p className="text-muted-foreground mb-4">
                      Мы принимаем все популярные способы оплаты для вашего удобства.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Банковские карты (Visa, Mastercard, МИР)</li>
                      <li>Оплата при получении</li>
                      <li>Банковский перевод для юридических лиц</li>
                      <li>Рассрочка на 3-12 месяцев</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Icon name="PackageCheck" size={32} className="text-accent flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Гарантии</h3>
                    <p className="text-muted-foreground">
                      Все товары проходят проверку перед отправкой. Гарантия 3 года на все изделия. Возврат и обмен в течение 14 дней.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'contacts' && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8">Контакты</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <Icon name="MapPin" size={32} className="text-accent mb-4" />
                <h3 className="font-semibold text-xl mb-2">Адрес</h3>
                <p className="text-muted-foreground">
                  г. Москва, ул. Дизайнерская, д. 15<br />
                  ТЦ "Свет и Уют", 3 этаж
                </p>
                <p className="text-sm text-muted-foreground mt-2">Пн-Вс: 10:00 - 21:00</p>
              </Card>

              <Card className="p-6">
                <Icon name="Phone" size={32} className="text-accent mb-4" />
                <h3 className="font-semibold text-xl mb-2">Телефон</h3>
                <p className="text-muted-foreground mb-2">
                  <a href="tel:+74951234567" className="hover:text-accent transition-colors">+7 (495) 123-45-67</a>
                </p>
                <p className="text-sm text-muted-foreground">Звонки принимаются ежедневно</p>
              </Card>

              <Card className="p-6">
                <Icon name="Mail" size={32} className="text-accent mb-4" />
                <h3 className="font-semibold text-xl mb-2">Email</h3>
                <p className="text-muted-foreground">
                  <a href="mailto:info@luxlight.ru" className="hover:text-accent transition-colors">info@luxlight.ru</a>
                </p>
                <p className="text-sm text-muted-foreground mt-2">Ответим в течение 24 часов</p>
              </Card>

              <Card className="p-6">
                <Icon name="MessageCircle" size={32} className="text-accent mb-4" />
                <h3 className="font-semibold text-xl mb-2">Мессенджеры</h3>
                <div className="space-y-2">
                  <p className="text-muted-foreground">WhatsApp: +7 (495) 123-45-67</p>
                  <p className="text-muted-foreground">Telegram: @luxlight_store</p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-primary text-primary-foreground py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Lightbulb" className="text-accent" size={28} />
                <h3 className="text-xl font-bold">LuxLight</h3>
              </div>
              <p className="text-primary-foreground/80">Освещение премиум-класса для вашего дома</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><button onClick={() => setActiveSection('about')} className="hover:text-accent transition-colors">О нас</button></li>
                <li><button onClick={() => setActiveSection('delivery')} className="hover:text-accent transition-colors">Доставка</button></li>
                <li><button onClick={() => setActiveSection('contacts')} className="hover:text-accent transition-colors">Контакты</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><button onClick={() => setActiveSection('catalog')} className="hover:text-accent transition-colors">Все товары</button></li>
                <li><button className="hover:text-accent transition-colors">Новинки</button></li>
                <li><button className="hover:text-accent transition-colors">Акции</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>+7 (495) 123-45-67</li>
                <li>info@luxlight.ru</li>
                <li>Москва, ул. Дизайнерская, 15</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-primary-foreground/20" />
          <div className="text-center text-primary-foreground/60">
            <p>© 2024 LuxLight. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;