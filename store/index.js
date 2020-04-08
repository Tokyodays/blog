import defaultEyeCatch from '~/assets/images/defaultImage.png'
// const {getConfigForKeys} = require('@/lib/config.js')
// const ctfConfig = getConfigForKeys([
//   'CTF_BLOG_POST_TYPE_ID',
//   'CTF_SPACE_ID',
//   'CTF_CDA_ACCESS_TOKEN',
//   'host'
// ])
// const {contentfulCreateClient} = require('@/plugins/contentful')
// const client = contentfulCreateClient(ctfConfig)

// 追記
export const state = () => ({
  posts: []
})

export const getters = {
  setEyeCatch: () => (headerImage) => {
    if (!!headerImage && !!headerImage.fields) return { url: `https:${headerImage.fields.file.url}`, title: headerImage.fields.title }
    else return { url: defaultEyeCatch, title: 'defaultImage' }
  },
  linkTo: () => (name, obj) => {
    return { name: `${name}-slug`, params: { slug: obj.fields.slug } }
  },
  draftChip: () => (post) => {
    if (!post.fields.publishedAt) return 'draftChip'
  }
}

export const mutations = {
}

export const actions = {

}

// // 追記
// export const mutations = {
//   setPosts(state, payload) {
//     state.posts = payload
//   }

// }

// // 追記
// export const actions = {
//     async getPosts({ commit }) {
//         return await client.getEntries({
//           content_type: process.env.CTF_BLOG_POST_TYPE_ID,
//             order: '-fields.publishedAt',
//         }).then(entries => {
//             commit('setPosts', entries.items)
//         })
//         .catch(console.error)
//     }
// }