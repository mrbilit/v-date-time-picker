import { defineComponent as H, createElementBlock as $, openBlock as S, createCommentVNode as Z, createElementVNode as x, toDisplayString as W, ref as V, onMounted as ee, onBeforeUnmount as te, normalizeClass as U, withModifiers as B, renderSlot as g, createVNode as E, normalizeStyle as q, mergeModels as L, useModel as P, reactive as re, computed as y, watch as N, nextTick as j, Fragment as ce, renderList as me, onBeforeMount as ve, createBlock as le, withCtx as z } from "vue";
import oe from "jalali-plugin-dayjs";
import M from "dayjs";
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
    return (s, n) => (S(), $("div", fe, [
      e.showClose ? (S(), $("div", ye)) : Z("", !0),
      x("div", he, W(e.title), 1),
      e.showClose ? (S(), $("div", {
        key: 1,
        class: "button close",
        onClick: n[0] || (n[0] = (d) => l("close"))
      })) : Z("", !0)
    ]));
  }
}), G = (e, m) => {
  const l = e.__vccOpts || e;
  for (const [s, n] of m)
    l[s] = n;
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
    const l = e, s = m, n = V();
    function d(r) {
      r.preventDefault();
    }
    return ee(() => {
      l.modal && n.value && n.value.addEventListener("wheel", d);
    }), te(() => {
      l.modal && n.value && n.value.removeEventListener("wheel", d);
    }), (r, c) => (S(), $("div", {
      ref_key: "container",
      ref: n,
      class: U(["modal-container", { modal: e.modal, show: e.showModal }])
    }, [
      x("div", {
        class: "dialog-box-container",
        onClick: c[2] || (c[2] = B(() => {
        }, ["stop"]))
      }, [
        g(r.$slots, "header", {}, () => [
          E(Me, {
            title: e.title || "",
            showClose: e.modal,
            onClose: c[0] || (c[0] = (k) => s("close"))
          }, null, 8, ["title", "showClose"])
        ], !0),
        x("div", we, [
          g(r.$slots, "default", {}, void 0, !0)
        ]),
        g(r.$slots, "submit", {}, () => [
          x("button", {
            class: "submit-button",
            style: q({ background: e.color }),
            onClick: c[1] || (c[1] = (k) => s("submit", k))
          }, W(e.submitTitle), 5)
        ], !0)
      ]),
      x("div", {
        class: "container-mask",
        onClick: c[3] || (c[3] = (k) => s("close"))
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
    const m = P(e, "modelValue"), l = V(), s = V(), n = V(!1), d = V(!1), r = V(!1), c = re({ top: 0, y: 0 }), k = y(() => e.options.findIndex((w) => w.key === m.value)), v = (w, i = !0) => {
      if (!l.value) return;
      const O = e.options.findIndex((A) => A.key === w) * p;
      i ? l.value.scrollTo({ top: O, behavior: "auto" }) : (d.value = !0, n.value = !1, j(() => {
        l.value && l.value.scrollTo({ top: O, behavior: "auto" }), j(() => {
          n.value = !0, d.value = !1;
        });
      }));
    }, b = () => {
      if (!d.value && l.value) {
        const w = Math.round(l.value.scrollTop / p), i = e.options[w];
        i && m.value !== i.key && (m.value = i.key), s.value && clearTimeout(s.value), s.value = globalThis.setTimeout(() => {
          i && v(i.key);
        }, 200);
      }
    }, u = (w) => {
      if (l.value) {
        const i = w.clientY - c.y;
        l.value.scrollTop = c.top - 3 * i;
      }
    }, o = () => {
      d.value = !1, document.removeEventListener("mousemove", u), document.removeEventListener("mouseup", o), b();
    }, h = (w) => {
      l.value && (d.value = !0, c.top = l.value.scrollTop, c.y = w.clientY, document.addEventListener("mousemove", u), document.addEventListener("mouseup", o));
    }, F = () => {
      l.value && l.value.addEventListener("mousedown", h);
    };
    return N(
      () => e.options,
      () => {
        j(() => b());
      }
    ), N(m, (w) => {
      v(w, !1);
    }), ee(() => {
      v(m.value), j(() => {
        n.value = !0;
      }), window.innerWidth > e.mobileMaxSize && F(), e.bounceOnMount && (r.value = !0, setTimeout(() => {
        r.value = !1;
      }, 1e3));
    }), te(() => {
      l.value && l.value.removeEventListener("mousedown", h), document.removeEventListener("mousemove", u), document.removeEventListener("mouseup", o);
    }), (w, i) => (S(), $("div", {
      class: U(["wheel-select-container", { dragging: d.value }]),
      style: q({ width: e.width }),
      onClick: i[2] || (i[2] = B(() => {
      }, ["stop"])),
      onScroll: i[3] || (i[3] = B(() => {
      }, ["stop"])),
      onWheel: i[4] || (i[4] = B(() => {
      }, ["prevent"]))
    }, [
      x("div", Ve, W(e.title), 1),
      x("div", {
        class: "select-container",
        onWheel: i[1] || (i[1] = B(() => {
        }, ["prevent"]))
      }, [
        x("div", {
          ref_key: "wheel",
          ref: l,
          class: U(["options-list", { smooth: n.value && !d.value, animated: r.value }]),
          onScroll: b,
          onWheel: i[0] || (i[0] = B(() => {
          }, ["stop"]))
        }, [
          i[5] || (i[5] = x("div", { class: "option empty" }, null, -1)),
          (S(!0), $(ce, null, me(e.options, (I, O) => (S(), $("div", {
            key: I.key,
            style: q({ color: e.color }),
            class: U(["option", {
              after: O > k.value,
              before: O < k.value
            }])
          }, W(I.title), 7))), 128)),
          i[6] || (i[6] = x("div", { class: "option empty" }, null, -1))
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
M.extend(oe);
const J = (e, m, l, s) => {
  let n = e || /* @__PURE__ */ new Date();
  s && M(n).isBefore(s) && (n = s), l && M(n).isAfter(l) && (n = l);
  const d = m ? "jalali" : "gregory", r = M(n).calendar(d).year(), c = M(n).calendar(d).month(), k = M(n).calendar(d).date();
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
    M.extend(oe);
    const l = m, s = P(e, "modelValue"), n = P(e, "showModal"), {
      selectedYear: d,
      selectedMonth: r,
      selectedDay: c,
      calendar: k
    } = J(s.value || "", e.jalali, e.maxDate, e.minDate), v = V(d), b = V(r), u = V(c), o = V(k), h = V([]), F = y(() => e.title ? e.title : e.jalali ? "انتخاب تاریخ" : "Choose date"), w = y(() => e.submitTitle ? e.submitTitle : e.jalali ? "تایید" : "submit"), i = y(() => e.locale ? e.locale : e.jalali ? _.fa : _.en), I = y(() => i.value.day), O = y(() => i.value.month), A = y(() => i.value.year), T = y(() => {
      if (e.maxDate) {
        const a = M(e.maxDate).calendar(o.value);
        return {
          year: a.year(),
          month: a.month(),
          day: a.date()
        };
      }
      return null;
    }), D = y(() => {
      if (e.minDate) {
        const a = M(e.minDate).calendar(o.value);
        return {
          year: a.year(),
          month: a.month(),
          day: a.date()
        };
      }
      return null;
    }), Q = y(
      () => v.value === T.value?.year
    ), ae = y(
      () => Q.value && b.value === T.value?.month
    ), R = y(
      () => v.value === D.value?.year
    ), ne = y(
      () => R.value && b.value === D.value?.month
    ), ue = y(() => {
      let a = i.value.months.map((t, f) => ({ title: t, key: f }));
      return T.value && Q.value && (a = a.filter(
        (t) => T.value && t.key <= T.value.month
      )), D.value && R.value && (a = a.filter(
        (t) => D.value && t.key >= D.value.month
      )), a;
    }), ie = y(() => {
      const a = M().calendar(o.value).year(v.value).month(b.value).daysInMonth();
      let t = Array.from({ length: a }, (f, C) => ({
        title: `${C + 1}`,
        key: C + 1
      }));
      return T.value && ae.value && (t = t.filter(
        (f) => T.value && Number(f.key) <= T.value.day
      )), D.value && ne.value && (t = t.filter(
        (f) => D.value && Number(f.key) >= D.value.day
      )), t;
    });
    N(
      () => e.jalali,
      (a) => {
        const {
          selectedYear: t,
          selectedMonth: f,
          selectedDay: C,
          calendar: de
        } = J(
          M().calendar(o.value).year(v.value).month(b.value).date(u.value).toDate(),
          a,
          e.maxDate,
          e.minDate
        );
        v.value = t, b.value = f, u.value = C, o.value = de, X();
      }
    ), N(
      s,
      (a) => {
        const {
          selectedYear: t,
          selectedMonth: f,
          selectedDay: C
        } = J(a || "", e.jalali, e.maxDate, e.minDate);
        v.value = t, b.value = f, j(() => {
          u.value = C;
        });
      }
    );
    const X = () => {
      let a = [];
      for (let t = v.value - e.yearThreshold; t <= v.value + e.yearThreshold; t++)
        a.push({
          title: `${t}`,
          key: t
        });
      T.value && (a = a.filter(
        (t) => T.value && +t.key <= T.value.year
      )), D.value && (a = a.filter(
        (t) => D.value && +t.key >= D.value.year
      )), h.value = a;
    }, se = (a) => {
      const t = M().calendar(o.value).year(v.value).month(b.value).date(u.value);
      typeof s.value == "string" ? s.value = t.toISOString() : s.value = t.toDate(), l("submit", a);
    };
    return ve(() => {
      X();
    }), (a, t) => (S(), le(K, {
      title: F.value,
      submitTitle: w.value,
      color: e.color,
      modal: e.modal,
      showModal: n.value,
      onClose: t[3] || (t[3] = (f) => n.value = !1),
      onSubmit: se
    }, {
      header: z(() => [
        g(a.$slots, "header")
      ]),
      submit: z(() => [
        g(a.$slots, "submit")
      ]),
      default: z(() => [
        E(Y, {
          modelValue: u.value,
          "onUpdate:modelValue": t[0] || (t[0] = (f) => u.value = f),
          class: "select",
          title: I.value,
          options: ie.value,
          color: e.color,
          mobileMaxSize: e.mobileMaxSize,
          bounceOnMount: e.bounceOnMount
        }, null, 8, ["modelValue", "title", "options", "color", "mobileMaxSize", "bounceOnMount"]),
        E(Y, {
          modelValue: b.value,
          "onUpdate:modelValue": t[1] || (t[1] = (f) => b.value = f),
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
          "onUpdate:modelValue": t[2] || (t[2] = (f) => v.value = f),
          class: "select",
          title: A.value,
          options: h.value,
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
    const l = m, s = P(e, "modelValue"), n = P(e, "showModal"), d = V(0), r = V(0), c = y(() => {
      const u = [];
      for (let o = 0; o <= 59; o++)
        u.push({
          title: `${o < 10 ? "0" : ""}${o}`,
          key: o
        });
      return u;
    }), k = y(() => {
      const u = [];
      for (let o = 0; o <= 23; o++)
        u.push({
          title: `${o < 10 ? "0" : ""}${o}`,
          key: o
        });
      return u;
    }), v = (u) => {
      if (typeof u == "string") {
        const [o, h] = u.split(":");
        d.value = Number(o), r.value = Number(h);
      } else u instanceof Date && (d.value = M(u).hour(), r.value = M(u).minute());
    }, b = () => {
      if (typeof s.value == "string") {
        const u = k.value.find((h) => h.key === d.value)?.title, o = c.value.find((h) => h.key === r.value)?.title;
        s.value = `${u}:${o}`;
      } else
        s.value = M(s.value).hour(d.value).minute(r.value).toDate();
      l("submit");
    };
    return N(
      s,
      (u) => {
        v(u);
      },
      { immediate: !0 }
    ), (u, o) => (S(), le(K, {
      title: e.title,
      submitTitle: e.submitTitle,
      color: e.color,
      modal: e.modal,
      showModal: n.value,
      onClose: o[2] || (o[2] = (h) => n.value = !1),
      onSubmit: b
    }, {
      header: z(() => [
        g(u.$slots, "header")
      ]),
      submit: z(() => [
        g(u.$slots, "submit")
      ]),
      default: z(() => [
        E(Y, {
          modelValue: d.value,
          "onUpdate:modelValue": o[0] || (o[0] = (h) => d.value = h),
          class: "select",
          title: e.hourTitle,
          options: k.value,
          color: e.color,
          bounceOnMount: e.bounceOnMount
        }, null, 8, ["modelValue", "title", "options", "color", "bounceOnMount"]),
        E(Y, {
          modelValue: r.value,
          "onUpdate:modelValue": o[1] || (o[1] = (h) => r.value = h),
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
