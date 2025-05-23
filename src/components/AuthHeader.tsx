
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AuthHeader = () => {
  const { user, profile, signOut } = useAuth();

  const getInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  const handleSignOut = async () => {
    await signOut();
  };

  // Special admin access by email - add the new email
  const isAdmin = profile?.role === 'admin' || 
                  user?.email === 'admin@sweettreats.com' || 
                  user?.email === 'akshaypatelchadal@gmail.com';

  const getUserAvatarUrl = () => {
    // If using Google OAuth, get avatar from user_metadata
    if (user?.app_metadata?.provider === 'google' && user?.user_metadata?.avatar_url) {
      return user.user_metadata.avatar_url;
    }
    return null;
  };

  const avatarUrl = getUserAvatarUrl();

  return (
    <div className="flex items-center space-x-2">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt="User avatar" />
              ) : null}
              <AvatarFallback>{getInitials()}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              {user?.user_metadata?.full_name || 
               (profile ? `${profile.first_name} ${profile.last_name}` : user.email)}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/user" className="w-full cursor-pointer">
                Menu
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/profile" className="w-full cursor-pointer">
                Profile
              </Link>
            </DropdownMenuItem>
            {isAdmin && (
              <DropdownMenuItem asChild>
                <Link to="/admin" className="w-full cursor-pointer">
                  Admin Dashboard
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <Link to="/orders" className="w-full cursor-pointer">
                My Orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild variant="default">
          <Link to="/auth">Sign In</Link>
        </Button>
      )}
    </div>
  );
};

export default AuthHeader;
