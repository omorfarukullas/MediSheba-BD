import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileQuestion, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../ui/Button';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas p-6">
      <div className="max-w-md w-full bg-canvas border border-border rounded-xl p-8 text-center space-y-5">
        <div className="w-12 h-12 rounded-lg bg-subtle text-text-3 flex items-center justify-center mx-auto">
          <FileQuestion className="w-6 h-6 text-text-3" />
        </div>
        <div className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            404 Error
          </span>
          <h1 className="text-2xl font-semibold text-ink">
            Page Not Found
          </h1>
          <p className="text-sm text-text-3 leading-relaxed">
            The page you are looking for does not exist, has been moved, or is temporarily unavailable.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button
            variant="secondary"
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
