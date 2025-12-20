import { Option } from '../types';
type __VLS_Props = {
    title: string;
    options: Option[];
    color?: string;
    mobileMaxSize?: number;
    width?: string;
    bounceOnMount?: boolean;
};
type __VLS_PublicProps = {
    modelValue: string | number;
} & __VLS_Props;
declare const _default: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: string | number) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string | number) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    wheel: HTMLDivElement;
}, HTMLDivElement>;
export default _default;
