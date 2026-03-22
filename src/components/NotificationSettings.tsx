import { useEffect, useState } from 'react';
import { useKV } from '@github/spark/hooks';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, BellSlash, X } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import { requestNotificationPermission, getNotificationStatus } from '@/lib/notifications';
import { toast } from 'sonner';

export function NotificationSettings() {
  const [notificationsEnabled, setNotificationsEnabled] = useKV<boolean>('notifications-enabled', false);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const status = getNotificationStatus();
    setPermissionStatus(status);

    if (status === 'denied' && notificationsEnabled) {
      setNotificationsEnabled(false);
    }
  }, [notificationsEnabled, setNotificationsEnabled]);

  useEffect(() => {
    const shouldShowPrompt = 
      permissionStatus === 'default' && 
      !notificationsEnabled && 
      !localStorage.getItem('notification-prompt-dismissed');
    
    if (shouldShowPrompt) {
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [permissionStatus, notificationsEnabled]);

  const handleToggle = async (checked: boolean) => {
    if (checked) {
      if (permissionStatus === 'denied') {
        toast.error('Notifications are blocked. Please enable them in your browser settings.');
        return;
      }

      if (permissionStatus === 'default') {
        const permission = await requestNotificationPermission();
        setPermissionStatus(permission);
        
        if (permission === 'granted') {
          setNotificationsEnabled(true);
          toast.success('Notifications enabled! You\'ll receive alerts when new articles are added.');
        } else {
          toast.error('Notification permission denied');
        }
      } else if (permissionStatus === 'granted') {
        setNotificationsEnabled(true);
        toast.success('Notifications enabled');
      }
    } else {
      setNotificationsEnabled(false);
      toast.info('Notifications disabled');
    }
  };

  const handleEnableFromPrompt = async () => {
    const permission = await requestNotificationPermission();
    setPermissionStatus(permission);
    
    if (permission === 'granted') {
      setNotificationsEnabled(true);
      toast.success('Notifications enabled!');
      setShowPrompt(false);
    } else {
      toast.error('Notification permission denied');
      setShowPrompt(false);
    }
  };

  const handleDismissPrompt = () => {
    setShowPrompt(false);
    localStorage.setItem('notification-prompt-dismissed', 'true');
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {notificationsEnabled ? (
            <Bell size={18} weight="bold" className="text-accent" />
          ) : (
            <BellSlash size={18} weight="bold" className="text-muted-foreground" />
          )}
          <Label htmlFor="notifications-toggle" className="text-sm cursor-pointer">
            Notifications
          </Label>
        </div>
        <Switch
          id="notifications-toggle"
          checked={notificationsEnabled}
          onCheckedChange={handleToggle}
          disabled={permissionStatus === 'denied'}
        />
      </div>

      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-4 right-4 z-50 max-w-sm"
          >
            <div className="bg-card border border-border rounded-lg shadow-lg p-4">
              <button
                onClick={handleDismissPrompt}
                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Dismiss"
              >
                <X size={16} weight="bold" />
              </button>
              
              <div className="flex items-start gap-3 pr-4">
                <Bell size={24} weight="fill" className="text-accent flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground mb-1">
                    Stay Updated
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Get notified when new articles are added to your knowledge base.
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleEnableFromPrompt} 
                      size="sm"
                      className="flex-1"
                    >
                      Enable
                    </Button>
                    <Button 
                      onClick={handleDismissPrompt} 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                    >
                      Not now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
