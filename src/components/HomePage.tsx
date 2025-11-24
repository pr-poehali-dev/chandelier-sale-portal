import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

interface HomePageProps {
  products: Product[];
  addToCart: (product: Product) => void;
  setActiveSection: (section: string) => void;
}

const HomePage = ({ products, addToCart, setActiveSection }: HomePageProps) => {
  return (
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
  );
};

export default HomePage;
