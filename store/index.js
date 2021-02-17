export const state = () => ({
  todos:[
    {
      content: 'テスト',
      created: '2020-04-30 17:00',
      status: '作業前'
    },
    {
      content: 'コーディング',
      created: '2020-05-01 16:00',
      status: '作業中'
    },
    {
      content: '環境構築',
      created: '2020-05-03 15:00',
      status: '作業前'
    },
  ],
  option:[
    {id:0, label:'作業前'},
    {id:1, label:'作業中'},
    {id:2, label:'完了'}
  ]
})

export const getters = {
  todos(state){
    return state.todos
  }
}

export const mutations = {
  insert(state, obj){
    var d = new Date()
    var fmt = d.getFullYear() + '-' + ('00' + (d.getMonth() + 1)).slice(-2) + '-' + ('00' + d.getDate()).slice(-2) +  ' ' + ('00' + d.getHours()).slice(-2) + ':'+ ('00' + d.getMinutes()).slice(-2)
    // slice(-2)で後ろから２つ要素を取り出す
    state.todos.unshift({
      content: obj.content,
      created: fmt,
      status: '作業前'
    })
  },
  remove(state, obj){
    for(let i = 0; i < state.todos.length; i++){
      const ob = state.todos[i]
      if(ob.content == obj.content && ob.created == obj.created){
        alert(`タスク名「${obj.content}」を削除します。`)
        state.todos.splice(i, 1)
        // i番目オブジェクトの１個の要素を取り出して配列にする。
        return
      }
    }
  },
  changeStatus(state, obj){
    for(let i = 0; i < state.todos.length; i++){
      const ob = state.todos[i]
      if(ob.content == obj.content && ob.created == obj.created && ob.status == obj.status){
        let nowStatus
        for(let j = 0; j < state.option.length; j++){
          // ==になってないとエラーになる
          if(state.option[j].label == ob.status){
            nowStatus = state.option[j].id
            console.log(nowStatus)
          }
        }
        nowStatus++
        if(nowStatus >= state.option.length){
          nowStatus = 0
        }
        obj.status = state.option[nowStatus].label
        return
      }
    }
  }
}

export const actions = {
  insertActions({commit}, obj) {
    commit('insert', obj)
  },
  removeActions({commit}, obj) {
    commit('remove', obj)
  },
  changeStatusActions({commit}, obj) {
    commit('changeStatus', obj)
  }
}
