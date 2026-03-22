import { Category } from './types';

export function getNotificationStatus(): NotificationPermission {
  if (!('Notification' in window)) {
    return 'denied';
  }
  return Notification.permission;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    return 'denied';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission;
  }

  return Notification.permission;
}

export async function showArticleNotification(title: string, category: Category) {
  if (Notification.permission === 'granted') {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification('New Article Added', {
          body: `${title} (${category})`,
          icon: '/icon-192.svg',
          badge: '/icon-192.svg',
          tag: 'article-added',
          requireInteraction: false
        });
      });
    } else {
      new Notification('New Article Added', {
        body: `${title} (${category})`,
        icon: '/icon-192.svg'
      });
    }
  }
}
