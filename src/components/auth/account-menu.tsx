import { LogOut } from 'lucide-react';
import { demoUser, useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';

export function AccountMenu() {
  const { signOut } = useAuth();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-2.5 text-[13px] text-(--color-text-muted)"
      onClick={signOut}
    >
      {demoUser.initials} <span>{demoUser.name}</span>
      <LogOut size={15} />
    </Button>
  );
}