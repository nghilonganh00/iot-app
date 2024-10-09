import { Op } from "sequelize";
import db from "../models";

const UserActionService = {
  create: async ({ device, status }) => {
    try {
      const newUserAction = await db.UserAction.create({
        device,
        status,
      });

      return newUserAction;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
  getAll: async ({
    limit = 10,
    page = 1,
    sortBy = "createdAt",
    sortDirection = "DESC",
    searchKey,
    searchType,
  }) => {
    try {
      const offset = (page - 1) * limit;

      const whereClause = {};
      let userActions;

      searchType && (whereClause["device"] = { [Op.eq]: searchType });
      searchKey && (whereClause["status"] = { [Op.eq]: searchKey });

      userActions = await db.UserAction.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
        order: [[sortBy, sortDirection.toUpperCase()]],
      });

      return {
        actionHistory: userActions.rows,
        currentPage: page,
        totalPages: Math.ceil(userActions.count / limit),
        totalRecords: userActions.count,
      };
    } catch (error) {
      throw Error(`Fetching action history failed: ${error}`);
    }
  },
};

export default UserActionService;
