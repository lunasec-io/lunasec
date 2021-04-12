import {makeSpecificApiClient, SpecificApiClient} from './api-client';

interface TokenizerClientConfig {
  host: string,
  port: number,
  metaEncoding: "base64",
  endpoints: {
    setMetadata: string,
    getMetadata: string,
    getToken: string,
    setToken: string,
  },
  headers: {
    key: string,
    meta: string,
  }
}

const CONFIG_DEFAULTS: TokenizerClientConfig = {
  host: 'localhost',
  port: 37765,
  metaEncoding: "base64",
  endpoints: {
    setMetadata: '/metadata/set',
    getMetadata: '/metadata/get',
    getToken: '/tokenize',
    setToken: '/detokenize',
  },
  headers: {
    key: "X-Tokenizer-Secret-Key",
    meta: "X-Tokenizer-Meta"
  }
}

export class Tokenizer {
  readonly config!: TokenizerClientConfig;
  private readonly getMetadataClient!: SpecificApiClient<"getMetadata">;
  private readonly setMetadataClient!: SpecificApiClient<"setMetadata">;
  private readonly getTokenClient!: SpecificApiClient<"getToken">;
  private readonly setTokenClient!: SpecificApiClient<"setToken">;

  constructor(config: TokenizerClientConfig) {
    // Deep clone config for mutation safety.
    this.config = JSON.parse(JSON.stringify(Object.assign({}, CONFIG_DEFAULTS, config)));

    this.getMetadataClient = makeSpecificApiClient<"getMetadata">(this.config.host, this.config.endpoints.getMetadata, {
      method: 'POST',
      headers: {}
    });
    this.setMetadataClient = makeSpecificApiClient<"setMetadata">(this.config.host, this.config.endpoints.setMetadata, {
      method: 'POST',
      headers: {}
    });
    this.getTokenClient = makeSpecificApiClient<"getToken">(this.config.host, this.config.endpoints.getToken, {
      method: 'POST',
      headers: {}
    });
    this.setTokenClient = makeSpecificApiClient<"setToken">(this.config.host, this.config.endpoints.setToken, {
      method: 'POST',
      headers: {}
    });
  }

  // TODO: Evaluate adding back keygenSet and keygenGet methods

  async getMetadata(tokenId: string) {
    return await this.getMetadataClient({
      tokenId: tokenId
    });
  }

  async setMetadata(tokenId: string, metadata: string) {
    return await this.setMetadataClient({
      tokenId,
      value: metadata
    });
  }

  // TODO: Add another method that _doesn't_ take a key, so that we handle generation.
  async tokenize(key: string, input: string) {
    const response = await this.setTokenClient({
      tokenId: key,
      value: input
    });

    if (!response.success || !response.responseData) {
      return response;
    }

    const data = response.responseData;

    data.

    var contentLength = Buffer.byteLength(input)
    return new Promise((accept, reject) => {
      this.keygenSet(key).then((data) => {
        let chunks = []
        let prefix = "https://" + data.headers.host
        data.headers['Content-Length'] = contentLength

        let options = {
          method: "PUT",
          hostname: data.headers.host,
          path: data.uploadUrl.replace(prefix, ""),
          headers: data.headers
        }
        let req = https.request(options, res => {
          let statusCode = res.statusCode
          res.on("data", chunk => chunks.push(chunk))
          res.on("end", (r) => {
            if (statusCode !== 200) {
              return reject({
                statusCode: statusCode,
                options: options,
                awsErr: chunks.join("")
              })
            }

            return accept(data.tokenId)
          })
        })

        req.on("error", (e) => reject(e.message))
        req.write(input)
        req.end()
      }).catch((error) => {
        reject(error)
      })
    })
  }

  detokenize(key, tokenId) {
    return new Promise((accept, reject) => {
      this.keygenGet(key, tokenId).then((data) => {
        var buf
        let prefix = "https://" + data.headers.host
        let options = {
          method: "GET",
          hostname: data.headers.host,
          path: data.downloadUrl.replace(prefix, ""),
          headers: data.headers
        }
        let req = https.request(options, res => {
          res.on("data", chunk => chunk.copy(buf))
          res.on("end", () => accept(buf))
        })

        req.on("response", resp => {
          if (resp.statusCode !== 200) {
            return reject(resp)
          }

          var contentLength = resp.headers['content-length']

          if (!contentLength) {
            return reject("No content length specified in response")
          }

          var size = parseInt(contentLength)

          if (contentLength <= 0) {
            return reject("Content length is too small")
          }

          buf = Buffer.alloc(size)
        })
        req.on("error", (e) => reject(e.message))
        req.end()
      }).catch((error) => {
        reject(error)
      })
    })

  }
}
