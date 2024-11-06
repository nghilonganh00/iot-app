import { Op } from "sequelize";
import db from "../models/index";

const DatasensorService = {
  create: async ({ temperature, humidity, light }) => {
    try {
      const newDatasensor = await db.Datasensor.create({
        temperature,
        humidity,
        light,
        // wind,
      });

      return newDatasensor;
    } catch (error) {
      throw Error(`Create the new Datasensor failed: ${error}`);
    }
  },

  getAll: async ({
    limit = 10,
    page = 1,
    sortBy = "createdAt",
    sortDirection = "DESC",
    searchKey = "",
    searchType = "",
    createdAt = null,
  }) => {
    try {
      const offset = (page - 1) * limit;

      let whereClause = "1=1";
      const params = {
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      };

      if (createdAt) {
        whereClause += " AND createdAt = :createdAt";
        params.createdAt = createdAt;
      }

      if (searchKey && searchType) {
        whereClause += ` AND ${searchType} = :searchKey`;
        params.searchKey = searchKey;
        params.searchType = searchType;
      }

      const query = `
        SELECT *, COUNT(*) OVER() AS total_count
        FROM Datasensors
        WHERE ${whereClause}
        ORDER BY ${sortBy} ${sortDirection.toUpperCase()}
        LIMIT :limit OFFSET :offset;
      `;

      const datasensors = await db.sequelize.query(query, {
        replacements: params,
        type: db.Sequelize.QueryTypes.SELECT,
      });

      const totalRecords = datasensors.length ? datasensors[0].total_count : 0;

      return {
        datasensor: datasensors,
        currentPage: page,
        totalPages: Math.ceil(totalRecords / limit),
        totalRecords: totalRecords,
      };
    } catch (error) {
      throw Error(`Fetching datasensors failed: ${error}`);
    }
  },
};

export default DatasensorService;
