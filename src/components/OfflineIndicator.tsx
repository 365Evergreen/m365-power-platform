import { useEffect, useState } from 'react';
import { WifiSlash, WifiHigh } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOffline, setShowOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOffline(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isOnline && showOffline) {
      const timer = setTimeout(() => {
        setShowOffline(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, showOffline]);

  return (
    <AnimatePresence>
      {(!isOnline || (isOnline && showOffline)) && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        >
          <div
            className={`${
              isOnline
                ? 'bg-accent border-accent'
                : 'bg-destructive border-destructive'
            } border rounded-lg shadow-lg px-4 py-2 flex items-center gap-2`}
          >
            {isOnline ? (
              <>
                <WifiHigh size={20} weight="bold" className="text-accent-foreground" />
                <span className="text-sm font-medium text-accent-foreground">
                  Back online
                </span>
              </>
            ) : (
              <>
                <WifiSlash size={20} weight="bold" className="text-destructive-foreground" />
                <span className="text-sm font-medium text-destructive-foreground">
                  You're offline
                </span>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
