
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const products = [
  {
    id: 1,
    name: 'Strawberry Bliss Cake',
    description: 'A delicate vanilla sponge cake with layers of fresh strawberries and whipped cream.',
    price: '$35.99',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Cakes',
    badge: 'Best Seller'
  },
  {
    id: 2,
    name: 'Chocolate Truffle Box',
    description: 'Handcrafted chocolate truffles in assorted flavors, perfect for gifting.',
    price: '$24.99',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Chocolates',
    badge: 'New'
  },
  {
    id: 3,
    name: 'Fruit Tart Collection',
    description: 'Buttery tart shells filled with vanilla custard and topped with seasonal fruits.',
    price: '$28.99',
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d5b1ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Pastries',
    badge: 'Popular'
  },
  {
    id: 4,
    name: 'Croissant Bundle',
    description: 'Flaky, buttery croissants in classic, chocolate, and almond varieties.',
    price: '$19.99',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Pastries'
  }
];

const FeaturedProducts = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.1);
  
  return (
    <section id="menu" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div 
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 transform ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-bakery-800 mb-4">Our Featured Treats</h2>
          <p className="text-muted-foreground">
            Explore our most loved treats, handcrafted with the finest ingredients and baked with passion.
            Pre-order now to secure your favorites for your special occasion.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => {
            const { ref, isVisible } = useScrollAnimation(0.1);
            return (
              <Card 
                key={product.id} 
                ref={ref as React.RefObject<HTMLDivElement>}
                className={`card-hover overflow-hidden border border-border transition-all duration-700 transform delay-${index * 100} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {product.badge && (
                    <Badge className="absolute top-4 right-4 bg-bakery-500">
                      {product.badge}
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground mt-1">
                        {product.category}
                      </CardDescription>
                    </div>
                    <span className="font-bold text-bakery-500">{product.price}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {product.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-bakery-500 hover:bg-bakery-600">
                    <ShoppingBag className="h-4 w-4 mr-2" /> Pre-order Now
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" className="btn-outline">View Full Menu</Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
