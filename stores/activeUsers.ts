const activeUsers = new Map<string, number>();

export function addActiveUser(userId: string) {
    activeUsers.set(userId, Date.now());
}

export function removeInactiveUsers() {
    const now = Date.now();
    const cutoff = now - 60 * 1000; // 1 минута

    for (const [userId, timestamp] of activeUsers) {
        if (timestamp < cutoff) {
            activeUsers.delete(userId);
        }
    }
}

export function getActiveUserCount() {
    removeInactiveUsers();
    return activeUsers.size;
}