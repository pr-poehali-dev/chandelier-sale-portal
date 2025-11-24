import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
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

interface CatalogPageProps {
  filteredProducts: Product[];
  selectedStyle: string[];
  selectedMaterial: string[];
  selectedLightType: string[];
  priceRange: number[];
  styles: string[];
  materials: string[];
  lightTypes: string[];
  toggleFilter: (value: string, selected: string[], setSelected: (val: string[]) => void) => void;
  setSelectedStyle: (val: string[]) => void;
  setSelectedMaterial: (val: string[]) => void;
  setSelectedLightType: (val: string[]) => void;
  setPriceRange: (val: number[]) => void;
  addToCart: (product: Product) => void;
}

const CatalogPage = ({
  filteredProducts,
  selectedStyle,
  selectedMaterial,
  selectedLightType,
  priceRange,
  styles,
  materials,
  lightTypes,
  toggleFilter,
  setSelectedStyle,
  setSelectedMaterial,
  setSelectedLightType,
  setPriceRange,
  addToCart
}: CatalogPageProps) => {
  return (
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
  );
};

export default CatalogPage;
