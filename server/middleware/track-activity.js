import { addActiveUser } from '~/stores/activeUsers';

export default defineEventHandler(async (event) => {
    const userId = event.node.req.headers['x-forwarded-for'] || event.node.req.socket.remoteAddress;
    addActiveUser(userId);
});