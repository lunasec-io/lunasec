import { apiRequest } from "./util";

function subscribe(data) {
  return apiRequest("newsletter", "POST", data);
}

const newsletter = { subscribe };

export default newsletter;
