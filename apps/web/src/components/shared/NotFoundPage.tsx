import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileQuestion, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../ui/Button';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-ground p-6">
      <div className="max-w-md w-full bg-panel border border-rule rounded-panel p-8 text-center space-y-5 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto">
          <FileQuestion className="w-8 h-8" />
        </div>
        <div className="space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            404 Error
          </span>
          <h1 className="font-display text-2xl font-bold text-ink">
            Page Not Found
          </h1>
          <p className="text-[14px] text-ink-secondary leading-relaxed">
            The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button
            variant="outline"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          <Button
            variant="primary"
            leftIcon={<Home className="w-4 h-4" />}
            onClick={() => navigate('/')}
          >
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}
