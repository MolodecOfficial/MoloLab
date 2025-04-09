import { getActiveUserCount } from '~/stores/activeUsers';

export default defineEventHandler(async () => {
    return { count: getActiveUserCount() };
});