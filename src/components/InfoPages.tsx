import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface InfoPagesProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const InfoPages = ({ activeSection, setActiveSection }: InfoPagesProps) => {
  return (
    <>
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
    </>
  );
};

export default InfoPages;
