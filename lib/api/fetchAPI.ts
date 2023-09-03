import { sha512 } from "js-sha512";

import UserStorage from "../storage/UserStorage";
import constraints from "./constraints";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type statusResponse = {
  success: boolean;
  errors?: string;
};
type dataResponse<T = object> = {
  data: T;
} & statusResponse;

function fetchAPI<T extends statusResponse>(
  method: Method,
  url: string,
  body?: object
): Promise<T> {
  const isServerSide = typeof window === "undefined";

  const abortController = new AbortController();
  const abortSignal = abortController.signal;
  setTimeout(() => abortController.abort(), 5000);

  const options: RequestInit = {
    method: method,
    signal: abortSignal,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (!isServerSide) {
    const pubKey = UserStorage.getPubKey();
    const privKey = UserStorage.getPrivateKey();

    if (pubKey && privKey) {
      const ts = Math.floor(Date.now() / 1000).toString();
      // @ts-ignore
      options.headers["x-auth"] = pubKey;
      // @ts-ignore
      options.headers["x-timestamp"] = ts;
      // @ts-ignore
      options.headers["x-sign"] = sha512(`${ts}${privKey}`);
    }
  }
  if (!isServerSide) {
    const category = UserStorage.getUserCategory();

    if (category) {
      // @ts-ignore
      options.headers["x-category"] = category.categoryId;
      // @ts-ignore
      options.headers["x-major"] = category.majorId;
    }
  }

  if (method != "GET") {
    options.body = JSON.stringify(body);
  }

  const url_complete = `${constraints.SERVER_URL}${url}`;
  console.debug(method, url_complete, options, body);

  return fetch(url_complete, options)
    .catch((err) => {
      console.warn(method, url_complete, body, err);
      if (
        err.name &&
        (err.name === "AbortError" || err.name === "TimeoutError")
      ) {
        return Promise.reject("서버와 통신에 실패 했습니다 (Timeout)");
      }

      return Promise.reject("서버와 통신 중 오류가 발생했습니다.");
    })
    .then((res) => {
      console.debug(res);
      // 특수 처리 (로그인 실패시에도 401이 들어옴)
      // 로그인의 경우는 바로 내려 보냄
      if (url == "/user/login") {
        return res.json();
      }

      if (res.status === 401) {
        // 로그인 안됨 (unauthorized)
        UserStorage.clear();
        return Promise.reject("로그인 토큰이 만료되었습니다.");
      }

      return res.json();
    })
    .then((json) => {
      console.log(url_complete, json);
      const resp = json as T;

      if (json.status !== true && resp.success === false) {
        console.error(method, url_complete, body, resp.errors ?? json.message);
        return Promise.reject(resp.errors ?? json.message);
      }

      return Promise.resolve(resp);
    });
}

function uploadAPI<T>(
  method: Method,
  url: string,
  body?: FormData
): Promise<T> {
  const isServerSide = typeof window === "undefined";

  const abortController = new AbortController();
  const abortSignal = abortController.signal;
  setTimeout(() => abortController.abort(), 5000);

  const options: RequestInit = {
    method: method,
    signal: abortSignal,
    headers: {},
  };

  if (!isServerSide) {
    const pubKey = UserStorage.getPubKey();
    const privKey = UserStorage.getPrivateKey();

    if (pubKey && privKey) {
      const ts = Math.floor(Date.now() / 1000).toString();
      // @ts-ignore
      options.headers["x-auth"] = pubKey;
      // @ts-ignore
      options.headers["x-timestamp"] = ts;
      // @ts-ignore
      options.headers["x-sign"] = sha512(`${ts}${privKey}`);
    }
  }
  if (!isServerSide) {
    const category = UserStorage.getUserCategory();

    if (category) {
      // @ts-ignore
      options.headers["x-category"] = category.categoryId;
      // @ts-ignore
      options.headers["x-major"] = category.majorId;
    }
  }

  options.body = body;

  const url_complete = `${constraints.SERVER_URL}${url}`;
  console.debug(method, url_complete, options, body);

  return fetch(url_complete, options)
    .catch((err) => {
      console.warn(method, url_complete, body, err);
      if (
        err.name &&
        (err.name === "AbortError" || err.name === "TimeoutError")
      ) {
        return Promise.reject("서버와 통신에 실패 했습니다 (Timeout)");
      }

      return Promise.reject("서버와 통신 중 오류가 발생했습니다.");
    })
    .then((res) => {
      console.debug(res);
      // 특수 처리 (로그인 실패시에도 401이 들어옴)
      // 로그인의 경우는 바로 내려 보냄
      if (url == "/user/login") {
        return res.json();
      }

      if (res.status === 401) {
        // 로그인 안됨 (unauthorized)
        UserStorage.clear();
        return Promise.reject("로그인 토큰이 만료되었습니다.");
      }

      return res.json();
    })
    .then((json) => {
      const resp = json as T;

      return Promise.resolve(resp);
    });
}

function GetAPI<T extends statusResponse = dataResponse>(
  url: string,
  params?: Record<string, string | number>
) {
  if (params != undefined) {
    const urlParams = new URLSearchParams();
    Object.keys(params).forEach((key) =>
      urlParams.append(key, params[key].toString())
    );
    url = `${url}?${urlParams.toString()}`;
  }

  return fetchAPI<T>("GET", url, undefined);
}
function PostAPI<T extends statusResponse = dataResponse>(
  url: string,
  body?: object
) {
  return fetchAPI<T>("POST", url, body);
}
function PutAPI<T extends statusResponse = dataResponse>(
  url: string,
  body?: object
) {
  return fetchAPI<T>("PUT", url, body);
}
function DeleteAPI<T extends statusResponse = dataResponse>(
  url: string,
  body?: object
) {
  return fetchAPI<T>("DELETE", url, body);
}
function PatchAPI<T extends statusResponse = dataResponse>(
  url: string,
  body?: object
) {
  return fetchAPI<T>("PATCH", url, body);
}

export type { dataResponse, statusResponse };
export { DeleteAPI, GetAPI, PostAPI, PutAPI, PatchAPI, uploadAPI };
