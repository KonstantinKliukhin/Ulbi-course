import type { Notification } from '@/entities/Notification/model/types/notification';

export const mockedNotification: Notification = {
  id: '1',
  title: 'Уведомление 1',
  description: 'Произошло какое-то событие',
  href: '/',
};

export const mockedNotifications = Array(10).fill(mockedNotification).map((notification, index) => ({
  ...notification,
  id: String(index),
}));
