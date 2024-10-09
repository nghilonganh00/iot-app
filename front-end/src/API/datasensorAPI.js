const DatasensorAPI = {
  getAll: async ({
    limit,
    page,
    sortBy,
    sortDirection,
    searchKey,
    searchType,
  }) => {
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        page: page.toString(),
        sortBy,
        sortDirection,
      });

      if (searchType !== "all") {
        params.append("searchType", searchType);
        params.append("searchKey", searchKey);
      }

      const response = await fetch(
        `http://localhost:8080/datasensor?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};

export default DatasensorAPI;
