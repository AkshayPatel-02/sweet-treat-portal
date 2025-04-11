
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, UserPlus, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

// Mock users data
const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'customer',
    status: 'active',
    orders: 12,
    joinedDate: '2025-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'customer',
    status: 'active',
    orders: 5,
    joinedDate: '2025-02-20',
  },
  {
    id: 3,
    name: 'Admin User',
    email: 'admin@sweettreats.com',
    role: 'admin',
    status: 'active',
    orders: 0,
    joinedDate: '2024-12-01',
  },
  {
    id: 4,
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    role: 'customer',
    status: 'inactive',
    orders: 3,
    joinedDate: '2025-03-10',
  },
  {
    id: 5,
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    role: 'customer',
    status: 'active',
    orders: 8,
    joinedDate: '2025-02-05',
  },
];

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (action: string, user: any) => {
    toast({
      title: `Action: ${action}`,
      description: `Performed ${action} on user ${user.name}`,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <CardTitle>Users</CardTitle>
          <CardDescription>Manage your bakery users and customers.</CardDescription>
        </div>
        <Button className="bg-bakery-500">
          <UserPlus className="mr-2 h-4 w-4" /> Invite User
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search users..." 
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
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge className={user.role === 'admin' ? "bg-purple-500" : "bg-blue-500"}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={user.status === 'active' ? "bg-green-500" : "bg-gray-500"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.orders}</TableCell>
                    <TableCell>{user.joinedDate}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleAction('View Profile', user)}>
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction('Edit', user)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleAction('Reset Password', user)}>
                            Reset Password
                          </DropdownMenuItem>
                          {user.status === 'active' ? (
                            <DropdownMenuItem onClick={() => handleAction('Deactivate', user)}>
                              Deactivate Account
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleAction('Activate', user)}>
                              Activate Account
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminUsers;
