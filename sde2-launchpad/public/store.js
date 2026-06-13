/* ===========================================================
   SDE-2 Launchpad — global client store (classic script).
   Loaded in <head> so window.SDE2 exists before any page script.
   All state persists in localStorage. No backend, no DB. Offline.
   =========================================================== */
window.SDE2 = (function () {
  var NS = 'sde2_v1_';
  var K = {
    done: NS + 'done', mastery: NS + 'mastery', srs: NS + 'srs', streak: NS + 'streak',
    xp: NS + 'xp', mistakes: NS + 'mistakes', customTracks: NS + 'customTracks',
    customItems: NS + 'customItems', links: NS + 'links', revisit: NS + 'revisit',
    badges: NS + 'badges', notes: NS + 'notes',
    dsaSolved: NS + 'dsaSolved', dsaGoal: NS + 'dsaGoal', dsaDaily: NS + 'dsaDaily',
  };
  function read(key, fb) { try { var v = localStorage.getItem(key); return v == null ? fb : JSON.parse(v); } catch (e) { return fb; } }
  var listeners = new Set();
  function emit() { listeners.forEach(function (fn) { try { fn(); } catch (e) {} }); }
  function write(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} emit(); }
  function today() { return new Date().toISOString().slice(0, 10); }

  var store = {
    K: K,
    onChange: function (fn) { listeners.add(fn); return function () { listeners.delete(fn); }; },

    isDone: function (id) { return !!read(K.done, {})[id]; },
    allDone: function () { return read(K.done, {}); },
    setDone: function (id, val) {
      var d = read(K.done, {}); if (val) d[id] = true; else delete d[id]; write(K.done, d);
      if (val) { store.addXp(20); store.touchStreak(); store.checkBadges(); }
    },

    mastery: function (id) { return read(K.mastery, {})[id] || 0; },
    allMastery: function () { return read(K.mastery, {}); },
    setMastery: function (id, level) {
      var m = read(K.mastery, {}); var prev = m[id] || 0; m[id] = level; write(K.mastery, m);
      if (level > prev) { store.addXp((level - prev) * 15); store.touchStreak(); }
      store.checkBadges();
    },

    srs: function (id) { return read(K.srs, {})[id] || null; },
    allSrs: function () { return read(K.srs, {}); },
    scheduleSrs: function (id, quality) {
      var all = read(K.srs, {}); var c = all[id] || { ease: 2.5, interval: 0, reps: 0 };
      if (quality < 3) { c.reps = 0; c.interval = 1; }
      else {
        c.reps += 1;
        if (c.reps === 1) c.interval = 1; else if (c.reps === 2) c.interval = 3; else c.interval = Math.round(c.interval * c.ease);
        c.ease = Math.max(1.3, c.ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
      }
      var due = new Date(); due.setDate(due.getDate() + c.interval); c.due = due.toISOString().slice(0, 10);
      all[id] = c; write(K.srs, all); store.addXp(5); store.touchStreak();
    },
    dueCards: function () { var all = read(K.srs, {}); var t = today(); return Object.keys(all).filter(function (id) { return all[id].due <= t; }); },
    allCards: function () { return Object.keys(read(K.srs, {})); },
    trackSrs: function (id) { var all = read(K.srs, {}); if (!all[id]) { all[id] = { ease: 2.5, interval: 0, reps: 0, due: today() }; write(K.srs, all); } },
    untrackSrs: function (id) { var all = read(K.srs, {}); delete all[id]; write(K.srs, all); },

    streak: function () { return read(K.streak, { count: 0, last: null, best: 0 }); },
    touchStreak: function () {
      var s = read(K.streak, { count: 0, last: null, best: 0 }); var t = today(); if (s.last === t) return;
      var y = new Date(); y.setDate(y.getDate() - 1); var ys = y.toISOString().slice(0, 10);
      s.count = s.last === ys ? s.count + 1 : 1; s.last = t; s.best = Math.max(s.best || 0, s.count); write(K.streak, s);
    },

    xp: function () { return read(K.xp, 0); },
    addXp: function (n) { write(K.xp, read(K.xp, 0) + n); },
    level: function () { return Math.floor(Math.sqrt(read(K.xp, 0) / 50)) + 1; },
    levelProgress: function () {
      var xp = read(K.xp, 0); var lvl = store.level();
      var cur = 50 * (lvl - 1) * (lvl - 1); var next = 50 * lvl * lvl;
      return { lvl: lvl, xp: xp, cur: cur, next: next, pct: Math.round(((xp - cur) / (next - cur)) * 100) };
    },

    badges: function () { return read(K.badges, {}); },
    award: function (id) { var b = read(K.badges, {}); if (!b[id]) { b[id] = today(); write(K.badges, b); } },
    checkBadges: function () {
      var done = Object.keys(read(K.done, {})).length; var s = store.streak();
      var teach = Object.values(read(K.mastery, {})).filter(function (v) { return v >= 3; }).length;
      if (done >= 1) store.award('first-step');
      if (done >= 10) store.award('ten-down');
      if (done >= 30) store.award('grinder');
      if (s.count >= 3) store.award('streak-3');
      if (s.count >= 7) store.award('streak-7');
      if (s.count >= 30) store.award('streak-30');
      if (teach >= 5) store.award('teacher');
      var solved = store.solvedCount();
      if (solved >= 1) store.award('first-solve');
      if (solved >= 25) store.award('solver-25');
      if (solved >= 90) store.award('solver-90');
      if (solved >= 180) store.award('solver-180');
    },

    mistakes: function () { return read(K.mistakes, []); },
    addMistake: function (m) { var l = read(K.mistakes, []); l.unshift(Object.assign({ id: 'm_' + Date.now(), date: today() }, m)); write(K.mistakes, l); store.addXp(8); store.touchStreak(); },
    delMistake: function (id) { write(K.mistakes, read(K.mistakes, []).filter(function (x) { return x.id !== id; })); },

    customTracks: function () { return read(K.customTracks, []); },
    addTrack: function (t) { var l = read(K.customTracks, []); l.push(t); write(K.customTracks, l); },
    delTrack: function (id) { write(K.customTracks, read(K.customTracks, []).filter(function (x) { return x.id !== id; })); write(K.customItems, read(K.customItems, []).filter(function (x) { return x.track !== id; })); },
    customItems: function () { return read(K.customItems, []); },
    addItem: function (it) { var l = read(K.customItems, []); l.push(it); write(K.customItems, l); },
    delItem: function (id) { write(K.customItems, read(K.customItems, []).filter(function (x) { return x.id !== id; })); },

    links: function () { return read(K.links, []); },
    addLink: function (l) { var list = read(K.links, []); list.push(l); write(K.links, list); },
    delLink: function (id) { write(K.links, read(K.links, []).filter(function (x) { return x.id !== id; })); },

    revisit: function () { return read(K.revisit, {}); },
    toggleRevisit: function (id) { var r = read(K.revisit, {}); if (r[id]) delete r[id]; else r[id] = true; write(K.revisit, r); },

    notes: function (id) { return read(K.notes, {})[id] || ''; },
    setNote: function (id, txt) { var n = read(K.notes, {}); n[id] = txt; write(K.notes, n); },

    /* ---- DSA Quest game ---- */
    dsaSolved: function () { return read(K.dsaSolved, {}); },
    isSolved: function (pid) { return !!read(K.dsaSolved, {})[pid]; },
    solvedCount: function () { return Object.keys(read(K.dsaSolved, {})).length; },
    toggleSolved: function (pid, difficulty) {
      var s = read(K.dsaSolved, {});
      if (s[pid]) { delete s[pid]; write(K.dsaSolved, s); store.checkBadges(); return false; }
      s[pid] = today(); write(K.dsaSolved, s);
      var xp = difficulty === 'Hard' ? 30 : difficulty === 'Easy' ? 10 : 20;
      store.addXp(xp); store.touchStreak(); store._bumpDaily(); store.checkBadges();
      return true;
    },
    dsaGoal: function () { return read(K.dsaGoal, 2); },
    setDsaGoal: function (n) { write(K.dsaGoal, Math.max(1, n | 0)); },
    _bumpDaily: function () { var d = read(K.dsaDaily, { date: today(), count: 0 }); if (d.date !== today()) d = { date: today(), count: 0 }; d.count += 1; write(K.dsaDaily, d); },
    solvedToday: function () { var d = read(K.dsaDaily, { date: today(), count: 0 }); return d.date === today() ? d.count : 0; },
    daysSincePractice: function () {
      var s = read(K.streak, { count: 0, last: null });
      if (!s.last) return null;
      var diff = Math.floor((new Date(today()) - new Date(s.last)) / 86400000);
      return diff;
    },
    // mascot mood: new | happy | fire | content | sad | sleeping
    mood: function () {
      var solved = store.solvedCount();
      var since = store.daysSincePractice();
      var streak = store.streak().count || 0;
      if (since === null || solved === 0) return 'new';
      if (since === 0) return streak >= 7 ? 'fire' : 'happy';
      if (since === 1) return 'content';
      if (since <= 3) return 'sad';
      return 'sleeping';
    },

    exportAll: function () { var out = {}; Object.values(K).forEach(function (k) { out[k] = read(k, null); }); return { __sde2: true, version: 1, exported: new Date().toISOString(), data: out }; },
    importAll: function (obj) {
      if (!obj || !obj.__sde2 || !obj.data) throw new Error('Not a valid SDE-2 Launchpad backup.');
      Object.entries(obj.data).forEach(function (e) { if (e[1] == null) localStorage.removeItem(e[0]); else localStorage.setItem(e[0], JSON.stringify(e[1])); });
      emit();
    },
    resetAll: function () { Object.values(K).forEach(function (k) { localStorage.removeItem(k); }); emit(); },
  };
  return store;
})();
