import Application from "../models/applicationModel.js";

export const findApplicationService = async (query, options = {}) => {
    try {
        return await Application.findOne(query, null, options);
    } catch (error) {
        throw error;
    }
}
export const createApplicationService = async (data) => {
    try {
        return await Application.create(data);
    } catch (error) {
        throw error;
    }
};