const UserActionAPI = {
  toggle: async ({ device, status }) => {
    try {
      const response = await fetch("http://localhost:8080/user-action/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          device: device,
          status: status,
        }),
      });

      return response;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
  getStatus: async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/user-action/device-status",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
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
      }
      if (searchKey !== "all") {
        params.append("searchKey", searchKey);
      }

      const response = await fetch(
        `http://localhost:8080/user-action/history-action?${params.toString()}`,
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

export default UserActionAPI;
