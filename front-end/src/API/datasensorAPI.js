const DatasensorAPI = {
  getAll: async ({
    limit,
    page,
    sortBy,
    sortDirection,
    searchKey,
    searchType,
    createdAt,
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

      if (createdAt) {
        params.append("createdAt", createdAt);
      }

      const response = await fetch(
        `http://localhost:8080/api/datasensor?${params.toString()}`,
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
