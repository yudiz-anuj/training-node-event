class Common {
  parse(data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }
  stringify(data) {
    try {
      return JSON.stringify(data);
    } catch (e) {
      return data;
    }
  }

  getReqPayload(req) {
    return new Promise((resolve, reject) => {
      try {
        let body = '';
        req.on('data', (chunk) => {
          // append the string version to the body
          body += chunk.toString();
        });
        req.on('end', () => {
          // send back the data
          if (req.headers['content-type'] === 'application/json')
            resolve(this.parse(body));
          else resolve(body);
        });
        req.on('error', (err) => {
          reject(err);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export const common = new Common();
