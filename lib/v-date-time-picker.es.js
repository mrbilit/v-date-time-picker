import { defineComponent as H, createElementBlock as g, openBlock as S, createCommentVNode as Z, createElementVNode as x, toDisplayString as W, ref as V, onMounted as ee, onBeforeUnmount as te, normalizeClass as U, withModifiers as B, renderSlot as $, createVNode as E, normalizeStyle as q, mergeModels as L, useModel as P, reactive as re, computed as h, watch as N, nextTick as I, Fragment as ce, renderList as me, onBeforeMount as ve, createBlock as le, withCtx as z } from "vue";
import oe from "jalali-plugin-dayjs";
import b from "dayjs";
const fe = { class: "header-container" }, ye = {
  key: 0,
  class: "button"
}, he = { class: "title" }, be = /* @__PURE__ */ H({
  __name: "MainHeader",
  props: {
    title: {},
    showClose: { type: Boolean }
  },
  emits: ["close"],
  setup(e, { emit: m }) {
    const l = m;
    return (u, a) => (S(), g("div", fe, [
      e.showClose ? (S(), g("div", ye)) : Z("", !0),
      x("div", he, W(e.title), 1),
      e.showClose ? (S(), g("div", {
        key: 1,
        class: "button close",
        onClick: a[0] || (a[0] = (d) => l("close"))
      })) : Z("", !0)
    ]));
  }
}), G = (e, m) => {
  const l = e.__vccOpts || e;
  for (const [u, a] of m)
    l[u] = a;
  return l;
}, Me = /* @__PURE__ */ G(be, [["__scopeId", "data-v-8d89cc5d"]]), we = { class: "selects-container" }, ke = /* @__PURE__ */ H({
  __name: "PickerContainer",
  props: {
    title: {},
    submitTitle: {},
    color: {},
    modal: { type: Boolean },
    showModal: { type: Boolean }
  },
  emits: ["close", "submit"],
  setup(e, { emit: m }) {
    const l = e, u = m, a = V();
    function d(r) {
      r.preventDefault();
    }
    return ee(() => {
      l.modal && a.value && a.value.addEventListener("wheel", d);
    }), te(() => {
      l.modal && a.value && a.value.removeEventListener("wheel", d);
    }), (r, c) => (S(), g("div", {
      ref_key: "container",
      ref: a,
      class: U(["modal-container", { modal: e.modal, show: e.showModal }])
    }, [
      x("div", {
        class: "dialog-box-container",
        onClick: c[2] || (c[2] = B(() => {
        }, ["stop"]))
      }, [
        $(r.$slots, "header", {}, () => [
          E(Me, {
            title: e.title || "",
            showClose: e.modal,
            onClose: c[0] || (c[0] = (k) => u("close"))
          }, null, 8, ["title", "showClose"])
        ], !0),
        x("div", we, [
          $(r.$slots, "default", {}, void 0, !0)
        ]),
        $(r.$slots, "submit", {}, () => [
          x("button", {
            class: "submit-button",
            style: q({ background: e.color }),
            onClick: c[1] || (c[1] = (k) => u("submit", k))
          }, W(e.submitTitle), 5)
        ], !0)
      ]),
      x("div", {
        class: "container-mask",
        onClick: c[3] || (c[3] = (k) => u("close"))
      })
    ], 2));
  }
}), K = /* @__PURE__ */ G(ke, [["__scopeId", "data-v-190049ca"]]), Ve = { class: "title" }, p = 35, Te = /* @__PURE__ */ H({
  __name: "VWheelSelect",
  props: /* @__PURE__ */ L({
    title: {},
    options: {},
    color: { default: "#188EF2" },
    mobileMaxSize: { default: 768 },
    width: { default: "" },
    bounceOnMount: { type: Boolean }
  }, {
    modelValue: { required: !0 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const m = P(e, "modelValue"), l = V(), u = V(), a = V(!1), d = V(!1), r = V(!1), c = re({ top: 0, y: 0 }), k = h(() => e.options.findIndex((w) => w.key === m.value)), v = (w, s = !0) => {
      if (!l.value) return;
      const O = e.options.findIndex((A) => A.key === w) * p;
      s ? l.value.scrollTo({ top: O, behavior: "auto" }) : (d.value = !0, a.value = !1, I(() => {
        l.value && l.value.scrollTo({ top: O, behavior: "auto" }), I(() => {
          a.value = !0, d.value = !1;
        });
      }));
    }, f = () => {
      if (!d.value && l.value) {
        const w = Math.round(l.value.scrollTop / p), s = e.options[w];
        s && m.value !== s.key && (m.value = s.key), u.value && clearTimeout(u.value), u.value = globalThis.setTimeout(() => {
          s && v(s.key);
        }, 200);
      }
    }, i = (w) => {
      if (l.value) {
        const s = w.clientY - c.y;
        l.value.scrollTop = c.top - 3 * s;
      }
    }, o = () => {
      d.value = !1, document.removeEventListener("mousemove", i), document.removeEventListener("mouseup", o), f();
    }, M = (w) => {
      l.value && (d.value = !0, c.top = l.value.scrollTop, c.y = w.clientY, document.addEventListener("mousemove", i), document.addEventListener("mouseup", o));
    }, F = () => {
      l.value && l.value.addEventListener("mousedown", M);
    };
    return N(
      () => e.options,
      () => {
        I(() => f());
      }
    ), N(m, (w) => {
      v(w, !1);
    }), ee(() => {
      v(m.value), I(() => {
        a.value = !0;
      }), window.innerWidth > e.mobileMaxSize && F(), e.bounceOnMount && (r.value = !0, setTimeout(() => {
        r.value = !1;
      }, 1e3));
    }), te(() => {
      l.value && l.value.removeEventListener("mousedown", M), document.removeEventListener("mousemove", i), document.removeEventListener("mouseup", o);
    }), (w, s) => (S(), g("div", {
      class: U(["wheel-select-container", { dragging: d.value }]),
      style: q({ width: e.width }),
      onClick: s[2] || (s[2] = B(() => {
      }, ["stop"])),
      onScroll: s[3] || (s[3] = B(() => {
      }, ["stop"])),
      onWheel: s[4] || (s[4] = B(() => {
      }, ["prevent"]))
    }, [
      x("div", Ve, W(e.title), 1),
      x("div", {
        class: "select-container",
        onWheel: s[1] || (s[1] = B(() => {
        }, ["prevent"]))
      }, [
        x("div", {
          ref_key: "wheel",
          ref: l,
          class: U(["options-list", { smooth: a.value && !d.value, animated: r.value }]),
          onScroll: f,
          onWheel: s[0] || (s[0] = B(() => {
          }, ["stop"]))
        }, [
          s[5] || (s[5] = x("div", { class: "option empty" }, null, -1)),
          (S(!0), g(ce, null, me(e.options, (j, O) => (S(), g("div", {
            key: j.key,
            style: q({ color: e.color }),
            class: U(["option", {
              after: O > k.value,
              before: O < k.value
            }])
          }, W(j.title), 7))), 128)),
          s[6] || (s[6] = x("div", { class: "option empty" }, null, -1))
        ], 34)
      ], 32)
    ], 38));
  }
}), Y = /* @__PURE__ */ G(Te, [["__scopeId", "data-v-6cb99fd3"]]), _ = {
  fa: {
    day: "روز",
    month: "ماه",
    year: "سال",
    months: [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند"
    ]
  },
  en: {
    day: "day",
    month: "month",
    year: "year",
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  }
};
b.extend(oe);
const J = (e, m, l, u) => {
  let a = e || /* @__PURE__ */ new Date();
  u && b(a).isBefore(u) && (a = u), l && b(a).isAfter(l) && (a = l);
  const d = m ? "jalali" : "gregory";
  if (console.log(e), !e && u) {
    const v = b(u).calendar(d), f = b(a).calendar(d).set("year", v.year() + 1).set("month", 0).set("date", 1);
    f.isBefore(u) || (a = f.toDate());
  }
  const r = b(a).calendar(d).year(), c = b(a).calendar(d).month(), k = b(a).calendar(d).date();
  return {
    selectedYear: r,
    selectedMonth: c,
    selectedDay: k,
    calendar: d
  };
}, De = /* @__PURE__ */ H({
  __name: "VDatePicker",
  props: /* @__PURE__ */ L({
    value: {},
    title: {},
    submitTitle: {},
    jalali: { type: Boolean },
    color: { default: "#188EF2" },
    modal: { type: Boolean },
    yearThreshold: { default: 100 },
    locale: {},
    minDate: {},
    maxDate: {},
    mobileMaxSize: { default: 768 },
    bounceOnMount: { type: Boolean }
  }, {
    modelValue: { default: null },
    modelModifiers: {},
    showModal: { type: Boolean },
    showModalModifiers: {}
  }),
  emits: /* @__PURE__ */ L(["submit"], ["update:modelValue", "update:showModal"]),
  setup(e, { emit: m }) {
    b.extend(oe);
    const l = m, u = P(e, "modelValue"), a = P(e, "showModal"), {
      selectedYear: d,
      selectedMonth: r,
      selectedDay: c,
      calendar: k
    } = J(u.value || "", e.jalali, e.maxDate, e.minDate), v = V(d), f = V(r), i = V(c), o = V(k), M = V([]), F = h(() => e.title ? e.title : e.jalali ? "انتخاب تاریخ" : "Choose date"), w = h(() => e.submitTitle ? e.submitTitle : e.jalali ? "تایید" : "submit"), s = h(() => e.locale ? e.locale : e.jalali ? _.fa : _.en), j = h(() => s.value.day), O = h(() => s.value.month), A = h(() => s.value.year), T = h(() => {
      if (e.maxDate) {
        const n = b(e.maxDate).calendar(o.value);
        return {
          year: n.year(),
          month: n.month(),
          day: n.date()
        };
      }
      return null;
    }), D = h(() => {
      if (e.minDate) {
        const n = b(e.minDate).calendar(o.value);
        return {
          year: n.year(),
          month: n.month(),
          day: n.date()
        };
      }
      return null;
    }), Q = h(
      () => v.value === T.value?.year
    ), ae = h(
      () => Q.value && f.value === T.value?.month
    ), R = h(
      () => v.value === D.value?.year
    ), ne = h(
      () => R.value && f.value === D.value?.month
    ), ue = h(() => {
      let n = s.value.months.map((t, y) => ({ title: t, key: y }));
      return T.value && Q.value && (n = n.filter(
        (t) => T.value && t.key <= T.value.month
      )), D.value && R.value && (n = n.filter(
        (t) => D.value && t.key >= D.value.month
      )), n;
    }), ie = h(() => {
      const n = b().calendar(o.value).year(v.value).month(f.value).daysInMonth();
      let t = Array.from({ length: n }, (y, C) => ({
        title: `${C + 1}`,
        key: C + 1
      }));
      return T.value && ae.value && (t = t.filter(
        (y) => T.value && Number(y.key) <= T.value.day
      )), D.value && ne.value && (t = t.filter(
        (y) => D.value && Number(y.key) >= D.value.day
      )), t;
    });
    N(
      () => e.jalali,
      (n) => {
        const {
          selectedYear: t,
          selectedMonth: y,
          selectedDay: C,
          calendar: de
        } = J(
          b().calendar(o.value).year(v.value).month(f.value).date(i.value).toDate(),
          n,
          e.maxDate,
          e.minDate
        );
        v.value = t, f.value = y, i.value = C, o.value = de, X();
      }
    ), N(
      u,
      (n) => {
        const {
          selectedYear: t,
          selectedMonth: y,
          selectedDay: C
        } = J(n || "", e.jalali, e.maxDate, e.minDate);
        v.value = t, f.value = y, I(() => {
          i.value = C;
        });
      }
    );
    const X = () => {
      let n = [];
      for (let t = v.value - e.yearThreshold; t <= v.value + e.yearThreshold; t++)
        n.push({
          title: `${t}`,
          key: t
        });
      T.value && (n = n.filter(
        (t) => T.value && +t.key <= T.value.year
      )), D.value && (n = n.filter(
        (t) => D.value && +t.key >= D.value.year
      )), M.value = n;
    }, se = (n) => {
      const t = b().calendar(o.value).year(v.value).month(f.value).date(i.value);
      typeof u.value == "string" ? u.value = t.toISOString() : u.value = t.toDate(), l("submit", n);
    };
    return ve(() => {
      X();
    }), (n, t) => (S(), le(K, {
      title: F.value,
      submitTitle: w.value,
      color: e.color,
      modal: e.modal,
      showModal: a.value,
      onClose: t[3] || (t[3] = (y) => a.value = !1),
      onSubmit: se
    }, {
      header: z(() => [
        $(n.$slots, "header")
      ]),
      submit: z(() => [
        $(n.$slots, "submit")
      ]),
      default: z(() => [
        E(Y, {
          modelValue: i.value,
          "onUpdate:modelValue": t[0] || (t[0] = (y) => i.value = y),
          class: "select",
          title: j.value,
          options: ie.value,
          color: e.color,
          mobileMaxSize: e.mobileMaxSize,
          bounceOnMount: e.bounceOnMount
        }, null, 8, ["modelValue", "title", "options", "color", "mobileMaxSize", "bounceOnMount"]),
        E(Y, {
          modelValue: f.value,
          "onUpdate:modelValue": t[1] || (t[1] = (y) => f.value = y),
          class: "select",
          title: O.value,
          options: ue.value,
          color: e.color,
          width: "30%",
          mobileMaxSize: e.mobileMaxSize,
          bounceOnMount: e.bounceOnMount
        }, null, 8, ["modelValue", "title", "options", "color", "mobileMaxSize", "bounceOnMount"]),
        E(Y, {
          modelValue: v.value,
          "onUpdate:modelValue": t[2] || (t[2] = (y) => v.value = y),
          class: "select",
          title: A.value,
          options: M.value,
          color: e.color,
          mobileMaxSize: e.mobileMaxSize,
          bounceOnMount: e.bounceOnMount
        }, null, 8, ["modelValue", "title", "options", "color", "mobileMaxSize", "bounceOnMount"])
      ]),
      _: 3
    }, 8, ["title", "submitTitle", "color", "modal", "showModal"]));
  }
}), xe = /* @__PURE__ */ H({
  __name: "VTimePicker",
  props: /* @__PURE__ */ L({
    modelValue: {},
    title: { default: "Choose Time" },
    submitTitle: { default: "submit" },
    color: { default: "#188EF2" },
    modal: { type: Boolean },
    showModal: { type: Boolean },
    hourTitle: { default: "hour" },
    minuteTitle: { default: "minute" },
    bounceOnMount: { type: Boolean }
  }, {
    modelValue: { default: "00:00" },
    modelModifiers: {},
    showModal: { type: Boolean },
    showModalModifiers: {}
  }),
  emits: /* @__PURE__ */ L(["submit"], ["update:modelValue", "update:showModal"]),
  setup(e, { emit: m }) {
    const l = m, u = P(e, "modelValue"), a = P(e, "showModal"), d = V(0), r = V(0), c = h(() => {
      const i = [];
      for (let o = 0; o <= 59; o++)
        i.push({
          title: `${o < 10 ? "0" : ""}${o}`,
          key: o
        });
      return i;
    }), k = h(() => {
      const i = [];
      for (let o = 0; o <= 23; o++)
        i.push({
          title: `${o < 10 ? "0" : ""}${o}`,
          key: o
        });
      return i;
    }), v = (i) => {
      if (typeof i == "string") {
        const [o, M] = i.split(":");
        d.value = Number(o), r.value = Number(M);
      } else i instanceof Date && (d.value = b(i).hour(), r.value = b(i).minute());
    }, f = () => {
      if (typeof u.value == "string") {
        const i = k.value.find((M) => M.key === d.value)?.title, o = c.value.find((M) => M.key === r.value)?.title;
        u.value = `${i}:${o}`;
      } else
        u.value = b(u.value).hour(d.value).minute(r.value).toDate();
      l("submit");
    };
    return N(
      u,
      (i) => {
        v(i);
      },
      { immediate: !0 }
    ), (i, o) => (S(), le(K, {
      title: e.title,
      submitTitle: e.submitTitle,
      color: e.color,
      modal: e.modal,
      showModal: a.value,
      onClose: o[2] || (o[2] = (M) => a.value = !1),
      onSubmit: f
    }, {
      header: z(() => [
        $(i.$slots, "header")
      ]),
      submit: z(() => [
        $(i.$slots, "submit")
      ]),
      default: z(() => [
        E(Y, {
          modelValue: d.value,
          "onUpdate:modelValue": o[0] || (o[0] = (M) => d.value = M),
          class: "select",
          title: e.hourTitle,
          options: k.value,
          color: e.color,
          bounceOnMount: e.bounceOnMount
        }, null, 8, ["modelValue", "title", "options", "color", "bounceOnMount"]),
        E(Y, {
          modelValue: r.value,
          "onUpdate:modelValue": o[1] || (o[1] = (M) => r.value = M),
          class: "select",
          title: e.minuteTitle,
          options: c.value,
          color: e.color,
          bounceOnMount: e.bounceOnMount
        }, null, 8, ["modelValue", "title", "options", "color", "bounceOnMount"])
      ]),
      _: 3
    }, 8, ["title", "submitTitle", "color", "modal", "showModal"]));
  }
}), Se = {
  VDatePicker: De,
  VTimePicker: xe,
  VWheelSelect: Y,
  PickerContainer: K
};
function Oe(e) {
  Object.entries(Se).forEach(([m, l]) => {
    e.component(m, l);
  });
}
const Be = { install: Oe };
export {
  K as PickerContainer,
  De as VDatePicker,
  xe as VTimePicker,
  Y as VWheelSelect,
  Be as default
};
