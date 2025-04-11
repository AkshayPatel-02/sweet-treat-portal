
import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

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
  },
  {
    id: 5,
    name: 'Raspberry Cheesecake',
    description: 'Creamy New York style cheesecake with a raspberry swirl topping.',
    price: '$32.99',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Cakes',
    badge: 'Limited'
  },
  {
    id: 6,
    name: 'Macaron Gift Box',
    description: 'Assorted French macarons in a variety of classic and seasonal flavors.',
    price: '$22.99',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Pastries'
  }
];

const User = () => {
  const { session, profile } = useAuth();
  const { toast } = useToast();

  const handlePreOrder = (productName: string) => {
    toast({
      title: "Pre-order Placed!",
      description: `Your ${productName} will be ready for pickup soon.`,
    });
  };

  if (!session) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-3xl font-bold mb-4">Welcome, {profile?.first_name || 'Sweet Treats Lover'}!</h1>
              <p className="text-muted-foreground">
                Browse our delicious menu below and pre-order your favorite treats.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Card key={product.id} className="card-hover overflow-hidden border border-border">
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
                    <Button 
                      className="w-full bg-bakery-500 hover:bg-bakery-600"
                      onClick={() => handlePreOrder(product.name)}
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" /> Pre-order Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default User;
