<template>
    <div id="tags-view-container" class="tags-view-container">
        <!-- 滚动区域 -->
        <scroll-pane ref="scrollPane" class="tags-view-wrapper">
            <!-- 每个标签都可以弹出右键菜单 -->
            <router-link v-for="tag in visitedViews" ref="tag" :key="tag.path" :class="isActive(tag) ? 'active' : ''" 
                :to="{path: tag.path, query: tag.query, fullPath: tag.fullPath}" tag="span" class="tags-view-item" 
                @click.middle.native="isAffix(tag) || closeSelectedTag(tag)" @contextmenu.prevent.native="openMenu(tag, $event)">
                <!-- tag显示标题 -->
                {{$t('route.' + tag.meta.title)}} 
                <!-- 关闭按钮，`首页`不显示关闭按钮 -->
                <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"/>
            </router-link>
        </scroll-pane>
        <!-- 显示右键菜单 -->
        <ul v-show="visible" :style="{left: left + 'px', top: top + 'px'}" class="contextmenu">
            <!-- 刷新 -->
            <li @click="refreshSelectedTag(selectedTag)">{{$t('tagsView.refresh')}}</li>
            <!-- 关闭 -->
            <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">{{$t('tagsView.close')}}</li>
            <!-- 关闭其他 -->
            <li @click="closeOthersTags">{{$t('tagsView.closeOthers')}}</li>
            <!-- 关闭所有 -->
            <li @click="closeAllTags(selectedTag)">{{$t('tagsView.closeAll')}}</li>
        </ul>        
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import path from 'path'; // @types/node
import { PermissionModule } from '@/store/modules/permission';
import { RouteConfig } from 'vue-router';
import ScrollPane from './ScrollPane.vue';
import { TagsViewModule, ITagView } from '@/store/modules/tags-view';

@Component({
    components: {
        ScrollPane,
    }
})
export default class TagsView extends Vue {
    // 是否显示右键菜单
    private visible: boolean = false;
    /// 鼠标右键位置
    private top: number = 0;
    private left: number = 0;

    /// 当前鼠标右键所在的tag
    private selectedTag: ITagView = {};
    private affixTags: ITagView[] = [];

    get visitedViews(){
        return TagsViewModule.visitedViews;
    }

    get routes(){
        return PermissionModule.routes;
    }

    @Watch('$route')
    private onRouteChange(){
        this.addTags();
        this.moveToCurrentTag();
    }

    /// 点击右键菜单区域外部，关闭右键菜单
    @Watch('visible')
    private onVisibleChange(value: boolean){
        if (value) {
            document.body.addEventListener('click', this.closeMenu);
        } else {
            document.body.removeEventListener('click', this.closeMenu);
        }
    }

    private mounted(){
        this.initTags();
        this.addTags();
    }

    /// 当前显示的tag
    private isActive(route: ITagView){
        return route.path === this.$route.path;
    }

    /// 不能关闭的tag
    isAffix(tag: ITagView){
        return tag.meta && tag.meta.affix;
    }

    /// 查找所有不能关闭的tag，包含子路由
    private filterAffixTags(routes: RouteConfig[], basePath = '/'){
        let tags: ITagView[] = [];
        routes.forEach((route) => {
            if (route.meta && route.meta.affix) {
                const tagPath = path.resolve(basePath, route.path);
                // const tagPath = basePath + '/' + route.path;
                tags.push({
                    fullPath: tagPath,
                    path: tagPath,
                    name: route.name,
                    meta: {...route.meta}
                })
            }
            if(route.children){
                const childTags = this.filterAffixTags(route.children, route.path);
                if(childTags.length > 0){
                    tags = [...tags, ...childTags];
                }
            }
        });
        return tags;
    }

    private initTags(){
        this.affixTags = this.filterAffixTags(this.routes);
        for (const tag of this.affixTags){
            // Must have tag name
            if (tag.name){
                TagsViewModule.addVisitedView(tag); // 不能关闭的，全部添加到这里
            }
        }
    }

    /// 添加当前tag
    private addTags(){
        const { name } = this.$route;
        if (name){
            TagsViewModule.addView(this.$route);
        }
        return false;
    }

    private moveToCurrentTag(){
        const tags = this.$refs.tag as any[];   // TODO: better typescript support for route-link
        this.$nextTick(() => {
            for (const tag of tags){
                if ((tag.to as ITagView).path === this.$route.path) {
                    (this.$refs.scrollPane as ScrollPane).moveToTarget(tag as any);
                    // When query is different then update
                    if ((tag.to as ITagView).fullPath !== this.$route.fullPath) {
                        TagsViewModule.updateVisitedView(this.$route);
                    }
                    break;
                }
            }
        });
    }

    /// 刷新
    private refreshSelectedTag(view: ITagView){
        TagsViewModule.delCachedView(view);
        const { fullPath } = view;
        this.$nextTick(() => this.$router.replace({ path: '/redirect' + fullPath }));
    }

    /// 关闭
    private closeSelectedTag(view: ITagView){
        TagsViewModule.delView(view);
        if (this.isActive(view)){
            this.toLastView(TagsViewModule.visitedViews, view);
        }
    }

    /// 关闭其他
    private closeOthersTags(){
        this.selectedTag.fullPath && this.$router.push(this.selectedTag.fullPath);  // 路由跳转到当前tag
        TagsViewModule.delOthersViews(this.selectedTag);
        this.moveToCurrentTag();
    }

    private closeAllTags(view: ITagView){
        TagsViewModule.delAllViews();
        if(this.affixTags.some((tag) => tag.path === this.$route.path)){
            return;
        }
        this.toLastView(TagsViewModule.visitedViews, view);
    }

    /// 显示最有一个页面
    private toLastView(visitedViews: ITagView[], view: ITagView){
        const lastestView = visitedViews.slice(-1)[0];
        if(lastestView && lastestView.fullPath){
            this.$router.push(lastestView.fullPath);
        } else {
            // Default redirect to the home page if there is no tags-view, adjust it if you want
            if(view.name === 'Dashboard') {
                // to reload home page
                this.$router.replace({path: '/redirect' + view.fullPath });
            } else {
                this.$router.push('/');
            }
        }
    }

    /// 右键菜单
    private openMenu(tag: ITagView, e: MouseEvent){
        // 保存右键坐标
        const menuMinWidth = 105;
        const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
        const offsetWidth = (this.$el as HTMLElement).offsetWidth;  // container width
        const maxLeft = offsetWidth - menuMinWidth; // left boundary
        const left = e.clientX - offsetLeft + 15;   // 15: margin right
        if (left > maxLeft){
            this.left = maxLeft;
        } else {
            this.left = left;
        }
        this.top = e.clientY;
        // 显示右键菜单
        this.visible = true;
        this.selectedTag = tag;
    }

    /// 关闭右键菜单
    private closeMenu(){
        this.visible = false;
    }
}
</script>
<style lang="scss">
// Reset element css of el-icon-close
.tags-view-wrapper{
    .tags-view-item {
        .el-icon-close {
            width: 16px;
            height: 16px;
            vertical-align: 2px;
            border-radius: 50%;
            text-align: center;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            transform-origin: 100% 50%;

            &:before {
                transform: scale(0.6);
                display: inline-block;
                vertical-align: -3px;
            }
            &:hover{
                background-color: #b4bccc;
                color: #fff;
            }
        }
    }
}
</style>

<style lang="scss" scoped>
.tags-view-container {
    height: 34px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);

    .tags-view-wrapper {
        .tags-view-item {
            display: inline-block;
            position: relative;
            cursor: pointer;
            height: 26px;
            line-height: 26px;
            border: 1px solid #d8dce5;
            color: #495060;
            background: #fff;
            padding: 0 8px;
            font-size: 12px;
            margin-left: 5px;
            margin-top: 4px;

            &:first-of-type {
                margin-left: 15px;
            }

            &:last-of-type {
                margin-right: 15px;
            }

            &.active {
                background-color: #42b983;
                color: #fff;
                border-color: #42b983;

                &::before {
                    content: '';
                    background: #fff;
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    position: relative;
                    margin-right: 2px;
                }
            }
        }
    }

    .contextmenu {
        margin: 0;
        background: #fff;
        z-index: 3000;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);

        li {
            margin: 0;
            padding: 7px 16px;
            cursor: pointer;

            &:hover{
                background: #eee;
            }
        }
    }
}
</style>
