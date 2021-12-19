export default class Api {
  async fetch(apiPath, query) {
    let searchParams = new URLSearchParams(query);

    const response = await fetch(
      `${this.host}/${apiPath}?${searchParams.toString()}`
    );
    return await response.json();
  }
}
