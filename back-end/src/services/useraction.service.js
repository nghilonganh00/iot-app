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
    createdAt = null,
  }) => {
    try {
      const offset = (page - 1) * limit;

      let whereClause = "1=1";
      const params = {
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      };

      if (searchType) {
        whereClause += " AND device = :searchType";
        params.searchType = searchType;
      }

      if (searchKey) {
        whereClause += " AND status = :searchKey";
        params.searchKey = searchKey;
      }

      if (createdAt) {
        whereClause += " AND createdAt = :createdAt";
        params.createdAt = createdAt;
      }

      const query = `
        SELECT *, COUNT(*) OVER() AS total_count
        FROM Useractions
        WHERE ${whereClause}
        ORDER BY ${sortBy} ${sortDirection.toUpperCase()}
        LIMIT :limit OFFSET :offset
      `;

      const useractions = await db.sequelize.query(query, {
        replacements: params,
        type: db.Sequelize.QueryTypes.SELECT,
      });

      const totalRecords = useractions.length ? useractions[0].total_count : 0;

      return {
        actionHistory: useractions,
        currentPage: page,
        totalPages: Math.ceil(totalRecords / limit),
        totalRecords: totalRecords,
      };
    } catch (error) {
      throw Error(`Fetching action history failed: ${error}`);
    }
  },
};

export default UserActionService;
