
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock products data
const products = [
  {
    id: 1,
    name: 'Strawberry Bliss Cake',
    price: '$35.99',
    category: 'Cakes',
    available: true,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    name: 'Chocolate Truffle Box',
    price: '$24.99',
    category: 'Chocolates',
    available: true,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    name: 'Fruit Tart Collection',
    price: '$28.99',
    category: 'Pastries',
    available: true,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d5b1ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    name: 'Croissant Bundle',
    price: '$19.99',
    category: 'Pastries',
    available: false,
    badge: '',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { toast } = useToast();

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Product Added",
      description: "The product has been added successfully!",
    });
    setShowAddDialog(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your bakery products.</CardDescription>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-bakery-500">
                <Plus className="mr-2 h-4 w-4" /> Add New Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <form onSubmit={handleAddProduct}>
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>
                    Fill in the details to add a new product to your bakery.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" placeholder="Enter product name" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" placeholder="0.00" type="number" step="0.01" min="0" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cakes">Cakes</SelectItem>
                        <SelectItem value="pastries">Pastries</SelectItem>
                        <SelectItem value="chocolates">Chocolates</SelectItem>
                        <SelectItem value="bread">Bread</SelectItem>
                        <SelectItem value="cookies">Cookies</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Enter product description" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input id="image" placeholder="Enter image URL" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="badge">Badge (Optional)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select badge" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="best-seller">Best Seller</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="popular">Popular</SelectItem>
                        <SelectItem value="limited">Limited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="available" defaultChecked />
                    <Label htmlFor="available">Available for ordering</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-bakery-500">Add Product</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search products..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Badge</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      No products found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <Badge className={product.available ? "bg-green-500" : "bg-red-500"}>
                          {product.available ? "Available" : "Unavailable"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {product.badge ? (
                          <Badge className="bg-bakery-500">{product.badge}</Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AdminProducts;
