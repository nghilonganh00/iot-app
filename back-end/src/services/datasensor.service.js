import { Op } from "sequelize";
import db from "../models/index";

const DatasensorService = {
  create: async ({ temperature, humidity, light }) => {
    try {
      const newDatasensor = await db.Datasensor.create({
        temperature,
        humidity,
        light,
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
  }) => {
    try {
      const offset = (page - 1) * limit;

      const whereClause = {};
      let datasensors;

      if (searchKey && searchType) {
        console.log("searkey isnt null: ", searchKey, searchType);
        whereClause[searchType] = { [Op.eq]: searchKey };
        datasensors = await db.Datasensor.findAndCountAll({
          where: whereClause,
          limit: parseInt(limit, 10),
          offset: parseInt(offset, 10),
          order: [[sortBy, sortDirection.toUpperCase()]],
        });
      } else {
        datasensors = await db.Datasensor.findAndCountAll({
          limit: parseInt(limit, 10),
          offset: parseInt(offset, 10),
          order: [[sortBy, sortDirection.toUpperCase()]],
        });
      }

      return {
        datasensor: datasensors.rows,
        currentPage: page,
        totalPages: Math.ceil(datasensors.count / limit),
        totalRecords: datasensors.count,
      };
    } catch (error) {
      throw Error(`Fetching datasensors failed: ${error}`);
    }
  },
};

export default DatasensorService;
