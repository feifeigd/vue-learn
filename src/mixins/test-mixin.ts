import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class TestMixin extends Vue {
    protected testMixinArg = 'this is test mixin arg';
}
