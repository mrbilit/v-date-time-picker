import { defineComponent as H, createElementBlock as $, openBlock as x, createCommentVNode as Z, createElementVNode as S, toDisplayString as W, ref as V, onMounted as ee, onBeforeUnmount as te, normalizeClass as U, withModifiers as B, renderSlot as g, createVNode as E, normalizeStyle as q, mergeModels as L, useModel as P, reactive as de, computed as b, watch as N, nextTick as I, Fragment as ce, renderList as me, onBeforeMount as ve, createBlock as le, withCtx as j } from "vue";
import oe from "jalali-plugin-dayjs";
import y from "dayjs";
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
  setup(e, { emit: f }) {
    const t = f;
    return (u, o) => (x(), $("div", fe, [
      e.showClose ? (x(), $("div", ye)) : Z("", !0),
      S("div", he, W(e.title), 1),
      e.showClose ? (x(), $("div", {
        key: 1,
        class: "button close",
        onClick: o[0] || (o[0] = (i) => t("close"))
      })) : Z("", !0)
    ]));
  }
}), G = (e, f) => {
  const t = e.__vccOpts || e;
  for (const [u, o] of f)
    t[u] = o;
  return t;
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
  setup(e, { emit: f }) {
    const t = e, u = f, o = V();
    function i(m) {
      m.preventDefault();
    }
    return ee(() => {
      t.modal && o.value && o.value.addEventListener("wheel", i);
    }), te(() => {
      t.modal && o.value && o.value.removeEventListener("wheel", i);
    }), (m, v) => (x(), $("div", {
      ref_key: "container",
      ref: o,
      class: U(["modal-container", { modal: e.modal, show: e.showModal }])
    }, [
      S("div", {
        class: "dialog-box-container",
        onClick: v[2] || (v[2] = B(() => {
        }, ["stop"]))
      }, [
        g(m.$slots, "header", {}, () => [
          E(Me, {
            title: e.title || "",
            showClose: e.modal,
            onClose: v[0] || (v[0] = (k) => u("close"))
          }, null, 8, ["title", "showClose"])
        ], !0),
        S("div", we, [
          g(m.$slots, "default", {}, void 0, !0)
        ]),
        g(m.$slots, "submit", {}, () => [
          S("button", {
            class: "submit-button",
            style: q({ background: e.color }),
            onClick: v[1] || (v[1] = (k) => u("submit", k))
          }, W(e.submitTitle), 5)
        ], !0)
      ]),
      S("div", {
        class: "container-mask",
        onClick: v[3] || (v[3] = (k) => u("close"))
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
    const f = P(e, "modelValue"), t = V(), u = V(), o = V(!1), i = V(!1), m = V(!1), v = de({ top: 0, y: 0 }), k = b(() => e.options.findIndex((w) => w.key === f.value)), d = (w, r = !0) => {
      if (!t.value) return;
      const O = e.options.findIndex((F) => F.key === w) * p;
      r ? t.value.scrollTo({ top: O, behavior: "auto" }) : (i.value = !0, o.value = !1, I(() => {
        t.value && t.value.scrollTo({ top: O, behavior: "auto" }), I(() => {
          o.value = !0, i.value = !1;
        });
      }));
    }, c = () => {
      if (!i.value && t.value) {
        const w = Math.round(t.value.scrollTop / p), r = e.options[w];
        r && f.value !== r.key && (f.value = r.key), u.value && clearTimeout(u.value), u.value = globalThis.setTimeout(() => {
          r && d(r.key);
        }, 200);
      }
    }, s = (w) => {
      if (t.value) {
        const r = w.clientY - v.y;
        t.value.scrollTop = v.top - 3 * r;
      }
    }, a = () => {
      i.value = !1, document.removeEventListener("mousemove", s), document.removeEventListener("mouseup", a), c();
    }, M = (w) => {
      t.value && (i.value = !0, v.top = t.value.scrollTop, v.y = w.clientY, document.addEventListener("mousemove", s), document.addEventListener("mouseup", a));
    }, A = () => {
      t.value && t.value.addEventListener("mousedown", M);
    };
    return N(
      () => e.options,
      () => {
        I(() => c());
      }
    ), N(f, (w) => {
      d(w, !1);
    }), ee(() => {
      d(f.value), I(() => {
        o.value = !0;
      }), window.innerWidth > e.mobileMaxSize && A(), e.bounceOnMount && (m.value = !0, setTimeout(() => {
        m.value = !1;
      }, 1e3));
    }), te(() => {
      t.value && t.value.removeEventListener("mousedown", M), document.removeEventListener("mousemove", s), document.removeEventListener("mouseup", a);
    }), (w, r) => (x(), $("div", {
      class: U(["wheel-select-container", { dragging: i.value }]),
      style: q({ width: e.width }),
      onClick: r[2] || (r[2] = B(() => {
      }, ["stop"])),
      onScroll: r[3] || (r[3] = B(() => {
      }, ["stop"])),
      onWheel: r[4] || (r[4] = B(() => {
      }, ["prevent"]))
    }, [
      S("div", Ve, W(e.title), 1),
      S("div", {
        class: "select-container",
        onWheel: r[1] || (r[1] = B(() => {
        }, ["prevent"]))
      }, [
        S("div", {
          ref_key: "wheel",
          ref: t,
          class: U(["options-list", { smooth: o.value && !i.value, animated: m.value }]),
          onScroll: c,
          onWheel: r[0] || (r[0] = B(() => {
          }, ["stop"]))
        }, [
          r[5] || (r[5] = S("div", { class: "option empty" }, null, -1)),
          (x(!0), $(ce, null, me(e.options, (Y, O) => (x(), $("div", {
            key: Y.key,
            style: q({ color: e.color }),
            class: U(["option", {
              after: O > k.value,
              before: O < k.value
            }])
          }, W(Y.title), 7))), 128)),
          r[6] || (r[6] = S("div", { class: "option empty" }, null, -1))
        ], 34)
      ], 32)
    ], 38));
  }
}), z = /* @__PURE__ */ G(Te, [["__scopeId", "data-v-6cb99fd3"]]), _ = {
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
y.extend(oe);
const J = (e, f, t, u) => {
  let o = e || /* @__PURE__ */ new Date();
  u && y(o).isBefore(u) && (o = u), t && y(o).isAfter(t) && (o = t);
  const i = f ? "jalali" : "gregory";
  if (!e && u) {
    const d = y(u).calendar(i), c = y(o).calendar(i).set("year", d.year() + 1).set("month", 0).set("date", 1);
    c.isBefore(u) || (o = c.toDate());
  }
  if (!e && !u && t) {
    const d = y(t).calendar(i), c = y(o).calendar(i).set("year", d.year() - 1).set("month", 0).set("date", 1);
    c.isAfter(t) || (o = c.toDate());
  }
  const m = y(o).calendar(i).year(), v = y(o).calendar(i).month(), k = y(o).calendar(i).date();
  return {
    selectedYear: m,
    selectedMonth: v,
    selectedDay: k,
    calendar: i
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
  setup(e, { emit: f }) {
    y.extend(oe);
    const t = f, u = P(e, "modelValue"), o = P(e, "showModal"), {
      selectedYear: i,
      selectedMonth: m,
      selectedDay: v,
      calendar: k
    } = J(u.value || "", e.jalali, e.maxDate, e.minDate), d = V(i), c = V(m), s = V(v), a = V(k), M = V([]), A = b(() => e.title ? e.title : e.jalali ? "انتخاب تاریخ" : "Choose date"), w = b(() => e.submitTitle ? e.submitTitle : e.jalali ? "تایید" : "submit"), r = b(() => e.locale ? e.locale : e.jalali ? _.fa : _.en), Y = b(() => r.value.day), O = b(() => r.value.month), F = b(() => r.value.year), T = b(() => {
      if (e.maxDate) {
        const n = y(e.maxDate).calendar(a.value);
        return {
          year: n.year(),
          month: n.month(),
          day: n.date()
        };
      }
      return null;
    }), D = b(() => {
      if (e.minDate) {
        const n = y(e.minDate).calendar(a.value);
        return {
          year: n.year(),
          month: n.month(),
          day: n.date()
        };
      }
      return null;
    }), Q = b(
      () => d.value === T.value?.year
    ), ae = b(
      () => Q.value && c.value === T.value?.month
    ), R = b(
      () => d.value === D.value?.year
    ), ne = b(
      () => R.value && c.value === D.value?.month
    ), ue = b(() => {
      let n = r.value.months.map((l, h) => ({ title: l, key: h }));
      return T.value && Q.value && (n = n.filter(
        (l) => T.value && l.key <= T.value.month
      )), D.value && R.value && (n = n.filter(
        (l) => D.value && l.key >= D.value.month
      )), n;
    }), ie = b(() => {
      const n = y().calendar(a.value).year(d.value).month(c.value).daysInMonth();
      let l = Array.from({ length: n }, (h, C) => ({
        title: `${C + 1}`,
        key: C + 1
      }));
      return T.value && ae.value && (l = l.filter(
        (h) => T.value && Number(h.key) <= T.value.day
      )), D.value && ne.value && (l = l.filter(
        (h) => D.value && Number(h.key) >= D.value.day
      )), l;
    });
    N(
      () => e.jalali,
      (n) => {
        const {
          selectedYear: l,
          selectedMonth: h,
          selectedDay: C,
          calendar: re
        } = J(
          y().calendar(a.value).year(d.value).month(c.value).date(s.value).toDate(),
          n,
          e.maxDate,
          e.minDate
        );
        d.value = l, c.value = h, s.value = C, a.value = re, X();
      }
    ), N(
      u,
      (n) => {
        const {
          selectedYear: l,
          selectedMonth: h,
          selectedDay: C
        } = J(n || "", e.jalali, e.maxDate, e.minDate);
        d.value = l, c.value = h, I(() => {
          s.value = C;
        });
      }
    );
    const X = () => {
      let n = [];
      for (let l = d.value - e.yearThreshold; l <= d.value + e.yearThreshold; l++)
        n.push({
          title: `${l}`,
          key: l
        });
      T.value && (n = n.filter(
        (l) => T.value && +l.key <= T.value.year
      )), D.value && (n = n.filter(
        (l) => D.value && +l.key >= D.value.year
      )), M.value = n;
    }, se = (n) => {
      const l = y().calendar(a.value).year(d.value).month(c.value).date(s.value);
      typeof u.value == "string" ? u.value = l.toISOString() : u.value = l.toDate(), t("submit", n);
    };
    return ve(() => {
      X();
    }), (n, l) => (x(), le(K, {
      title: A.value,
      submitTitle: w.value,
      color: e.color,
      modal: e.modal,
      showModal: o.value,
      onClose: l[3] || (l[3] = (h) => o.value = !1),
      onSubmit: se
    }, {
      header: j(() => [
        g(n.$slots, "header")
      ]),
      submit: j(() => [
        g(n.$slots, "submit")
      ]),
      default: j(() => [
        E(z, {
          modelValue: s.value,
          "onUpdate:modelValue": l[0] || (l[0] = (h) => s.value = h),
          class: "select",
          title: Y.value,
          options: ie.value,
          color: e.color,
          mobileMaxSize: e.mobileMaxSize,
          bounceOnMount: e.bounceOnMount
        }, null, 8, ["modelValue", "title", "options", "color", "mobileMaxSize", "bounceOnMount"]),
        E(z, {
          modelValue: c.value,
          "onUpdate:modelValue": l[1] || (l[1] = (h) => c.value = h),
          class: "select",
          title: O.value,
          options: ue.value,
          color: e.color,
          width: "30%",
          mobileMaxSize: e.mobileMaxSize,
          bounceOnMount: e.bounceOnMount
        }, null, 8, ["modelValue", "title", "options", "color", "mobileMaxSize", "bounceOnMount"]),
        E(z, {
          modelValue: d.value,
          "onUpdate:modelValue": l[2] || (l[2] = (h) => d.value = h),
          class: "select",
          title: F.value,
          options: M.value,
          color: e.color,
          mobileMaxSize: e.mobileMaxSize,
          bounceOnMount: e.bounceOnMount
        }, null, 8, ["modelValue", "title", "options", "color", "mobileMaxSize", "bounceOnMount"])
      ]),
      _: 3
    }, 8, ["title", "submitTitle", "color", "modal", "showModal"]));
  }
}), Se = /* @__PURE__ */ H({
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
  setup(e, { emit: f }) {
    const t = f, u = P(e, "modelValue"), o = P(e, "showModal"), i = V(0), m = V(0), v = b(() => {
      const s = [];
      for (let a = 0; a <= 59; a++)
        s.push({
          title: `${a < 10 ? "0" : ""}${a}`,
          key: a
        });
      return s;
    }), k = b(() => {
      const s = [];
      for (let a = 0; a <= 23; a++)
        s.push({
          title: `${a < 10 ? "0" : ""}${a}`,
          key: a
        });
      return s;
    }), d = (s) => {
      if (typeof s == "string") {
        const [a, M] = s.split(":");
        i.value = Number(a), m.value = Number(M);
      } else s instanceof Date && (i.value = y(s).hour(), m.value = y(s).minute());
    }, c = () => {
      if (typeof u.value == "string") {
        const s = k.value.find((M) => M.key === i.value)?.title, a = v.value.find((M) => M.key === m.value)?.title;
        u.value = `${s}:${a}`;
      } else
        u.value = y(u.value).hour(i.value).minute(m.value).toDate();
      t("submit");
    };
    return N(
      u,
      (s) => {
        d(s);
      },
      { immediate: !0 }
    ), (s, a) => (x(), le(K, {
      title: e.title,
      submitTitle: e.submitTitle,
      color: e.color,
      modal: e.modal,
      showModal: o.value,
      onClose: a[2] || (a[2] = (M) => o.value = !1),
      onSubmit: c
    }, {
      header: j(() => [
        g(s.$slots, "header")
      ]),
      submit: j(() => [
        g(s.$slots, "submit")
      ]),
      default: j(() => [
        E(z, {
          modelValue: i.value,
          "onUpdate:modelValue": a[0] || (a[0] = (M) => i.value = M),
          class: "select",
          title: e.hourTitle,
          options: k.value,
          color: e.color,
          bounceOnMount: e.bounceOnMount
        }, null, 8, ["modelValue", "title", "options", "color", "bounceOnMount"]),
        E(z, {
          modelValue: m.value,
          "onUpdate:modelValue": a[1] || (a[1] = (M) => m.value = M),
          class: "select",
          title: e.minuteTitle,
          options: v.value,
          color: e.color,
          bounceOnMount: e.bounceOnMount
        }, null, 8, ["modelValue", "title", "options", "color", "bounceOnMount"])
      ]),
      _: 3
    }, 8, ["title", "submitTitle", "color", "modal", "showModal"]));
  }
}), xe = {
  VDatePicker: De,
  VTimePicker: Se,
  VWheelSelect: z,
  PickerContainer: K
};
function Oe(e) {
  Object.entries(xe).forEach(([f, t]) => {
    e.component(f, t);
  });
}
const Be = { install: Oe };
export {
  K as PickerContainer,
  De as VDatePicker,
  Se as VTimePicker,
  z as VWheelSelect,
  Be as default
};
