import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import path from "node:path";

const backServer = `http://localhost:3000`;
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // 개발용 임시 서버
  //프록시는 개발안에서만 작동 ->1.프로튼단 api 들어냄? 서버쪽에서 api빼고 운영서버에서 api들어가는 방식으로 할건지
  server: {
    // Vue.js 실행 시 적용 PORT 변경
    port: 8099,
    // CORS(Cross Origin Resource Sharing) => proxy setting
    //origin 다를 경우 막음,서로다른 ip까지를 오리진(프로토콜/포트)이라 한다. 통신차단,경우따라 서버에 등록해줘야한다.
    proxy: {
      "^/api": {
        target: backServer,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    //outDir: "../server/public",
    //해당경로이동옵션
  },
});
