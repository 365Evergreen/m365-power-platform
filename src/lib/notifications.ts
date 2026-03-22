import { Category } from './types';

export function isNotificationSupported(): boolean {
  if (!('Notification' in window)) {
    return false;
  }
  if (!('serviceWorker' in navigator)) {
    return false;
  }
  return true;
}

export function getNotificationStatus(): NotificationPermission {
  if (!isNotificationSupported()) {
    return 'denied';
  }
  return Notification.permission;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!isNotificationSupported()) {
    return 'denied';
  }

  const permission = await Notification.requestPermission();
  return permission;
}

export function showArticleNotification(title: string, category: Category): void {
  if (!isNotificationSupported() || Notification.permission !== 'granted') {
    return;
  }

  try {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification('New Article Added', {
          body: `${title} (${category})`,
          icon: '/icon-192.svg',
          badge: '/icon-192.svg',
          tag: 'article-added',
        });
      });
    } else {
      new Notification('New Article Added', {
        body: `${title} (${category})`,
        icon: '/icon-192.svg',
        badge: '/icon-192.svg',
      });
    }
  } catch (error) {
    console.error('Failed to show notification:', error);
  }
}
