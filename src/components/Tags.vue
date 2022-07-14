<template>
  <div class="tags-container">
    <!-- <el-tag
      class="hand"
      v-for="(item) in tags"
      :key="item.path"
      size="medium"
      :closable="item.path !== '/index'"
      :effect="$route.path === item.path ? 'dark' : 'plain'"
      type="warning">
      {{item.title}}
    </el-tag> -->
    <el-tag
      @click="handleActiveTag(item.path)"
      @close="handleRemoveTag(index)"
      class="hand"
      v-for="(item, index) in tags"
      :key="item.path"
      size="medium"
      :closable="item.path !== '/index'"
      :effect="$route.path === item.path ? 'dark' : 'plain'"
      type="warning"
    >
      {{ item.title }}
    </el-tag>
  </div>
</template>

<script>
export default {
  computed: {
    tags() {
      return this.$store.getters.tags
    }
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        this.handleAddTag()
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleAddTag() {
      const path = this.$route.path
      const title = this.$route.meta.title
      const newTag = {
        path,
        title
      }
      this.$store.dispatch('tags/addTags', newTag)
    },
    handleRemoveTag(index) {
      if (!index) return
      this.$store.dispatch('tags/removeTags', index)
      const path = this.tags[index - 1].path
      this.$router.push(path)
    },
    handleActiveTag(path) {
      this.$router.push(path)
    }
  }
}

</script>

<style scoped>
.tags-container {
  margin-left: 10px;

}
.el-tag{
    cursor: pointer;
    margin-right: 10px;
  }
</style>
