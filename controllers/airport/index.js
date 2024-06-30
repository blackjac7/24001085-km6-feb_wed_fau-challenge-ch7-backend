const axios = require("axios");

exports.getAirports = async (req, res, next) => {
    const { name, city } = req.query;

    try {
        const config = {
            method: "get",
            url: `https://api.api-ninjas.com/v1/airports?country=${city}`, // Include city param if provided
            headers: {
                "X-Api-Key": "wHI17RVQVmQsbDJdU6LG5Q==0iF37mhKIo27ClWm", // Replace with your actual API Key
            },
        };

        const response = await axios.request(config);

        res.status(200).json({
            message: "Success",
            data: response.data,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({
            message: "Error fetching airport information",
        });
    }
};
