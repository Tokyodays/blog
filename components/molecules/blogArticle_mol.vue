<template>
  <article class="">
    <template v-if="currentPost">
      <header class="relative">
        <picture>
          <source type="image/webp" :srcset="`${setEyeCatch(currentPost.fields.headerImage).url}?fit=fill&w=460&fm=webp`">
          <img class="w-full h-full absolute object-cover cover-image"
            :src="setEyeCatch(currentPost.fields.headerImage).url"
            :alt="setEyeCatch(currentPost.fields.headerImage).title"
            loading="lazy"
          />
        </picture>
        <div class="flex flex-col justify-between p-6 md:p-24 h-auto md:h-screen">
          <div>
            <p class="text-white"><nuxt-link to="/"><arrow-left-circle-icon size="3x" class="icon"></arrow-left-circle-icon></nuxt-link></p>
          </div>
          <div>
            <div class="mt-24 md:mt-auto pl-0 md:pl-6 md:border-l-4 md:border-white text-white mb-8 palt leading-normal">
              <h1 class="text-3xl md:text-5xl font-bold mb-4">{{ currentPost.fields.title }}</h1>
              <h2 class="text-2xl md:text-3xl font-normal">{{ currentPost.fields.subtitle }}</h2>
            </div>
            <p class="mb-2 text-white text-base">
              <clock-icon size="1x" class="inline-block align-text-bottom"></clock-icon> <time :datetime="$moment(currentPost.fields.publishedAt).format('YYYY-MM-DD hh:mm:ss')" class="mr-4" v-text="$moment(currentPost.fields.publishedAt).format('YYYY / MM / DD - hh : mm')"></time>
              <refresh-cw-icon size="1x" class="inline-block align-text-bottom"></refresh-cw-icon> <time :datetime="$moment(currentPost.fields.modifiedAt).format('YYYY-MM-DD hh:mm:ss')" v-text="$moment(currentPost.fields.modifiedAt).format('YYYY / MM / DD - hh : mm')"></time>
            </p>
            <p><span :is="draftChip(currentPost)" /></p>
            <p class="mb-16 text-white text-lg">
              <span class="mr-4"><folder-icon size="1x" class="icon"></folder-icon> {{ currentPost.fields.category.fields.name }}</span>
              <template v-if="currentPost.fields.tags">
                <span class="mr-2"
                  v-for="(tag) in currentPost.fields.tags"
                  :key="tag.sys.id"
                >
                  <tag-icon size="1x" class="icon" ></tag-icon> {{ tag.fields.name }}
                </span>
              </template>
            </p>
            <p class="text-white text-lg">
              <span class="border-t-2 border-white pt-8 border-dotted"><pen-tool-icon size="1x" class="icon"></pen-tool-icon> Written by {{ currentPost.fields.author.fields.name }}</span>
            </p>
          </div>
        </div>
      </header>
      <main class="container md:mx-auto markdown my-16 px-6 md:px-24" >
        <share-buttons :title="currentPost.fields.title" :tags="currentPost.fields.tags" :category="currentPost.fields.category.fields.name" />
        <p>{{ currentPost.fields.description }}</p>
        <div v-html="$md.render(currentPost.fields.body)"></div>
        <p><nuxt-link to="/"><arrow-left-circle-icon size="1x" class="icon"></arrow-left-circle-icon> top</nuxt-link></p>
      </main>
    </template>

    <template v-else>
      お探しの記事は見つかりませんでした。
    </template>

    
  </article>
</template>

<script>
import { mapGetters } from 'vuex'
import draftChip from '~/components/atoms/draftChip_atom'
import shareButtons from '~/components/atoms/shareButtons_atom'

import { TagIcon, FolderIcon, ClockIcon, RefreshCwIcon, PenToolIcon, ArrowLeftCircleIcon } from 'vue-feather-icons'

export default {
  props: {
    currentPost: {
      type: Object,
      required: true,
    }
  },
  components: {
    draftChip,
    TagIcon,
    FolderIcon, 
    ClockIcon, 
    RefreshCwIcon, 
    PenToolIcon,
    ArrowLeftCircleIcon,
    shareButtons
  },
    data: function() {
    return {
      title: 'sns-widget'
    }
  },
  computed: {
    ...mapGetters(['setEyeCatch', 'draftChip', 'linkTo', 'categoryColor'])
  }
}
</script>

<style lang="scss">
.icon {
  @apply inline-block align-text-bottom
}
.cover-image {
  z-index: -1;
  filter: brightness(40%) grayscale(50%) saturate(0%);
}
.palt {
  font-feature-settings: "palt";
  letter-spacing: .1em;
}

/* purgecss start ignore */
/* Markdown Styles */
/* Global */
.markdown {
  @apply leading-relaxed text-lg;
  font-feature-settings: "palt";
  letter-spacing: .1em;

  .table-of-contents {
    background: #f3f3f3;
    border: 1px solid #ccc;
    padding: 10px 20px;
    width: fit-content;
    margin: 3rem 0;
    ul {
      padding-left: 24px;
      margin-left: 0;
    }
    &:before {
      content: 'index';
      font-weight: bold;
      font-size: 16px;
    }
  }

  a.button {
    &:before {
      content: "";
      display: inline-block;
      vertical-align: middle;
      color: #fff;
      line-height: 1;
      width: 8px;
      height: 8px;
      border: 1px solid currentColor;
      border-left: 0;
      border-bottom: 0;
      box-sizing: border-box;
      transform: translateX(0%) rotate(45deg);
      margin-right: 0.5em;
      margin-bottom: 2px;
    }
    @apply font-normal py-3 px-6 rounded items-center;
    img {
      display: inline-block;
    }
    &:link, &:visited {
      text-decoration: none;
    }
    &:hover {
      text-decoration: none;
      opacity: 0.8;
    }
  }
  a.button_tabelog {
    background-color: #fa0;
    color: #fff;
  }
  a.button_gnavi {
    background-color: #dc0012;
    color: #fff;
  }
  
}
/* Headers */
.markdown h1 {
  @apply text-4xl mt-24 mb-12 font-bold text-indigo-800;
}
.markdown h2 {
  @apply text-3xl mt-16 mb-8 font-bold text-gray-700;
}
.markdown h3 {
  @apply text-2xl mt-12 mb-6 font-bold text-gray-800;
}
.markdown h4,
.markdown h5,
.markdown h6 {
  @apply text-xl mt-6 mb-3 font-semibold;
}
/* Links */
.markdown a {
  @apply text-blue-600;
}
.markdown a:link,
.markdown a:visited {
  @apply underline;
}
.markdown a:hover {
  @apply no-underline;
}
/* Paragraph */
.markdown p {
  @apply mb-8 leading-relaxed;
}
/* Lists */
.markdown ul,
.markdown ol {
  @apply mb-4 ml-8;
}
.markdown li > p,
.markdown li > ul,
.markdown li > ol {
  @apply mb-0;
}
.markdown ol {
  @apply list-decimal;
}
.markdown ul {
  @apply list-disc;
}
/* Blockquotes */
.markdown blockquote {
  @apply p-0 p-2 mx-6 bg-gray-100 mb-4 border-l-4 border-gray-400 italic;
}
.markdown blockquote > p {
  @apply mb-0;
}
/* Tables */
.markdown td,
.markdown th {
  @apply px-2 py-1 border border-gray-400;
}
.markdown tr:nth-child(odd) {
  @apply bg-gray-100;
}
.markdown table {
  @apply mb-6;
}

.markdown pre {
  overflow-x: scroll;
  margin: 3rem 0;
  line-height:1.2em;
  background:linear-gradient(180deg,#f9f9f9 0,#f9f9f9 1.2em,#f3f3f3 0);
  background-size:2.4em 2.4em;
  background-origin:content-box;
  
  /* some extra styles*/
  padding:0 20px;
  text-align:justify;
  font-family:calibri,arial,sans-serif;
}
.markdown figure {
  @apply my-8 mx-auto;
  max-width: 640px;
  figcaption {
    @apply text-base mt-2 text-gray-700;
  }
}
</style>