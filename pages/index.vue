<template>
  <div class="text-center">
    <h1 class="font-bold my-4">Todoリスト</h1>
    <form class="mb-4 px-4 flex w-full justify-center">
      <input type="text" placeholder="タスクを入力してください" class="border pr-10 w-1/2 mr-4" v-model="content">
      <button class="border rounded px-2 py-2" @click.prevent="insert">追加</button>
    </form>
    <div class="mb-4">
      <button class="border rounded px-2 py-2" :class="{'is-active':(!find_flg)}" @click="flag_reset">全て</button>
      <button class="border rounded px-2 py-2" :class="{'is-active':find_flg && (find_status == '作業前')}" @click="find('作業前')">作業前</button>
      <button class="border rounded px-2 py-2" :class="{'is-active':find_flg && (find_status == '作業中')}" @click="find('作業中')">作業中</button>
      <button class="border rounded px-2 py-2" :class="{'is-active':find_flg && (find_status == '完了')}" @click="find('完了')">完了</button>
    </div>
    <table class="mx-auto w-3/4">
      <thead>
        <tr class="border-b-2">
          <th class="px-4 py-2">タスク</th>
          <th class="px-4 py-2">登録日時</th>
          <th class="px-4 py-2">状態</th>
          <th class="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b" v-for="(item, index) in display_todos" :key="index">
          <td class="px-4 py-2">{{ item.content }}</td>
          <td class="px-4 py-2">{{ item.created }}</td>
          <td class="px-4 py-2">
            <button @click="changeStatus(item)">{{ item.status }}</button>
          </td>
          <td class="px-4 py-2"><button @click="remove(item)">削除</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      content: '',
      find_status:'',
      find_flg: false
    }
  },
    computed: {
      // todos() {
      //   return this.$store.state.todos
      // }
      ...mapGetters(['todos']),
      display_todos(){
        if(this.find_flg){
          let arr = []
          let rec = this.todos
          rec.forEach(element => {
            if(element.status == this.find_status){
              arr.push(element)
            }
          });
          return arr
        } else {
          return this.todos
        }
      }
    },
  methods: {
    ...mapActions(['insertActions', 'removeActions', 'changeStatusActions']),
    insert() {
      if(this.content != ''){
        // this.$store.commit('insert', {content: this.content})
        // this.$store.dispatch('insertActions', {content: this.content})
        this.insertActions({content: this.content})
        this.content = ''
      }
    },
    remove(item) {
      // this.$store.commit('remove', item)
      // this.$store.dispatch('removeActions', item)
      this.removeActions(item)
    },
    // ３番目のボタンで３つのオブジェクトが帰ってくる
    changeStatus(item){
      // this.$store.commit('changeStatus',item)
      // this.$store.dispatch('changeStatusActions', item)
      this.changeStatusActions(item)
    },
    find(findStatus) {
      this.find_status = findStatus
      this.find_flg = true
    },
    flag_reset() {
      this.find_flg = false
    }
  },
}
</script>

<style>
.is-acitve {
  font-size: bold;
}
</style>
