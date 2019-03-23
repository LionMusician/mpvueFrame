<template>
  <div class="container">
    <button @click="click">接口</button>
    <button @click="validate">mixin</button>
    <button @click="vuex">设置vuex</button>
  </div>
</template>

<script>
import utils from "@/utils/utils";
import { mapState, mapMutations } from "vuex";
import { TEST } from "@/store/mutation-type";

export default {
  data() {
    return {
      mobile: "1243214312"
    };
  },
  computed: {
    ...mapState(["test"])
  },
  methods: {
    ...mapMutations([TEST]),
    async click() {
      let r = await this.$http(`example`);
    },
    validate() {
      const rules = [
        {
          value: this.mobile,
          method: "tel",
          message: "手机号格式不正确"
        }
      ];
      return this.check(rules);
    },
    vuex() {
      this[TEST](11);
    }
  }
};
</script>

<style scoped>
</style>
