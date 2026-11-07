import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Building2, UserCheck, ShieldCheck, Activity } from 'lucide-react';

export function SuperAdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Badge variant="accent" size="sm">Platform Administration</Badge>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
          Super Admin Control Panel
        </h1>
        <p className="text-[14px] text-ink-secondary">
          Platform-wide health network monitoring, hospital approvals, and security audit logs
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="space-y-2">
          <div className="flex items-center justify-between text-ink-secondary">
            <span className="text-[12px] font-semibold uppercase">Hospitals Registered</span>
            <Building2 className="w-4 h-4 text-accent" />
          </div>
          <div className="font-display text-3xl font-bold text-ink">48</div>
          <div className="text-[12px] text-emerald-600 font-medium">42 Approved · 6 Pending Review</div>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between text-ink-secondary">
            <span className="text-[12px] font-semibold uppercase">Verified Doctors</span>
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-display text-3xl font-bold text-ink">314</div>
          <div className="text-[12px] text-ink-secondary font-medium">100% BMDC Verified</div>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between text-ink-secondary">
            <span className="text-[12px] font-semibold uppercase">Emergency Dispatches</span>
            <Activity className="w-4 h-4 text-red-600" />
          </div>
          <div className="font-display text-3xl font-bold text-ink">1,289</div>
          <div className="text-[12px] text-emerald-600 font-medium">Avg response 8.4 mins</div>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between text-ink-secondary">
            <span className="text-[12px] font-semibold uppercase">System Status</span>
            <ShieldCheck className="w-4 h-4 text-accent" />
          </div>
          <div className="font-display text-3xl font-bold text-emerald-600">99.98%</div>
          <div className="text-[12px] text-ink-secondary font-medium">Socket & WebRTC Normal</div>
        </Card>
      </div>
    </div>
  );
}
