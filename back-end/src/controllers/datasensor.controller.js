import DatasensorService from "../services/datasensor.service";

const DatasensorController = {
  handleGetAll: async (req, res) => {
    try {
      const { limit, page, sortBy, sortDirection, searchKey, searchType } =
        req.query;

      const datasensor = await DatasensorService.getAll({
        limit,
        page,
        sortBy,
        sortDirection,
        searchKey,
        searchType,
      });

      return res.status(200).json({
        data: datasensor,
        message: "Get datasensor successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        data: [],
        message: `Interval Server Error: ${error}`,
      });
    }
  },
};

export default DatasensorController;
