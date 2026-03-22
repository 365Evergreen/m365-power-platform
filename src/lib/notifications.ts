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

  const permission = await Notification.requestPermission();
  return permission;
}

export async function showArticleNotification(title: string, category: Category) {
  if (Notification.permission !== 'granted') {
    return;
  }

  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready;
    
    try {
      await registration.showNotification('New Article Added', {
        icon: '/icon-192.svg',
        badge: '/icon-192.svg',
        body: `${title} (${category})`,
      });
    } catch (error) {
      console.error('Failed to show notification:', error);
    }
  } else {
    new Notification('New Article Added', {
      icon: '/icon-192.svg',
      body: `${title} (${category})`,
    });
  }
}
