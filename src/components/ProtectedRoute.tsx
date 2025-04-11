
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { session, profile, loading, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Special admin access by email
  const isAdmin = profile?.role === 'admin' || user?.email === 'admin@sweettreats.com' || 
                  user?.email === 'akshaypatelchadal@gmail.com';

  useEffect(() => {
    if (!loading && !session) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access this page",
        variant: "destructive"
      });
    } else if (!loading && adminOnly && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin area",
        variant: "destructive"
      });
    }
  }, [loading, session, adminOnly, isAdmin]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-bakery-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/auth" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
