class ApiFeatures {

    constructor(query, queryString) {

        this.query = query;
        this.queryString = queryString;

    }

    // ==========================
    // SEARCH
    // ==========================

    search() {

        if (this.queryString.keyword) {

            this.query = this.query.find({

                name: {

                    $regex: this.queryString.keyword,
                    $options: "i",

                },

            });

        }

        return this;

    }

    // ==========================
    // FILTER
    // ==========================

    filter() {

        if (this.queryString.category) {

            this.query = this.query.find({

                category: this.queryString.category,

            });

        }

        if (
            this.queryString.minPrice ||
            this.queryString.maxPrice
        ) {

            const price = {};

            if (this.queryString.minPrice) {

                price.$gte =
                    Number(this.queryString.minPrice);

            }

            if (this.queryString.maxPrice) {

                price.$lte =
                    Number(this.queryString.maxPrice);

            }

            this.query = this.query.find({

                price,

            });

        }

        return this;

    }

    // ==========================
    // SORT
    // ==========================

    sort() {

        const sortBy =
            this.queryString.sort ||
            "-createdAt";

        this.query =
            this.query.sort(sortBy);

        return this;

    }

    // ==========================
    // PAGINATION
    // ==========================

    paginate(resultPerPage = 8) {

        const currentPage =
            Number(this.queryString.page) || 1;

        const skip =
            (currentPage - 1) * resultPerPage;

        this.query =
            this.query
                .skip(skip)
                .limit(resultPerPage);

        return this;

    }

}

module.exports = ApiFeatures;