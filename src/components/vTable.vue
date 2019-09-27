
<script lang="ts">
import { CreateElement, VNode } from 'vue';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class VTable extends Vue {
    @Prop({ default: [] })
    private columns!: any[];
    private currentColumns: any[] = [];

    // 原始数据
    @Prop({ default: [] })
    private data!: any[];
    private currentData: any[] = [];

    private render(h: CreateElement): VNode{
        const ths: any[] = [];
        const trs: any[] = [];  // 二维数组
        this.currentColumns.forEach((col, index) => {
            if (col.sortable){
                ths.push(h('th', [
                    h('span', col.title),
                    // 升序
                    h('a', {
                        class: { on: col._sortType === 'asc' },
                        on: { click: () => this.handleSortByAsc(index) }
                    }, '👆'),
                    // 降序
                    h('a', {
                        class: { on: col._sortType === 'desc' },
                        on: { click: () => this.handleSortByDesc(index) }
                    }, '👇'),
                ]));
            } else {
                ths.push(h('th', col.title));
            }
        });
        this.currentData.forEach((row) => {
            const tds: any[] = [];
            this.currentColumns.forEach((cell) => tds.push(h('td', row[cell.key])));
            trs.push(h('tr', tds));
        });
        return h('table', [
            h('thead', [h('tr', ths)]),
            h('tbody', trs),
        ]);
    }

    private makeColumns(){
        this.currentColumns = this.columns.map((col, index) => {
            // 添加一个字段标识当前列排序的状态，后续使用
            col._sortType = 'normal';
            // 添加一个字段标识当前列在数组中的索引，后续使用
            col._index = index;
            return col;
        });
    }
    private makeData(){
        this.currentData = this.data.map((row, index) => {
            // 添加一个字段标识当前列在数组中的索引，后续使用
            row._index = index;
            return row;
        });
    }

    private mounted(){
        this.makeColumns();
        this.makeData();
    }

    private handleSortByAsc(index: number){
        this.handleSort(index, 'asc');
    }
    private handleSortByDesc(index: number){
        this.handleSort(index, 'desc');
    }

    private handleSort(index: number, sortType: string){
        const key = this.currentColumns[index].key;
        this.currentColumns.forEach((col) => col._sortType = 'normal');
        this.currentColumns[index]._sortType = sortType;
        const factor = (sortType === 'asc') ? 1 : -1;
        this.currentData.sort((a, b) => factor * (a[key] > b[key] ? 1 : -1));
        console.log('handleSort');
    }

    @Watch('data')
    private onDataChanged(){
        this.makeData();
        const sortedColumn = this.currentColumns.filter((col) => col._sortType !== 'normal');
        
        if (sortedColumn.length > 0){
            this.handleSort(sortedColumn[0]._index, sortedColumn[0]._sortType);
        }
    }
}
</script>

<style>
    table{
        width: 100;
        margin-bottom: 24px;
        border-collapse: collapse;
        border-spacing: 0;
        empty-cells: show;
        border: 1px solid #e9e9e9;
    }
    table th{
        background: #f7f7f7;
        color: #5c6b77;
        font-weight: 600;
        white-space: nowrap;
    }
    table td, table th{
        padding: 8px 16px;
        border: 1px solid #e9e9e9;
        text-align: left;
    }
    table th a{
        display: inline-block;
        margin: 0 4px;
        cursor: pointer;
    }
    table th a.on{
        color: #3399ff;
    }
    table a:hover{
        color: #3399ff;
    }
</style>
