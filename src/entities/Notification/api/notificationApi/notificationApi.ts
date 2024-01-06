import { $rtkApi, API_ROUTES } from 'shared/api';
import { type Notification } from '../../model/types/notification';

export enum NotificationApiTags {
  NOTIFICATION = 'NOTIFICATION'
}

export const notificationApi = $rtkApi.enhanceEndpoints({
  addTagTypes: Object.values<NotificationApiTags>(NotificationApiTags),
}).injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<Notification[], null>({
      query: (arg) => ({
        url: API_ROUTES.notifications(),
      }),
      providesTags: (result) => [
        NotificationApiTags.NOTIFICATION,
      ],
    }),
  }),
});

export const { useGetNotificationsQuery, } = notificationApi;
