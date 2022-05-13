import { defineConfig } from 'umi';
import basis from 'src/pages/basis';
const ss = () => {
    {
        styles: [`body { color: red; }`, `https://a.com/b.css`];
    }
};
export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    routes: [
        { path: '/', component: '@/pages/index' },
    ],
    fastRefresh: {},
    styles: basis,
});
//# sourceMappingURL=.umirc.js.map