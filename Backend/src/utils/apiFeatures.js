class ApiFeatures {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }

  // Search functionality
  search() {
    const keyword = this.querystr.keyword
      ? {
          $or: [
            { name: { $regex: this.querystr.keyword, $options: "i" } },
            { description: { $regex: this.querystr.keyword, $options: "i" } },
            { category: { $regex: this.querystr.keyword, $options: "i" } },
            { tag: { $regex: this.querystr.keyword, $options: "i" } },
            { brand: { $regex: this.querystr.keyword, $options: "i" } },
            {
              "frame.color.name": {
                $regex: this.querystr.keyword,
                $options: "i",
              },
            },
            { "frame.style": { $regex: this.querystr.keyword, $options: "i" } },
            { "frame.shape": { $regex: this.querystr.keyword, $options: "i" } },
          ],
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  // Filter functionality
  filter() {
    const queryCopy = { ...this.querystr };

    // Fields to remove for filtering
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    // Initialize a new filter object
    let filter = {};

    // Handle specific filters
    if (queryCopy.material) {
      filter["frame.material"] = queryCopy.material;
      delete queryCopy["material"];
    }
    if (queryCopy.shape) {
      filter["frame.shape"] = { $in: [queryCopy.shape] };
      delete queryCopy["shape"]; // Remove the original 'shape' key
    }

    // Handle gender filter to include "Unisex" for Men and Women, but not Kids
    if (queryCopy.gender) {
      if (queryCopy.gender === "Kids") {
        filter.gender = "Kids";
      } else {
        filter.gender = { $in: [queryCopy.gender, "Unisex"] };
      }
      delete queryCopy["gender"]; // Remove the original 'gender' key
    }

    if (queryCopy.frameType) {
      filter["frame.type"] = queryCopy.frameType;
      delete queryCopy["frameType"]; // Remove the original 'frameType' key
    }

    // Handle price and rating filters with comparison operators
    if (queryCopy.price) {
      filter["price"] = {};
      if (queryCopy.price.gte) {
        filter["price"]["$gte"] = Number(queryCopy.price.gte);
      }
      if (queryCopy.price.lte) {
        filter["price"]["$lte"] = Number(queryCopy.price.lte);
      }
      delete queryCopy["price"]; // Remove the original 'price' key
    }

    // Apply the filter to the query
    this.query = this.query.find(filter);
    return this;
  }

  // Pagination functionality
  pagination(resultPerPage) {
    const currentPage = Number(this.querystr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

export { ApiFeatures };
