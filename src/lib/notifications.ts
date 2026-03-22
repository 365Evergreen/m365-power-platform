import { Category } from './types';

    return 'denied';
  return Notification.permission;
    return 'denied';
  }
  return Notification.permission;
}

  try {
    return permission;
    console.error('F
  }

  if (Notification.permission !== 'granted') {
  }
  i

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

          tag: 'article-added',

      });