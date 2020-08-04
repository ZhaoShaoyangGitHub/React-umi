
import Request from "../../utils/request";

export const demo = data =>
    Request({
        url: "/api/demo",
        method: "GET",
        data
    });
