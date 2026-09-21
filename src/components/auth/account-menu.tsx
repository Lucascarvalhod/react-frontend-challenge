import { LogOut } from 'lucide-react';
import { demoUser, useLogout } from '@/hooks/use-logout';
import { Button } from '@/components/ui/button';

export function AccountMenu() {
  const { signOut } = useLogout();

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