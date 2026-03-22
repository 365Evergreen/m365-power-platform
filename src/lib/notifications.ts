import { Category } from './types';

export function checkNotificationSupport(): boolean {
  if (!('Notification' in window)) {
    return false;
  }
  if (!('serviceWorker' in navigator)) {
    return false;
  }
  return true;
}

export function getNotificationPermission(): NotificationPermission {
  if (!checkNotificationSupport()) {
    return 'denied';
  }
  return Notification.permission;
}

export function getNotificationStatus(): NotificationPermission {
  return getNotificationPermission();
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!checkNotificationSupport()) {
    return 'denied';
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.error('Failed to request notification permission:', error);
    return 'denied';
  }
}

export function showArticleNotification(title: string, category: Category) {
  if (Notification.permission !== 'granted') {
    return;
  }

  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    try {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification('New Article Added', {
          body: `${title} (${category})`,
          icon: '/icon-192.svg',
          badge: '/icon-192.svg',
          tag: 'article-added',
        });
      });
    } catch (error) {
      console.error('Failed to show notification:', error);
    }
  }
}
