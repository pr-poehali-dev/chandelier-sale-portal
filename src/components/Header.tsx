import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  cart: {product: Product, quantity: number}[];
  updateQuantity: (productId: number, delta: number) => void;
  removeFromCart: (productId: number) => void;
  cartTotal: number;
  cartCount: number;
}

const Header = ({ 
  activeSection, 
  setActiveSection, 
  cart, 
  updateQuantity, 
  removeFromCart, 
  cartTotal, 
  cartCount 
}: HeaderProps) => {
  return (
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
  );
};

export default Header;
