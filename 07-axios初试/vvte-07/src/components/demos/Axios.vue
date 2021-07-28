<template>
  <!-- ↓HTTP请求demo -->
  <div>
    <h2>HTTP请求</h2>
    <button @click="httpGet">get请求</button>
    <button @click="httpPost">post请求</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { axiosInstance } from "@/utils/http/index";

export default defineComponent({
  name: "Axios",
  setup() {
    // ↓发送get请求
    const httpGet = () => {
      axiosInstance
        .get("https://jsonplaceholder.typicode.com/posts/1")
        .then((response: any) => {
          console.log(response);
        })
        .catch((error: any) => {
          alert(error);
        });
    };
    // ↓发送post请求
    const httpPost = () => {
      axiosInstance
        .post("https://jsonplaceholder.typicode.com/posts", {
          keyword: "code",
        })
        .then((response: any) => {
          console.log(response);
        })
        .catch((error: any) => {
          alert(error);
        });
    };

    return {
      httpGet,
      httpPost,
    };
  },
});
</script>