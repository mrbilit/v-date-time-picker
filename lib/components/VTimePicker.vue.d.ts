type DateLike = Date | string;
interface Props {
    modelValue?: DateLike;
    title?: string;
    submitTitle?: string;
    color?: string;
    modal?: boolean;
    showModal?: boolean;
    hourTitle?: string;
    minuteTitle?: string;
    bounceOnMount?: boolean;
}
type __VLS_Props = Props;
type __VLS_PublicProps = {
    modelValue?: DateLike;
    "showModal"?: boolean;
} & __VLS_Props;
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        header?(_: {}): any;
        submit?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    submit: () => any;
    "update:modelValue": (value: DateLike) => any;
    "update:showModal": (value: boolean) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    onSubmit?: (() => any) | undefined;
    "onUpdate:modelValue"?: ((value: DateLike) => any) | undefined;
    "onUpdate:showModal"?: ((value: boolean) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
