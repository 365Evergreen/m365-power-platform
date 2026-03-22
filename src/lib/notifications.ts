import { Category } from './types';

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
  return Notificatio
  }

  if (Notification.permission === 'granted') {
  }
  i


}
export async function 
   

  return Notification.permission;
 

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
