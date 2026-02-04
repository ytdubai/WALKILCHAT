import { format, formatDistanceToNow } from 'date-fns';

export const formatDate = (date: Date | string) => {
  return format(new Date(date), 'MMM d, yyyy');
};

export const formatRelativeTime = (date: Date | string) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};