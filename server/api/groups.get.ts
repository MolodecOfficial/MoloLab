import Group from '~/server/models/group.model'

export default defineEventHandler(async (event) => {
    const groups = await Group.find();
    return {
        groups,
    };
});

