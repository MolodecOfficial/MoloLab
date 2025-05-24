import Specialty from '~/server/models/specialty.model'

export default defineEventHandler(async (event) => {
    const specialties = await Specialty.find();
    return {
        specialties,
    };
});

