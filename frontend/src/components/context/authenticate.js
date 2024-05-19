import api from "../../services/api";

export default async function authenticate({ url, args }) {
  return api.get(url, args).then(() => true);
}
